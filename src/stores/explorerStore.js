import { decorate, observable, action } from 'mobx'
import * as Values from '../constants/Values'
import sortBy from 'lodash/sortBy'
import EosAgent from '../EosAgent'
import $ from 'jquery'

export class ExplorerStore {
  isLoading = false
  isActionLoading = false
  isTokenLoading = false
  account = null
  accounts = null
  tokens = null
  transaction = null
  actions = null
  block = null
  newAccountHistory = null

  setIsActionLoading(isActionLoading) {
    this.isActionLoading = isActionLoading
  }

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
    this.block = null

    if ($.isNumeric(query)) {
      try {
        let block = await EosAgent.getBlock(query)

        if (block) {
          this.block = block
        }
      } catch (e) {}
    } else {
      if (query.length < 13) {
        // account
        try {
          let acc = await EosAgent.getAccount(query)
          if (acc) {
            this.account = acc
            const balance = this.account.core_liquid_balance
              ? Number(this.account.core_liquid_balance.replace('EOS', ''))
              : 0.0
            const cpu = this.account.total_resources
              ? Number(this.account.total_resources.cpu_weight.replace('EOS', ''))
              : 0.0
            const net = this.account.total_resources
              ? Number(this.account.total_resources.net_weight.replace('EOS', ''))
              : 0.0
            const refundCpu = this.account.refund_request
              ? Number(this.account.refund_request.cpu_amount.replace('EOS', ''))
              : 0.0
            const refundNet = this.account.refund_request
              ? Number(this.account.refund_request.net_amount.replace('EOS', ''))
              : 0.0

            this.account.refund = refundCpu + refundNet
            this.account.unstake = balance
            this.account.cpu = cpu
            this.account.net = net
            this.account.stake = cpu + net
            this.account.total = balance + cpu + net + refundCpu + refundNet
            //{"account_name":"faceostest12","head_block_num":6338170,"head_block_time":"2018-07-17T10:44:44.000","privileged":false,"last_code_update":"2018-07-05T01:25:05.500","created":"2018-07-02T02:03:31.000","core_liquid_balance":"0.1450 EOS","ram_quota":108603,"net_weight":1000,"cpu_weight":1000,"net_limit":{"used":145,"available":57142,"max":57287},"cpu_limit":{"used":1223,"available":9682,"max":10905},"ram_usage":94877,"permissions":[{"perm_name":"active","parent":"owner","required_auth":{"threshold":1,"keys":[{"key":"EOS63xaWw2Wy1LfiLanRcZDf4JSP4UFTBAXkCGJb86jAdJwju5cvr","weight":1}],"accounts":[],"waits":[]}},{"perm_name":"owner","parent":"","required_auth":{"threshold":1,"keys":[{"key":"EOS5NxjDAqd6CTTeKVUe8yu5U4zmU9SQhcDvTv83YKbGAweiNkMaY","weight":1}],"accounts":[],"waits":[]}}],"total_resources":{"owner":"faceostest12","net_weight":"0.1000 EOS","cpu_weight":"0.1000 EOS","ram_bytes":108603},"self_delegated_bandwidth":null,"refund_request":null,"voter_info":{"owner":"faceostest12","proxy":"","producers":[],"staked":0,"last_vote_weight":"0.00000000000000000","proxied_vote_weight":"0.00000000000000000","is_proxy":0}}

            //{"account_name":"devmasmehshs","head_block_num":6470778,"head_block_time":"2018-07-18T06:07:52.500","privileged":false,"last_code_update":"1970-01-01T00:00:00.000","created":"2018-07-09T09:35:05.000","ram_quota":4075,"net_weight":100,"cpu_weight":100,"net_limit":{"used":113,"available":6101,"max":6214},"cpu_limit":{"used":407,"available":775,"max":1182},"ram_usage":3743,"permissions":[{"perm_name":"active","parent":"owner","required_auth":{"threshold":1,"keys":[{"key":"EOS5T6VFGH66LeiLnNh738CxMnq4VwXN3RdaSNQ7JTFdmXgehYAGL","weight":1}],"accounts":[],"waits":[]}},{"perm_name":"owner","parent":"","required_auth":{"threshold":1,"keys":[{"key":"EOS5T6VFGH66LeiLnNh738CxMnq4VwXN3RdaSNQ7JTFdmXgehYAGL","weight":1}],"accounts":[],"waits":[]}}],"total_resources":{"owner":"devmasmehshs","net_weight":"0.0100 EOS","cpu_weight":"0.0100 EOS","ram_bytes":4075},"self_delegated_bandwidth":{"from":"devmasmehshs","to":"devmasmehshs","net_weight":"0.0100 EOS","cpu_weight":"0.0100 EOS"},"refund_request":null,"voter_info":{"owner":"devmasmehshs","proxy":"","producers":[],"staked":200,"last_vote_weight":"0.00000000000000000","proxied_vote_weight":"0.00000000000000000","is_proxy":0}}
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
              //{"id":"57a7a50c5e27c674667197e600c0899308f1fc3f7ca8978b89b5b1a5fe5c7e18","trx":{"receipt":{"status":"executed","cpu_usage_us":753,"net_usage_words":14,"trx":[1,{"signatures":["SIG_K1_KUsV4LzCp1Di3uFZMEUTT1ftANaemr6LtzZ64Lm1t5fLxixwusWu99qWRxkmKeCYMXY9xF6BxxCap4B1BtPYZxAX9obBsm"],"compression":"none","packed_context_free_data":"","packed_trx":"efba4d5b61991faac2cf00000000012042c62a63aa9059000000000095dde501a0a38e5737085d3b00000000a8ed32320fa0a38e5737085d3b000568656c6c6f00"}]},"trx":{"expiration":"2018-07-17T09:46:23","ref_block_num":39265,"ref_block_prefix":3485641247,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"faceostest12","name":"write","authorization":[{"actor":"bhikkhurlulu","permission":"active"}],"data":{"author":"bhikkhurlulu","title":"","content":"hello"},"hex_data":"a0a38e5737085d3b000568656c6c6f"}],"transaction_extensions":[],"signatures":["SIG_K1_KUsV4LzCp1Di3uFZMEUTT1ftANaemr6LtzZ64Lm1t5fLxixwusWu99qWRxkmKeCYMXY9xF6BxxCap4B1BtPYZxAX9obBsm"],"context_free_data":[]}},"block_time":"2018-07-17T09:45:26.500","block_num":6331063,"last_irreversible_block":6437478,"traces":[{"receipt":{"receiver":"faceostest12","act_digest":"b153700783f710deb08a61b30cc3be5b19a4e8c7639bcc924c3034e6fc802064","global_sequence":30827628,"recv_sequence":54,"auth_sequence":[["bhikkhurlulu",59]],"code_sequence":3,"abi_sequence":3},"act":{"account":"faceostest12","name":"write","authorization":[{"actor":"bhikkhurlulu","permission":"active"}],"data":{"author":"bhikkhurlulu","title":"","content":"hello"},"hex_data":"a0a38e5737085d3b000568656c6c6f"},"elapsed":362,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"57a7a50c5e27c674667197e600c0899308f1fc3f7ca8978b89b5b1a5fe5c7e18","inline_traces":[]}]}

              //{"id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","trx":{"receipt":{"status":"executed","cpu_usage_us":1296,"net_usage_words":0,"trx":[0,"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6"]}},"block_time":"2018-07-07T10:49:37.500","block_num":4623006,"last_irreversible_block":6468577,"traces":[{"receipt":{"receiver":"eosio","act_digest":"f9ebf7d1c77c74a3ee30cb12cbe91c32bb6c48b58f1702755526b21cacbfb3da","global_sequence":14150666,"recv_sequence":6457010,"auth_sequence":[["faceostest12",66]],"code_sequence":7,"abi_sequence":8},"act":{"account":"eosio","name":"refund","authorization":[{"actor":"faceostest12","permission":"active"}],"data":{"owner":"faceostest12"},"hex_data":"2042c62a63aa9059"},"elapsed":786,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[{"receipt":{"receiver":"eosio.token","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150667,"recv_sequence":1582925,"auth_sequence":[["eosio.stake",48405]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":501,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[{"receipt":{"receiver":"eosio.stake","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150668,"recv_sequence":292957,"auth_sequence":[["eosio.stake",48406]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":5,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]},{"receipt":{"receiver":"faceostest12","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150669,"recv_sequence":43,"auth_sequence":[["eosio.stake",48407]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":2302,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]}]}]},{"receipt":{"receiver":"eosio.token","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150667,"recv_sequence":1582925,"auth_sequence":[["eosio.stake",48405]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":501,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[{"receipt":{"receiver":"eosio.stake","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150668,"recv_sequence":292957,"auth_sequence":[["eosio.stake",48406]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":5,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]},{"receipt":{"receiver":"faceostest12","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150669,"recv_sequence":43,"auth_sequence":[["eosio.stake",48407]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":2302,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]}]},{"receipt":{"receiver":"eosio.stake","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150668,"recv_sequence":292957,"auth_sequence":[["eosio.stake",48406]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":5,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]},{"receipt":{"receiver":"faceostest12","act_digest":"5656270cd5cd602e467826caa5456e1f4ca7378bcf8b9696e31150a04fa63a6e","global_sequence":14150669,"recv_sequence":43,"auth_sequence":[["eosio.stake",48407]],"code_sequence":1,"abi_sequence":1},"act":{"account":"eosio.token","name":"transfer","authorization":[{"actor":"eosio.stake","permission":"active"}],"data":{"from":"eosio.stake","to":"faceostest12","quantity":"0.1000 EOS","memo":"unstake"},"hex_data":"0014341903ea30552042c62a63aa9059e80300000000000004454f530000000007756e7374616b65"},"elapsed":2302,"cpu_usage":0,"console":"","total_cpu_usage":0,"trx_id":"8bd98830ad95a81dc3db10503d8d566fcedef3a633b8bb5fdbfecb5a8ef2acd6","inline_traces":[]}]}
            }
          } catch (e) {}
        }
      }
    }

    this.isLoading = false
  }

  getActions = async accountName => {
    this.isActionLoading = true
    this.actions = null
    this.tokens = null

    try {
      let actions = await EosAgent.getActions(accountName, 0, 10000)

      if (actions) {
        this.actions = sortBy(actions.actions, 'block_time').reverse()
      }
    } catch (e) {}

    this.isActionLoading = false
  }

  // mayajuni(itam_ma) in itam netrowk
  // https://eoscanner.io
  getAccountTokens = async accountName => {
    this.isTokenLoading = true
    this.tokens = null

    if (this.actions) {
      let results = this.actions
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

      results = Values.removeDuplicates(results, 'symbol')
      const len = results.length

      this.tokens = []

      for (let i = 0; i < len; i++) {
        try {
          let token = await EosAgent.getCurrencyBalance(results[i])
          this.tokens = this.tokens.concat(token)
        } catch (e) {}
      }
    }

    this.isTokenLoading = false
  }

  getVotingHistory = async accountName => {
    if (!this.actions) {
      await this.getActions(accountName)
    }

    let results = this.actions
      .filter((action, idx, array) => {
        if (action.action_trace.act.name === 'voteproducer') {
          return true
        } else {
          return false
        }
      })
      .map(a => {
        return {
          producers: a.action_trace.act.data.producers
        }
      })
  }

  getNewAccountHistory = async accountName => {
    if (!this.actions) {
      await this.getActions(accountName)
    }

    let results = this.actions
      .filter((action, idx, array) => {
        if (action.action_trace.act.name === 'newaccount') {
          return true
        } else {
          return false
        }
      })
      .map(a => {
        return {
          account: a.action_trace.act.data.name,
          creation: a.block_time
        }
      })

    console.log(results)
    this.newAccountHistory = results
  }
}

decorate(ExplorerStore, {
  isLoading: observable,
  account: observable,
  accounts: observable,
  transaction: observable,
  tokens: observable,
  newAccountHistory: observable,
  isActionLoading: observable,
  isTokenLoading: observable,
  block: observable,
  actions: observable,
  search: action,
  setIsLoading: action,
  getActions: action,
  getVotingHistory: action,
  getNewAccountHistory: action,
  setIsActionLoading: action
})

export default new ExplorerStore()
