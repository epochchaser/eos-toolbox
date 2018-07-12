import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import MyAccountView from "../components/MyAccountView"

@inject("accountStore")
@observer
class Home extends Component {

  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  render() {
    return (
      <div>
        {
          this.accountStore.isLogin && 
          <MyAccountView />
        }
        {
          !this.accountStore.isLogin &&
          <div>HOME 반가워</div>
        }
      </div>
    );
  }
}

export default Home
