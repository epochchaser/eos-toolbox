import { decorate, observable, action, computed } from 'mobx'
import EosAgent from '../EosAgent'

export class ExplorerStore {
  isLoading = false
  account = null
  accounts = null
  transaction = null

  setIsLoading(isLoading) {
    this.isLoading = isLoading
  }

  search = async query => {
    if (!query) {
      return
    }

    this.isLoading = true
    this.account = null
    this.accounts = null
    this.transaction = null

    console.log(query.length)
    if (query.length < 13) {
      // account
      try {
        let acc = await EosAgent.getAccount(query)
        if (acc) {
          this.account = acc
          //{"account_name":"faceostest12","head_block_num":6298751,"head_block_time":"2018-07-17T05:05:25.500","privileged":false,"last_code_update":"2018-07-05T01:25:05.500","created":"2018-07-02T02:03:31.000","core_liquid_balance":"0.1450 EOS","ram_quota":108603,"net_weight":1000,"cpu_weight":1000,"net_limit":{"used":145,"available":57132,"max":57277},"cpu_limit":{"used":1223,"available":5008,"max":6231},"ram_usage":94877,"permissions":[{"perm_name":"active","parent":"owner","required_auth":{"threshold":1,"keys":[{"key":"EOS63xaWw2Wy1LfiLanRcZDf4JSP4UFTBAXkCGJb86jAdJwju5cvr","weight":1}],"accounts":[],"waits":[]}},{"perm_name":"owner","parent":"","required_auth":{"threshold":1,"keys":[{"key":"EOS5NxjDAqd6CTTeKVUe8yu5U4zmU9SQhcDvTv83YKbGAweiNkMaY","weight":1}],"accounts":[],"waits":[]}}],"total_resources":{"owner":"faceostest12","net_weight":"0.1000 EOS","cpu_weight":"0.1000 EOS","ram_bytes":108603},"self_delegated_bandwidth":null,"refund_request":null,"voter_info":{"owner":"faceostest12","proxy":"","producers":[],"staked":0,"last_vote_weight":"0.00000000000000000","proxied_vote_weight":"0.00000000000000000","is_proxy":0}}
        }
      } catch (e) {}
    } else {
      if (query.startsWith('EOS')) {
        try {
          // public key
          let accs = await EosAgent.getKeyAccounts(query)
          if (accs) {
            this.accounts = accs
            //['faceostest12']
          }
        } catch (e) {}
      } else {
        try {
          // transaction
          let tran = await EosAgent.getTransaction(query)
          if (tran) {
            this.transaction = tran
            //{"id":"5aef25b8eb1afc28c7809a12ada5edd48e335140705e9990eec33d12f4d1b30b","trx":{"receipt":{"status":"executed","cpu_usage_us":443,"net_usage_words":13,"trx":[1,{"signatures":["SIG_K1_KdpTTUuJC2rwj5xX3C2EWwniULzvncekWTnE8FD5DnmejNAmTXEVhR6UNJSFWedDFb4grvDbfkKC6WAhUi6VacBVKecfS5"],"compression":"none","packed_context_free_data":"","packed_trx":"62fe4a5bd21e29b0c4b100000000017055ce8e6788683c0000000080ac14cf017055ce8e6788683c00000000a8ed32320605737461746500"}]},"trx":{"expiration":"2018-07-15T07:57:22","ref_block_num":7890,"ref_block_prefix":2982457385,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"blocktwitter","name":"tweet","authorization":[{"actor":"blocktwitter","permission":"active"}],"data":{"message":"state"},"hex_data":"057374617465"}],"transaction_extensions":[],"signatures":["SIG_K1_KdpTTUuJC2rwj5xX3C2EWwniULzvncekWTnE8FD5DnmejNAmTXEVhR6UNJSFWedDFb4grvDbfkKC6WAhUi6VacBVKecfS5"],"context_free_data":[]}},"block_time":"2018-07-15T07:11:57.500","block_num":5971996,"last_irreversible_block":6299438,"traces":[{"receipt":{"receiver":"blocktwitter","act_digest":"fec1c046aafa3679b5d9eee8dc0790587429049bafc636f11029e372b486bd31","global_sequence":23815169,"recv_sequence":5088092,"auth_sequence":[["blocktwitter",2592884]],"code_sequence":1,"abi_sequence":1},"act":{"account":"blocktwitter","name":"tweet","authorization":[{"actor":"blocktwitter","permission":"active"}],"data":{"message":"state"},"hex_data":"057374617465"},"elapsed":125,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"5aef25b8eb1afc28c7809a12ada5edd48e335140705e9990eec33d12f4d1b30b","inline_traces":[]}]}
          }
        } catch (e) {}
      }
    }

    this.isLoading = false
  }
}

decorate(ExplorerStore, {
  isLoading: observable,
  account: observable,
  accounts: observable,
  transaction: observable,
  search: action,
  setIsLoading: action
})

export default new ExplorerStore()
