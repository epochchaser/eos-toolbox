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
          <div class="pcoded-overlay-box"></div>
          <div class="pcoded-container navbar-wrapper">
            <Header />
            <div class="pcoded-main-container">
              <div class="pcoded-wrapper">
                <Nav className="content-nav" />
                <Main className="content-main" />
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
