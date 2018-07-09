import React, { Component, Fragment } from "react"
import Header from "./layout/Header"
import Aside from "./layout/Aside"
import Content from "./layout/Content"
import "./styles/App.css"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-md-3 col-xl-2 py-5 bd-sidebar">
              <Aside />
            </div>

            <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
              <Content />
            </main>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
