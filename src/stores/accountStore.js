import { decorate, observable, action } from 'mobx'
import * as Values from '../constants/Values'
import EosAgent from '../EosAgent'

const ACCOUNT_NAME_PATTERN = /([a-z1-5]){12,}/
const SEED_RAM_BYTES = 8192
const SEED_RAM_EOS = 1
const SEED_CPU = 0.1
const SEED_NET = 0.1
const SEED_TRANSFER_SYMBOL = 'EOS'

const TOKENS = [
  {
    contract: 'eosio.token',
    symbol: 'EOS',
    precision: 4
  }
]

export class AccountStore {
  isLogin = false
  isValidInput = true
  isAccountNameValid = false
  isOwnerPublicKeyValid = false
  isActivePublicKeyValid = false
  isCPUstakeValid = true
  isNETstakeValid = true
  isRAMpurchaseOnCreationValid = true
  isRAMpurchaseValid = true
  isRAMsellValid = true
  accountNameInput = ''
  receiverAccountNameInput = ''
  ownerPubKeyInput = ''
  activePubKeyInput = ''
  cpuStakeInput = SEED_CPU
  netStakeInput = SEED_NET
  isEosUnit = false
  ramPurchaseInput = SEED_RAM_BYTES
  ramSellInput = SEED_RAM_BYTES
  transferQuantityInput = 0.0
  transferSymbolInput = SEED_TRANSFER_SYMBOL
  transferInput = false
  memoInput = ''
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
  proxy = ''
  accountInfo = null
  account = null
  actions = null
  tokens = null
  permissions = null
  childAccounts = null
  votes = null
  bidNames = null
  otherActions = null
  myBlockProducers = null

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()
    console.log(accountInfo)
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

      balance = await EosAgent.getCurrencyBalance({
        code: 'eosio.token',
        account: this.account.name,
        symbol: 'EOS'
      })

      if (balance && balance.length > 0) {
        this.eosBalance = balance[0].split(' ')[0]
      } else {
        this.eosBalance = 0.0
      }

      this.is_proxy = accountInfo.voter_info.is_proxy
      this.proxy = accountInfo.voter_info.proxy
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

  getAccountTokens = async accountName => {
    const lastAction = await EosAgent.getActions(accountName, -1, -1)

    let totalActions

    this.tokens = null

    if (lastAction && lastAction.actions.length > 0) {
      totalActions = lastAction.actions[0].account_action_seq

      let totalPage = parseInt(totalActions / Values.actionPerPage, 10)
      if (totalActions % Values.actionPerPage !== 0) {
        totalPage++
      }

      let tokenSymbols = []

      for (let i = 0; i < totalPage; i++) {
        let pos = i * Values.actionPerPage
        let offset = Values.actionPerPage - 1

        const actions = await EosAgent.getActions(accountName, pos, offset)

        let results = actions.actions
          .filter((action, idx, array) => {
            if (
              action.action_trace.act.name === 'transfer' &&
              action.action_trace.act.data.to === accountName &&
              action.action_trace.act.data.quantity.split(' ')[1] !== 'EOS'
            ) {
              return true
            }

            return false
          })
          .map(action => {
            return {
              code: action.action_trace.act.account,
              account: action.action_trace.act.data.to,
              symbol: action.action_trace.act.data.quantity.split(' ')[1]
            }
          })
          .filter((obj, idx, array) => array.map(obj2 => obj.symbol !== obj2.symbol))

        tokenSymbols = tokenSymbols.concat(results)
      }

      tokenSymbols = [
        {
          code: 'eosio.token',
          account: accountName,
          symbol: 'EOS'
        }
      ].concat(tokenSymbols)

      this.tokens = []
      let len = tokenSymbols.length

      for (let i = 0; i < len; i++) {
        try {
          let token = await EosAgent.getCurrencyBalance(tokenSymbols[i])
          this.tokens = this.tokens.concat(token)
        } catch (e) {}
      }

      console.log(this.tokens)
    }
  }

  validateAccountName = newVal => {
    this.accountNameInput = newVal
    this.isAccountNameValid = ACCOUNT_NAME_PATTERN.exec(newVal) ? true : false
  }

  validateReceiverAccountName = newVal => {
    this.receiverAccountNameInput = newVal
    this.isReceiverAccountValid = newVal ? true : false
  }

  validateOwnerPubKey = newVal => {
    this.ownerPubKeyInput = newVal
    this.isOwnerPubKeyValid = newVal ? true : false
  }

  validateActivePubKey = newVal => {
    this.activePubKeyInput = newVal
    this.isActivePubKeyValid = newVal ? true : false
  }

  validateCpuStake = newVal => {
    this.cpuStakeInput = newVal
    this.isCPUstakeValid = newVal >= SEED_CPU ? true : false
  }

