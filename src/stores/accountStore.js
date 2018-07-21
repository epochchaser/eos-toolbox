import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

const ACCOUNT_NAME_PATTERN = /([a-z1-5]){12,}/
const MIN_RAM_BYTES = 8192
const MIN_CPU = 0.1
const MIN_NET = 0.1

export class AccountStore {
  isLogin = false
  isValidInput = true
  isAccountNameValid = false
  isOwnerValid = false
  isOwnerPublicKeyValid = false
  isActivePublicKeyValid = false
  isCPUstakeValid = true
  isNETstakeValid = true
  isRAMpurchaseValid = true
  accountNameInput = ''
  ownerInput = ''
  ownerPubKeyInput = ''
  activePubKeyInput = ''
  cpuStakeInput = MIN_CPU
  netStakeInput = MIN_NET
  ramPurchaseInput = MIN_RAM_BYTES
  transferInput = false
  eosBalance = 0.0
  totalBalance = 0.0
  staked = 0.0
  cpu_staked = 0.0
  cpu_max = 0.0
  cpu_user = 0.0
  net_staked = 0.0
  net_max = 0.0
  net_user = 0.0
  liquid = 0.0
  is_proxy = 0
  accountInfo = null
  account = null
  myBlockProducers = null

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()
    if (accountInfo) {
      this.liquid = parseFloat(accountInfo.core_liquid_balance.split(' ')[0])
      this.cpu_max = parseFloat(accountInfo.cpu_limit.max / 10000)
      this.net_max = parseFloat(accountInfo.net_limit.max / 10000)
      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = parseFloat(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = parseFloat(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      this.cpu_staked = parseFloat(accountInfo.total_resources.cpu_weight.split(' ')[0])
      this.net_staked = parseFloat(accountInfo.total_resources.net_weight.split(' ')[0])
      this.cpu_user = 0
      this.net_user = 0

      this.staked = parseFloat(accountInfo.voter_info.staked) / 10000
      this.totalBalance =
        this.net_staked + this.cpu_staked + refunding_cpu_amount + refunding_net_amount
      this.unstaked = this.totalBalance - this.staked
      const myProducers = Object.keys(accountInfo.voter_info.producers).map(k => {
        return accountInfo.voter_info.producers[k]
      })

      this.myBlockProducers = myProducers.sort()
      this.account = EosAgent.loginaccount

      console.log(EosAgent.loginaccount)
      if (this.account) {
        this.isLogin = true
      }

      balance = await EosAgent.getCurrencyBalance('EOS')
      if (balance && balance.length > 0) {
        this.eosBalance = balance[0].split(' ')[0]
      } else {
        this.eosBalance = 0.0
      }

      this.is_proxy = accountInfo.voter_info.is_proxy
      this.accountInfo = accountInfo
    }
  }

  login = async () => {
    let account = await EosAgent.loginWithScatter()

    console.log('debug')
    console.log(account)
    if (account) {
      this.account = account
      this.isLogin = true

      this.loadAccountInfo()
    }
  }

  logout = async () => {
    await EosAgent.logout()

    this.isLogin = false
    this.account = null
  }

  createNewAccount = async () => {
    if (!this.account) return

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.newaccount(
        {
          creator: this.account.name,
          name: this.accountNameInput,
          owner: this.ownerPubKeyInput,
          active: this.activePubKeyInput
        },
        options
      )

      tr.buyrambytes(
        {
          payer: this.account.name,
          receiver: this.accountNameInput,
          bytes: this.ramPurchaseInput
        },
        options
      )

      tr.delegatebw(
        {
          from: this.account.name,
          receiver: this.accountNameInput,
          stake_net_quantity: Number(this.netStakeInput).toFixed(4) + ' EOS',
          stake_cpu_quantity: Number(this.cpuStakeInput).toFixed(4) + ' EOS',
          transfer: 0
        },
        options
      )
    }

    await EosAgent.createTransaction(cb)
  }

  updateMyBlockProducers = (name, include) => {
    if (!this.myBlockProducers) return
    let filterBaseBPList = this.myBlockProducers.filter(bp => bp !== name)

    if (include) {
      filterBaseBPList = filterBaseBPList.concat(name)
    }

    this.myBlockProducers = filterBaseBPList.sort()
  }

  validateStakingInput = (nextCpu, nextNet) => {
    if (0 >= nextCpu || 0 >= nextNet) {
      this.updateValidationResult(false, nextCpu, nextNet)
      return
    }

    if (!this.liquid) return

    const limit = this.cpu_staked + this.net_staked + this.liquid
    const nextTotal = nextCpu + nextNet

    const isValid = nextTotal <= limit ? true : false
    this.updateValidationResult(isValid, nextCpu, nextNet)
  }

  seedStakingUserInput = (cpu_user, net_user) => {
    this.cpu_user = cpu_user
    this.net_user = net_user
  }

  updateValidationResult = (isValidInput, cpu_user, net_user) => {
    this.isValidInput = isValidInput
    this.cpu_user = cpu_user
    this.net_user = net_user
  }

