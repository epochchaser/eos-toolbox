import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore')
@observer
class BpListView extends Component {
  constructor(props) {
    super(props)
    const { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  componentDidMount = async () => {
    await this.eosioStore.getGlobalInfo()
    this.eosioStore.getBlockProducers()
  }

  render() {
    let bpList = []

    if (this.eosioStore.blockProducers) {
      bpList = this.eosioStore.blockProducers.slice(0, 30)
    }

    return (
      <div className="col-md-6">
        <div className="card ">
          <div className="card-header ">
            <div className="card-header-left ">
              <h5>
                <FormattedMessage id="BP Top 30" />
              </h5>
            </div>
            <div className="card-header-right" style={{ display: 'none' }}>
              <ul className="list-unstyled card-option">
                <li>
                  <i className="icofont icofont-simple-left " />
                </li>
                <li>
                  <i className="icofont icofont-maximize full-card" />
                </li>
                <li>
                  <i className="icofont icofont-minus minimize-card" />
                </li>
                <li>
                  <i className="icofont icofont-refresh reload-card" />
                </li>
                <li>
                  <i className="icofont icofont-error close-card" />
                </li>
              </ul>
            </div>
          </div>
          <div className="card-block ">
            {bpList.map((p, index) => (
              <div
                key={index}
                className={
                  index === 0 ? 'browser-card p-b-15 ' : 'browser-card b-t-default p-t-15 p-b-15 '
                }
              >
                <p className="d-inline-block m-0 ">
                  <a href={p.url} target="_blank">
                    {index + 1}. {p.owner}
                  </a>
                </p>
                <label
                  className={
                    'label bg-c-blue btn-round float-right btn-browser' +
                    (index / 10 < 1
                      ? ' bg-c-blue'
                      : index / 10 < 2
                        ? ' bg-c-green'
                        : index / 10 < 3
                          ? ' bg-c-yellow'
                          : ' bg-c-pink')
                  }
                >
                  {`${(p.percent * 100).toFixed(3)}%`}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default BpListView