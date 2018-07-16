import React, { Component } from 'react'
import MyVotecastView from '../components/MyVotecastView'
import BlockProducersView from '../components/BlockProducersView'
import '../styles/pages/Voting.scss'

class Voting extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="page-body">
          <div className="row">
            <div className="col-md-12 col-xl-4">
              <MyVotecastView />
            </div>

            <div className="col-md-12 col-xl-8">
              <BlockProducersView />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
