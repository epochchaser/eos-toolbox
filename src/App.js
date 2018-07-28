import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './layout/Header'
import Nav from './layout/Nav'
import Main from './layout/Main'
import LoadView from './components/LoadView'
import './styles/App.scss'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <LoadView />

          <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box" />
            <div className="pcoded-container navbar-wrapper">
              <Header />
              <div className="pcoded-wrapper">
                <Nav className="content-nav" />
                <div className="pcoded-content">
                  <div className="pcoded-inner-content">
                    <div className="main-body">
                      <Main className="content-main" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
