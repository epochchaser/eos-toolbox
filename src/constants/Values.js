const protocol = 'https'
const host = 'api.eosnewyork.io'
const port = 443
const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'

// export const protocol = 'http';
// export const host = '127.0.0.1';
// export const port = 8888;
// export const chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";

export const requiredFields = {
  accounts: [
    {
      blockchain: 'eos',
      host: host,
      port: port,
      chainId: chainId
    }
  ]
}

export const NETWORK = {
  blockchain: 'eos',
  protocol: protocol,
  host: host,
  port: port,
  chainId: chainId
}

export const CONFIG = {
  broadcast: true,
  sign: true,
  chainId: chainId
}

export const supportLanguage = ['ko-KR', 'en-US']

export const RAM_PURCHASE_UNIT_BYTES = 0
export const RAM_PURCHASE_UNIT_EOS = 1
