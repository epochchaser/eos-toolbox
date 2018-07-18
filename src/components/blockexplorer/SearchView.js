import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class SearchView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
    this.state = {
      query: this.props.query ? this.props.query : '',
      pathname: this.props.pathname,
      redirectionPath: ''
    }

    this.props.history.listen((location, action) => {
      if (location.pathname !== this.state.pathname) {
        const query = location.pathname.replace('/blockexplorers/', '')
        this.setState({
          query: query,
          pathname: location.pathname,
          redirectionPath: ''
        })

        this.explorerStore.search(query)
      }
    })
  }

  componentDidMount = () => {
    this.explorerStore.search(this.state.query)
  }

  onQueryChange = e => {
    this.setState({
      query: e.target.value
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.goToSearch()
      //this.explorerStore.search(this.state.query)
    }
  }

  onSearchClick = e => {
    this.goToSearch()
    //this.explorerStore.search(this.state.query)
  }

  goToSearch = () => {
    this.setState({
      redirectionPath: '/blockexplorers/' + this.state.query
    })
  }

  render() {
    if (this.state.redirectionPath && this.state.redirectionPath !== this.state.pathname) {
      return <Redirect push to={this.state.redirectionPath} />
    }

    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 m-t-10">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="EOS Block Explorer" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Search with account, public key, transaction id, block number" />
                </p>
              </div>
            </div>
            <div className="row seacrh-header">
              <div className="col-lg-6 offset-lg-3 offset-sm-2 col-sm-8 offset-sm-1 col-xs-12">
                <div className="input-group input-group-button input-group-primary">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                    value={this.state.query}
                    onChange={this.onQueryChange}
                    onKeyPress={this.handleKeyPress}
                  />
                  <button
                    className="btn btn-primary input-group-addon"
                    id="block-search"
                    onClick={this.onSearchClick}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchView
