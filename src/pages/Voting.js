import React, { Component } from 'react'
import MyVotecastView from '../components/voting/MyVotecastView'
import MyVoteSummary from '../components/voting/MyVoteSummary'
import BlockProducersView from '../components/voting/BlockProducersView'
import '../styles/pages/Voting.scss'

class Voting extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="page-body">
          <div className="row">
            <div className="col-md-12 col-xl-5">
              <MyVoteSummary />
              <MyVotecastView />
            </div>

            <div className="col-md-12 col-xl-7">
              <BlockProducersView />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
