import * as Values from "./constants/Values"

class EosAgent {
  constructor() {
    this._initialized = false
    this.identity = null
    this.accountName = null
    this.eos = null

    document.addEventListener("scatterLoaded", scatterExtension => {
      console.log("scatterloaded")
      this.scatter = window.scatter

      if (this.scatter) {
        this._initialized = true
        //window.scatter = null;
      }
    })
  }

  getCurrencyBalance = async tokenSymbol => {
    if (!this.eos) {
      return
    }

    let balance = await this.eos.getCurrencyBalance({
      code: "eosio.token",
      account: this.accountName.name,
      symbol: tokenSymbol
    })

    return balance
  }

  getAccountInfo = async () => {
    if (!this.eos) {
      return
    }

    let account = await this.eos.getAccount({
      account_name: this.accountName.name
    })

    return account
  }

  loginWithPrivateKey = privKey => {
    let endPoint = Values.NETWORK.protocol + "://" + Values.NETWORK.host + ":" + Values.NETWORK.port

    this.eos = Eos({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId,
      keyProvider: privKey
    })

    this._initialized = true

    // todo - get account info
    return { name: "test", authority: "active" }
  }

  loginWithScatter = async () => {
    if (!this.scatter) {
      return
    }

    let id = await this.scatter.getIdentity(Values.requiredFields)

    if (id) {
      this.scatter.useIdentity(id)
      console.log("Possible identity", this.scatter.identity)
      const accountName = this.scatter.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )

      this.accountName = accountName
      this.identity = id

      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)

      return this.accountName
    }
  }

  logout = async () => {
    if (!this.scatter) {
      return
    }

    let res = await this.scatter.forgetIdentity()

    console.log("logout : " + res)
  }
}

export default new EosAgent()
