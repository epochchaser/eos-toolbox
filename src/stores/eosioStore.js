import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'
import sortBy from 'lodash/sortBy'

export class EosioStore {
  global = null
  eosInfo = null
  blockProducers = null
  ramMarkets = null
  ramInfo = null
  voters = null
  nameBids = null
  staking = null

  getInfo = async () => {
    let info = await EosAgent.getInfo()
    this.eosInfo = info
    // {"server_version":"60947c0c","chain_id":"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906","head_block_num":6034331,"last_irreversible_block_num":6033999,"last_irreversible_block_id":"005c124f52b8ff52faf9a1088879163327759deefd35fe7dd1d82e7ab292508c","head_block_id":"005c139b3f9f1d8c2419c906ad774a19661784270671b987aaad877964db5db2","head_block_time":"2018-07-15T15:59:03.500","head_block_producer":"eoscleanerbp","virtual_block_cpu_limit":200000000,"virtual_block_net_limit":1048576000,"block_cpu_limit":199900,"block_net_limit":1048576}
  }

  getGlobalInfo = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'global'
    }

    let globalInfo = await EosAgent.getTableRows(query)
    if (globalInfo) {
      this.global = globalInfo.rows[0]
    }

    //{"rows":[{"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_net_usage":524288,"base_per_transaction_net_usage":12,"net_usage_leeway":500,"context_free_discount_net_usage_num":20,"context_free_discount_net_usage_den":100,"max_block_cpu_usage":200000,"target_block_cpu_usage_pct":1000,"max_transaction_cpu_usage":150000,"min_transaction_cpu_usage":100,"max_transaction_lifetime":3600,"deferred_trx_expiration_window":600,"max_transaction_delay":3888000,"max_inline_action_size":4096,"max_inline_action_depth":4,"max_authority_depth":6,"max_ram_size":"68719476736","total_ram_bytes_reserved":"54375646207","total_ram_stake":"37909516538","last_producer_schedule_update":"2018-07-13T06:03:12.000","last_pervote_bucket_fill":"1531461791000000","pervote_bucket":241663153,"perblock_bucket":33931983,"total_unpaid_blocks":87234,"total_activated_stake":"3078799576275","thresh_activated_stake_time":"1529505892000000","last_producer_schedule_size":21,"total_producer_vote_weight":"10100489608007821312.00000000000000000","last_name_close":"2018-07-11T15:27:03.500"}],"more":false}
  }

  getBlockProducers = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
      limit: 1000
    }

    let totalProducerVoteWeight
    if (!this.global) {
      await this.getGlobalInfo()
      totalProducerVoteWeight = this.global.total_producer_vote_weight
    } else {
      totalProducerVoteWeight = this.global.total_producer_vote_weight
    }

    let backupMinimumPercent = false
    let tokensToProducersForVotes = false
    const currencyStats = await EosAgent.getCurrencyStats({ code: 'eosio.token', symbol: 'EOS' })
    const supply = parseFloat(currencyStats.EOS.supply)
    // yearly inflation
    const inflation = 0.04879
    // Tokens per year
    const tokensPerYear = supply * inflation
    // Tokens per day
    const tokensPerDay = tokensPerYear / 365
    // 1/5th of inflation
    const tokensToProducers = tokensPerDay * 0.2
    // 75% rewards based on votes
    tokensToProducersForVotes = tokensToProducers * 0.75
    // Percentage required to earn 100 tokens/day (break point for backups)
    backupMinimumPercent = 100 / tokensToProducersForVotes

    const result = await EosAgent.getTableRows(query)

    const data = result.rows
      .filter(p => p.producer_key !== 'EOS1111111111111111111111111111111114T1Anm')
      .map(producer => {
        const votes = parseInt(producer.total_votes, 10)
        const percent = votes / totalProducerVoteWeight
        const isBackup = backupMinimumPercent && percent > backupMinimumPercent

        return {
          key: `${producer.owner}-${producer.total_votes}`,
          last_produced_block_time: producer.last_produced_block_time,
          owner: producer.owner,
          producer_key: producer.producer_key,
          url: producer.url,
          isBackup,
          percent,
          votes
        }
      })

    this.blockProducers = sortBy(data, 'votes').reverse()
  }

  getStakingInfo = () => {
    const totalStake = this.global.total_activated_stake / 10000
    const totalStakePercent = (totalStake / 1000000000) * 100
    const ramStake = this.global.total_ram_stake / 10000
    const ramStakePercent = (ramStake / 1000000000) * 100
    // todo
    const totalVoting = 89039232
    const totalVotingPercent = (89039232 / 1000000000) * 100

    this.staking = {
      totalStake,
      totalStakePercent,
      ramStake,
      ramStakePercent,
      totalVoting,
      totalVotingPercent
    }
  }

  getRamMarkets = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rammarket',
      limit: 1
    }

    let ramMarkets = await EosAgent.getTableRows(query)
    if (ramMarkets) {
      this.ramMarkets = ramMarkets.rows[0]
      const ram = Number(this.ramMarkets.base.balance.replace('RAM', ''))
      const eos = Number(this.ramMarkets.quote.balance.replace('EOS', ''))
      const kbPrice = (eos / ram) * 1024
      const reservedRamPercent = Number(
        (this.global.total_ram_bytes_reserved / this.global.max_ram_size) * 100
      )
      const totalRamGb = this.global.max_ram_size / 1024 / 1024 / 1024
      const reservedRamGb = this.global.total_ram_bytes_reserved / 1024 / 1024 / 1024
      const freeRamGb =
        (this.global.max_ram_size - this.global.total_ram_bytes_reserved) / 1024 / 1024 / 1024

      this.ramInfo = {
        ram,
        eos,
        kbPrice,
        reservedRamPercent,
        totalRamGb,
        reservedRamGb,
        freeRamGb
      }
      //{"supply":"10000000000.0000 RAMCORE","base":{"balance":"16389760351 RAM","weight":"0.50000000000000000"},"quote":{"balance":"4192901.1209 EOS","weight":"0.50000000000000000"}}
    }
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

  getNameBids = async () => {
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'namebids',
      limit: 10000
    }

    let nameBids = await EosAgent.getTableRows(query)
    if (nameBids) {
      const data = nameBids.rows.filter(n => n.newname !== '').map(newname => {
        const highBid = newname.high_bid

        return {
          high_bid: highBid,
          newname: newname.newname,
          high_bidder: newname.high_bidder,
          last_bid_time: newname.last_bid_time
        }
      })

      this.nameBids = sortBy(data, 'high_bid').reverse()
    }
  }
}

decorate(EosioStore, {
  global: observable,
  eosInfo: observable,
  blockProducers: observable,
  ramMarkets: observable,
  ramInfo: observable,
  voters: observable,
  nameBids: observable,
  staking: observable,
  getInfo: action,
  getGlobalInfo: action,
  getBlockProducers: action,
  getStakingInfo: action,
  getRamMarkets: action,
  getVoters: action,
  getNameBids: action
})

export default new EosioStore()
