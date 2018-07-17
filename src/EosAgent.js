import * as Values from './constants/Values'
import Eos from 'eosjs'

const singleton = Symbol()
const singletonEosAgent = Symbol()

class EosAgent {
  constructor(eosAgent) {
    if (eosAgent !== singletonEosAgent) {
      throw new Error('Cannot construct singleton')
    }

    this.scatter = null
    this._initialized = false
    this.identity = null
    this.loginAccount = null

    let endPoint = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

    this.eos = Eos({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId
    })
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new EosAgent(singletonEosAgent)
    }

    return this[singleton]
  }

  get loginaccount() {
    return this.loginAccount
  }

  initScatter = scatter => {
    this.scatter = scatter
    this._initialized = true
  }

  initEosAgent = id => {
    if (id) {
      this.scatter.useIdentity(id)
      console.log('Possible identity', this.scatter.identity)
      const loginAccount = this.scatter.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )

      this.loginAccount = loginAccount
      this.identity = id

      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)

      return this.loginAccount
    }
  }

  getInfo = () => {
    if (!this.eos) {
      return
    }

    return this.eos.getInfo({})
  }

  getTransaction = cb => {
    if (!this.eos) {
      return
    }

    this.eos.transaction(cb)
  }

  getContract = async contractName => {
    if (!this.eos) {
      return
    }

    return await this.eos.contract(contractName)
  }

  getProducers = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getProducers(query)
  }

  getTableRows = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getTableRows(query)
  }

  voteProducer = async (account, producers = [], proxy = '') => {
    if (!this.eos) {
      return
    }

    return await this.eos.voteproducer(account, proxy, producers)
  }

  getCurrencyStats = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getCurrencyStats(query)
  }

  getCurrencyBalance = async tokenSymbol => {
    if (!this.eos) {
      return
    }

    let balance = await this.eos.getCurrencyBalance({
      code: 'eosio.token',
      account: this.loginAccount.name,
      symbol: tokenSymbol
    })

    return balance
  }

  getAccountInfo = async () => {
    if (!this.eos) {
      return
    }

    let account = await this.eos.getAccount({
      account_name: this.loginAccount.name
    })

    return account
  }

  getAccount = async accountName => {
    if (!this.eos) {
      return
    }

    let account = await this.eos.getAccount({ account_name: accountName })

    return account
  }

  getTransaction = async transactionId => {
    if (!this.eos) {
      return
    }

    let transaction = await this.eos.getTransaction({ id: transactionId })

    return transaction
  }

  getKeyAccounts = async publicKey => {
    if (!this.eos) {
      return
    }

    let accounts = await this.eos.getKeyAccounts({ public_key: publicKey })

    return accounts
  }

  delegate = async query => {
    if (!this.eos) {
      return
    }

    const result = await this.eos.transaction(tr => {
      tr.delegatebw(query)
    })

    console.log(result)
    return result
  }

  undelegate = async query => {
    const result = await this.eos.transaction(tr => {
      tr.undelegatebw(query)
    })

    return result
  }

  getActions = async (account_name, pos, offset) => {
    if (!this.eos) {
      return
    }

    let actions = await this.eos.getActions({
      account_name,
      pos,
      offset
    })

    return actions
  }

  loginWithPrivateKey = privKey => {
    let endPoint = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

    this.eos = Eos({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId,
      keyProvider: privKey
    })

    this._initialized = true

    // todo - get account info
    return { name: 'test', authority: 'active' }
  }

  loginWithScatter = async () => {
    if (!this.scatter) {
      return
    }

    let id = await this.scatter.getIdentity(Values.requiredFields)

    return this.initEosAgent(id)
  }

  logout = async () => {
    if (!this.scatter) {
      return
    }

    let res = await this.scatter.forgetIdentity()

    this._initialized = false
    this.identity = null
    this.loginAccount = null
    this.eos = null

    console.log('logout : ' + res)
  }
}

export default EosAgent.instance
