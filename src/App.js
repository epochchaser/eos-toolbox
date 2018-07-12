import React, { Component, Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./layout/Header"
import Nav from "./layout/Nav"
import Main from "./layout/Main"
import "./styles/App.scss"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="pcoded-overlay-box"></div>
          <div className="pcoded-container navbar-wrapper">
            <Header />
            <div className="pcoded-main-container">
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
          </div>
          <footer />
        </div>
      </Router>
    )
  }
}

export default App
