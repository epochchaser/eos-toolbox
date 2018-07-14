import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('eosioStore')
class Voting extends Component {
  constructor(props) {
    console.log('가자')
    super(props)
    let { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  componentDidMount = async () => {
    const voters = await this.eosioStore.getVoters()
    // todo
    console.log(voters)
  }

  render() {
    return <div />
  }
}

export default Voting
