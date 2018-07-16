import axios from 'axios'

class ApiAgent {
  getCoinMarketCap = () => {
    return axios.get('https://api.coinmarketcap.com/v2/ticker/1765')
  }
}

export default new ApiAgent()