  delegatebwParams = (delegator, receiver, netAmount, cpuAmount) => {
    const stakeNetAmount = netAmount || 0
    const stakeCpuAmount = cpuAmount || 0

    return {
      from: delegator,
      receiver,
      stake_net_quantity: `${stakeNetAmount.toFixed(4)} EOS`,
      stake_cpu_quantity: `${stakeCpuAmount.toFixed(4)} EOS`,
      transfer: 0
    }
  }

  undelegatebwParams = (delegator, receiver, netAmount, cpuAmount) => {
    const unstakeNetAmount = netAmount || 0
    const unstakeCpuAmount = cpuAmount || 0

    return {
      from: delegator,
      receiver,
      unstake_net_quantity: `${unstakeNetAmount.toFixed(4)} EOS`,
      unstake_cpu_quantity: `${unstakeCpuAmount.toFixed(4)} EOS`,
      transfer: 0
    }
  }

  getStakeChanges = (nextNetAmount, nextCpuAmount) => {
    const increaseInStake = {
      netAmount: Math.max(0, nextNetAmount - this.net_staked),
      cpuAmount: Math.max(0, nextCpuAmount - this.cpu_staked)
    }

    const decreaseInStake = {
      netAmount: Math.max(0, this.net_staked - nextNetAmount),
      cpuAmount: Math.max(0, this.cpu_staked - nextCpuAmount)
    }

    return {
      increaseInStake,
      decreaseInStake
    }
  }

  setStake = async () => {
    if (!this.account) {
      return
    }

    const { increaseInStake, decreaseInStake } = this.getStakeChanges(this.net_user, this.cpu_user)

    const cb = tr => {
      if (increaseInStake.netAmount > 0 || increaseInStake.cpuAmount > 0) {
        tr.delegatebw(
          this.delegatebwParams(
            this.account.name,
            this.account.name,
            increaseInStake.netAmount,
            increaseInStake.cpuAmount
          )
        )
      }

      if (decreaseInStake.netAmount > 0 || decreaseInStake.cpuAmount > 0) {
        tr.undelegatebw(
          this.undelegatebwParams(
            this.account.name,
            this.account.name,
            decreaseInStake.netAmount,
            decreaseInStake.cpuAmount
          )
        )
      }
    }

    return await EosAgent.createTransaction(cb)
  }

  validateAccountName = newVal => {
    this.accountNameInput = newVal
    this.isAccountNameValid = null === ACCOUNT_NAME_PATTERN.exec(newVal) ? false : true
  }

  validateOwner = newVal => {
    this.ownerInput = newVal
    this.isOwnerValid = null === newVal ? false : true
  }

  validateOwnerPubKey = newVal => {
    this.ownerPubKeyInput = newVal
    this.isOwnerPubKeyValid = null === newVal ? false : true
  }

  validateActivePubKey = newVal => {
    this.activePubKeyInput = newVal
    this.isActivePubKeyValid = null === newVal ? false : true
  }

  validateCpuStake = newVal => {
    this.cpuStakeInput = newVal
    this.isCPUstakeValid = newVal >= MIN_CPU ? true : false
  }

  validateNetStake = newVal => {
    this.netStakeInput = newVal
    this.isNETstakeValid = newVal >= MIN_NET ? true : false
  }

  validateRamPurchase = newVal => {
    this.ramPurchaseInput = newVal
    this.isRAMpurchaseValid = newVal >= MIN_RAM_BYTES ? true : false
  }

  seedCreateAccountInput = () => {
    this.accountNameInput = ''
    this.ownerInput = ''
    this.ownerPubKeyInput = ''
    this.activePubKeyInput = ''
    this.cpuStakeInput = MIN_CPU
    this.netStakeInput = MIN_NET
    this.ramPurchaseInput = MIN_RAM_BYTES
    this.transferInput = false
  }
}

decorate(AccountStore, {
  isLogin: observable,
  isAccountNameValid: observable,
  isOwnerValid: observable,
  isOwnerPublicKeyValid: observable,
  isActivePublicKeyValid: observable,
  isCPUstakeValid: observable,
  isNETstakeValid: observable,
  isRAMpurchaseValid: observable,
  accountNameInput: observable,
  ownerInput: observable,
  ownerPubKeyInput: observable,
  activePubKeyInput: observable,
  cpuStakeInput: observable,
  netStakeInput: observable,
  ramPurchaseInput: observable,
  transferInput: observable,
  eosBalance: observable,
  totalBalance: observable,
  staked: observable,
  cpu_staked: observable,
  cpu_max: observable,
  cpu_user: observable,
  net_staked: observable,
  net_max: observable,
  net_user: observable,
  liquid: observable,
  is_proxy: observable,
  accountInfo: observable,
  account: observable,
  myBlockProducers: observable,
  loadAccountInfo: action,
  login: action,
  logout: action,
  createNewAccount: action,
  updateMyBlockProducers: action,
  validateStakingInput: action,
  validateUnstakingInput: action,
  seedStakingUserInput: action,
  setStake: action,
  validateAccountName: action,
  validateOwner: action,
  validateOwnerPubKey: action,
  validateActivePubKey: action,
  validateCpuStake: action,
  validateNetStake: action,
  validateRamPurchase: action,
  seedCreateAccountInput: action
})

export default new AccountStore()
