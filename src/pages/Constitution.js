import React, { Component, Fragment } from 'react'
import EosConstitutionView from '../components/constitution/EosConstitutionView'

class Constitution extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <EosConstitutionView />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Constitution
