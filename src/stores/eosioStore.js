import { decorate, observable, action, computed } from 'mobx'
import * as Values from '../constants/Values'
import EosAgent from '../EosAgent'
import Eos from 'eosjs'

export class EosioStore {
  global = null
  blockProducers = null
  ramMarkets = null
  voters = null
  nameBids = null
  scatter = null
  eos = null
  identity = null
  loginAccount = null

  setScatter = scatter => {
    this.scatter = scatter
  }

  initEosAgent = async id => {
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

  getGlobalInfo = () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'global'
    }

    let globalInfo = EosAgent.getTableRows(query)
    //{"rows":[{"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_net_usage":524288,"base_per_transaction_net_usage":12,"net_usage_leeway":500,"context_free_discount_net_usage_num":20,"context_free_discount_net_usage_den":100,"max_block_cpu_usage":200000,"target_block_cpu_usage_pct":1000,"max_transaction_cpu_usage":150000,"min_transaction_cpu_usage":100,"max_transaction_lifetime":3600,"deferred_trx_expiration_window":600,"max_transaction_delay":3888000,"max_inline_action_size":4096,"max_inline_action_depth":4,"max_authority_depth":6,"max_ram_size":"68719476736","total_ram_bytes_reserved":"54375646207","total_ram_stake":"37909516538","last_producer_schedule_update":"2018-07-13T06:03:12.000","last_pervote_bucket_fill":"1531461791000000","pervote_bucket":241663153,"perblock_bucket":33931983,"total_unpaid_blocks":87234,"total_activated_stake":"3078799576275","thresh_activated_stake_time":"1529505892000000","last_producer_schedule_size":21,"total_producer_vote_weight":"10100489608007821312.00000000000000000","last_name_close":"2018-07-11T15:27:03.500"}],"more":false}
    // todo
  }

  getBlockProducers = () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
      limit: 1000
    }

    let producers = EosAgent.getTableRows(query)
    // todo
  }

  getRamMarkets = () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rammarket',
      limit: 1
    }

    let producers = EosAgent.getTableRows(query)
    // todo
  }

  getVoters = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'voters',
      table_key: 'owner',
      limit: 1000
    }

    let voters = await EosAgent.getTableRows(query)
  }

  getProducers = () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
      table_key: 'producers',
      limit: 1000
    }

    console.log(`이오스 : ${this.eos} 가보자`)
    let producers = EosAgent.getTableRows(this.eos, query)
  }

  getNameBids = () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'namebids',
      table_key: 'newname',
      limit: 1000
    }

    let nameBids = EosAgent.getTableRows(query)
    // todo
  }
}

decorate(EosioStore, {
  global: observable,
  blockProducers: observable,
  ramMarkets: observable,
  voters: observable,
  nameBids: observable,
  scatter: observable,
  eos: observable,
  identity: observable,
  loginAccount: observable,
  getGlobalInfo: action,
  getBlockProducers: action,
  getRamMarkets: action,
  getVoters: action,
  getProducers: action,
  getNameBids: action,
  initScatter: action
})

export default new EosioStore()
