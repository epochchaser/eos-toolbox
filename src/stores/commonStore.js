import { decorate, observable, action } from 'mobx'
import ApiAgent from '../ApiAgent'

export class CommonStore {
  isLoading = false
  _initilizedScatter = false
  _initilizedEos = false
  coinMarketCap = null

  setLoading = isLoading => {
    this.isLoading = isLoading
  }

  initScatter = isInit => {
    this._initilizedScatter = isInit
  }

  initEos = isInit => {
    this._initilizedEos = isInit
  }

  getCoinMarketCap = async () => {
    try {
      let result = await ApiAgent.getCoinMarketCap()

      if (result) {
        this.coinMarketCap = result
      }
    } catch (e) {
      console.log(e)
    }
  }
}

decorate(CommonStore, {
  isLoading: observable,
  _initilizedScatter: observable,
  _initilizedEos: observable,
  setLoading: action,
  initScatter: action,
  initEos: action
})

export default new CommonStore()
