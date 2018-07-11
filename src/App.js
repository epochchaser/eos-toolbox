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
            <section className="content">
              <Main className="content-main" />
              <Nav className="content-nav" />
            </section>
          </div>

          <footer />
        </div>
      </Router>
    )
  }
}

export default App
