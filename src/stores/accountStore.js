import { decorate, observable, action } from 'mobx'
import * as Values from '../constants/Values'
import EosAgent from '../EosAgent'

export class AccountStore {
  isLogin = false
  isValidInput = true
  isRAMpurchaseValid = true
  isRAMsellValid = true
  receiverAccountNameInput = ''
  isEosUnit = false
  ramSellInput = Values.SEED_RAM_BYTES
  memoInput = ''
  eosBalance = 0.0
  totalBalance = 0.0
  totalRefund = 0.0
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
  tokenSymbols = null
  permissions = null
  childAccounts = null
  votes = null
  bidNames = null
  otherActions = null
  myBlockProducers = []

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()
    console.log(accountInfo)
    if (accountInfo) {
      this.liquid = accountInfo.core_liquid_balance
        ? parseFloat(accountInfo.core_liquid_balance.split(' ')[0])
        : 0
      this.cpu_max = parseFloat(accountInfo.cpu_limit.max / 10000)
      this.net_max = parseFloat(accountInfo.net_limit.max / 10000)
      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = parseFloat(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = parseFloat(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      this.totalRefund = refunding_cpu_amount + refunding_net_amount
      this.cpu_staked = parseFloat(accountInfo.total_resources.cpu_weight.split(' ')[0])
      this.net_staked = parseFloat(accountInfo.total_resources.net_weight.split(' ')[0])
      this.cpu_user = 0
      this.net_user = 0

      this.staked = this.net_staked + this.cpu_staked
      this.totalBalance = this.net_staked + this.cpu_staked + this.totalRefund + this.liquid
      this.permissions = accountInfo.permissions

      if (accountInfo.voter_info) {
        const myProducers = Object.keys(accountInfo.voter_info.producers).map(k => {
          return accountInfo.voter_info.producers[k]
        })

        this.myBlockProducers = myProducers.sort()
        this.is_proxy = accountInfo.voter_info.is_proxy
        this.proxy = accountInfo.voter_info.proxy
      }

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

  createNewAccount = async (
    accountName,
    ownerPubKey,
    activePubKey,
    cpuStake,
    netStake,
    ramPurchase,
    transfer
  ) => {
    if (!this.account) return

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.newaccount(
        {
          creator: this.account.name,
          name: accountName,
          owner: ownerPubKey,
          active: activePubKey
        },
        options
      )

      tr.buyrambytes(
        {
          payer: this.account.name,
          receiver: accountName,
          bytes: ramPurchase
        },
        options
      )

      tr.delegatebw(
        {
          from: this.account.name,
          receiver: accountName,
          stake_net_quantity: Number(netStake).toFixed(4) + ' EOS',
          stake_cpu_quantity: Number(cpuStake).toFixed(4) + ' EOS',
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
    if (0 >= nextCpu || 0 >= nextNet || !this.liquid) {
      return false
    }

    const limit = this.cpu_staked + this.net_staked + this.liquid
    const nextTotal = nextCpu + nextNet

    const isValid = nextTotal <= limit ? true : false
    return isValid
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

  setStake = async (net, cpu) => {
    if (!this.account) {
      return
    }

    const { increaseInStake, decreaseInStake } = this.getStakeChanges(net, cpu)

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
    let tokens = []
    let tokenSymbols = [
      {
        code: 'eosio.token',
        account: accountName,
        symbol: 'EOS'
      }
    ]

    let eosToken = await EosAgent.getCurrencyBalance(tokenSymbols[0])
    tokens = tokens.concat(eosToken)

    if (lastAction && lastAction.actions.length > 0) {
      totalActions = lastAction.actions[0].account_action_seq

      let totalPage = parseInt(totalActions / Values.actionPerPage, 10)
      if (totalActions % Values.actionPerPage !== 0) {
        totalPage++
      }

      let tempTokenSymbols = []

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

        tempTokenSymbols = tempTokenSymbols.concat(results)
      }

      tempTokenSymbols = Values.removeDuplicates(tempTokenSymbols, 'symbol')
      let len = tempTokenSymbols.length
      let tempTokens = []

      for (let i = 0; i < len; i++) {
        try {
          let token = await EosAgent.getCurrencyBalance(tempTokenSymbols[i])
          tempTokens = tempTokens.concat(token)
        } catch (e) {}
      }

      tokenSymbols = tokenSymbols.concat(tempTokenSymbols)
      tokens = tokens.concat(tempTokens)
    }

    this.tokens = tokens
    this.tokenSymbols = tokenSymbols
  }

  validateAccountName = newVal => {
    return Values.ACCOUNT_NAME_PATTERN.exec(newVal) ? true : false
  }

  validateReceiverAccountName = newVal => {
    return newVal ? true : false
  }

  validateOwnerPubKey = newVal => {
    return newVal ? true : false
  }

  validateActivePubKey = newVal => {
    return newVal ? true : false
  }

  validateCpuStake = newVal => {
    return newVal >= Values.SEED_CPU ? true : false
  }

  validateNetStake = newVal => {
    return newVal >= Values.SEED_NET ? true : false
  }

  validateRamPurchaseOnCreation = newVal => {
    return newVal >= Values.SEED_RAM_BYTES ? true : false
  }

  validateRamPurchase = newVal => {
    return newVal > 0 ? true : false
  }

  validateRamSell = newVal => {
    return newVal > 0 ? true : false
  }

  changeRamPurchaseUnit = isEosUnit => {
    if (isEosUnit === true) {
      this.ramPurchaseInput = Values.SEED_RAM_EOS
    } else {
      this.ramPurchaseInput = Values.SEED_RAM_BYTES
    }

    this.isEosUnit = isEosUnit
  }

  buyRAM = async (isEosUnit, receiverAccountName, ramPurchase) => {
    return isEosUnit
      ? await this.buyRAMEos(receiverAccountName, ramPurchase)
      : await this.buyRAMBytes(receiverAccountName, ramPurchase)
  }

  sellRAM = async ramSell => {
    if (!this.account) {
      return
    }

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.sellram(
        {
          account: this.account.name,
          bytes: Number(ramSell)
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  buyRAMEos = async (receiverAccountName, ramPurchase) => {
    if (!this.account) {
      return
    }

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.buyram(
        {
          payer: this.account.name,
          receiver: receiverAccountName,
          quant: `${Number(ramPurchase)
            .toFixed(4)
            .toString()} EOS`
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  buyRAMBytes = async (receiverAccountName, ramPurchase) => {
    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.buyrambytes(
        {
          payer: this.account.name,
          receiver: receiverAccountName,
          bytes: Number(ramPurchase)
        },
        options
      )
    }

    return await EosAgent.createTransaction(cb)
  }

  transferToken = async (toAccountName, symbol, quantity, memo) => {
    let contract

    for (let i = 0; i < this.tokenSymbols.length; i++) {
      if (symbol === this.tokenSymbols[i].symbol) {
        contract = this.tokenSymbols[i].code
        break
      }
    }

    const cb = tr => {
      const options = { authorization: [`${this.account.name}@${this.account.authority}`] }

      tr.transfer(
        {
          from: this.account.name,
          to: toAccountName,
          quantity: `${Number(quantity)
            .toFixed(4)
            .toString()} ${symbol}`,
          memo: memo
        },
        options
      )
    }

    return await EosAgent.createTransactionWithContract(contract, cb)
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
  isReceiverAccountValid: observable,
  isRAMpurchaseValid: observable,
  isRAMsellValid: observable,
  isMemoValid: observable,
  isEosUnit: observable,
  receiverAccountNameInput: observable,
  ramSellInput: observable,
  eosBalance: observable,
  totalBalance: observable,
  totalRefund: observable,
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
  setStake: action,
  changeRamPurchaseUnit: action,
  buyRAM: action,
  sellRAM: action,
  transferToken: action,
  voteProducer: action,
  changeVoterProxy: action,
  getAccountTokens: action
})

export default new AccountStore()
