import React, { Component } from 'react'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('eosioStore')
@observer
class FindAccount extends Component {
  render() {
    return <div>반갑구나 find account</div>
  }
}

export default FindAccount