  validateNetStake = newVal => {
    this.netStakeInput = newVal
    this.isNETstakeValid = newVal >= SEED_NET ? true : false
  }

  validateRamPurchaseOnCreation = newVal => {
    this.ramPurchaseInput = newVal

    if (this.isEosUnit === false) {
      this.isRAMpurchaseOnCreationValid = newVal >= SEED_RAM_BYTES ? true : false
    } else {
      this.isRAMpurchaseOnCreationValid = newVal >= SEED_RAM_EOS ? true : false
    }
  }

  validateRamPurchase = newVal => {
    this.ramPurchaseInput = newVal

    console.log(newVal > 0 ? true : false)
    this.isRAMpurchaseValid = newVal > 0 ? true : false
  }

  validateRamSell = newVal => {
    this.ramSellInput = newVal
    this.isRAMsellValid = newVal > 0 ? true : false
  }

  seedCreateAccountInput = () => {
    this.accountNameInput = ''
    this.ownerPubKeyInput = ''
    this.activePubKeyInput = ''
    this.cpuStakeInput = SEED_CPU
    this.netStakeInput = SEED_NET

    if (this.isEosUnit === true) {
      this.ramPurchaseInput = SEED_RAM_EOS
    } else {
      this.ramPurchaseInput = SEED_RAM_BYTES
    }

    this.transferInput = false
  }

  seedTransferTokenInput = () => {
    this.receiverAccountNameInput = ''
    this.transferQuantityInput = 0
    this.transferSymbolInput = SEED_TRANSFER_SYMBOL
    this.memoInput = ''
  }
  changeRamPurchaseUnit = isEosUnit => {
    if (isEosUnit === true) {
      this.ramPurchaseInput = SEED_RAM_EOS
    } else {
      this.ramPurchaseInput = SEED_RAM_BYTES
    }

    this.isEosUnit = isEosUnit
  }

  buyRAM = async () => {
    return this.isEosUnit ? await this.buyRAMEos() : await this.buyRAMBytes()
  }

  sellRAM = async () => {
    if (!this.account) {
      return
    }

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.sellram(
        {
          account: this.account.name,
          bytes: Number(this.ramSellInput)
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  buyRAMEos = async () => {
    if (!this.account) {
      return
    }

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.buyram(
        {
          payer: this.account.name,
          receiver: this.receiverAccountNameInput,
          quant: `${Number(this.ramPurchaseInput)
            .toFixed(4)
            .toString()} EOS`
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  buyRAMBytes = async () => {
    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.buyrambytes(
        {
          payer: this.account.name,
          receiver: this.receiverAccountNameInput,
          bytes: Number(this.ramPurchaseInput)
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  transferToken = async () => {
    const filteredTokens = TOKENS.filter(t => t.symbol === this.transferSymbolInput)
    if (!filteredTokens || filteredTokens.length === 0) return

    const token = filteredTokens[0]
    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.transfer(
        {
          from: this.account.name,
          to: this.receiverAccountNameInput,
          quantity: `${Number(this.transferQuantityInput)
            .toFixed(token.precision)
            .toString()} ${token.symbol}`,
          memo: this.memoInput
        },
        options
      )
    }

    return await EosAgent.createTransaction(token.contract, cb)
  }

  voteProducer = async (proxy = '') => {
    if (!proxy) {
      return await EosAgent.voteProducer(this.account.name, this.myBlockProducers, proxy)
    } else {
      return await EosAgent.voteProducer(this.account.name, [], proxy)
    }
  }

  changeVoterProxy = async () => {
    return await EosAgent.voteProducer(this.account.name, [], '')
  }
}

decorate(AccountStore, {
  isLogin: observable,
  isAccountNameValid: observable,
  isReceiverAccountValid: observable,
  isOwnerPublicKeyValid: observable,
  isActivePublicKeyValid: observable,
  isCPUstakeValid: observable,
  isNETstakeValid: observable,
  isRAMpurchaseOnCreationValid: observable,
  isRAMpurchaseValid: observable,
  isRAMsellValid: observable,
  isMemoValid: observable,
  isEosUnit: observable,
  accountNameInput: observable,
  receiverAccountNameInput: observable,
  ownerPubKeyInput: observable,
  activePubKeyInput: observable,
  cpuStakeInput: observable,
  netStakeInput: observable,
  ramPurchaseInput: observable,
  ramSellInput: observable,
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
  proxy: observable,
  accountInfo: observable,
  account: observable,
  myBlockProducers: observable,
  tokens: observable,
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
  seedCreateAccountInput: action,
  changeRamPurchaseUnit: action,
  buyRAM: action,
  sellRAM: action,
  transferToken: action,
  seedTransferTokenInput: action,
  voteProducer: action,
  changeVoterProxy: action,
  getAccountTokens: action
})

export default new AccountStore()
