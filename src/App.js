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
      <Router>
        <div>
          <LoadView />

          <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box" />
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
        </div>
      </Router>
    )
  }
}

export default App




<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600" rel="stylesheet"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"><link rel="shortcut icon" href="/eos-toolbox/favicon.ico"><link rel="stylesheet" href="/eos-toolbox/assets/icon/icofont/css/icofont.css"><link rel="stylesheet" href="/eos-toolbox/assets/icon/themify-icons/themify-icons.css"><title>Eos Toolbox</title></head><body><div id="root"></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="static/js/bundle.js"></script><script type="text/javascript" src="/eos-toolbox/assets/pages/widget/excanvas.js"></script><script type="text/javascript" src="/eos-toolbox/assets/js/jquery.slimscroll.js"></script><script type="text/javascript" src="/eos-toolbox/assets/js/SmoothScroll.js"></script><script src="/eos-toolbox/assets/js/jquery.mCustomScrollbar.concat.min.js"></script><script src="/eos-toolbox/assets/js/pcoded.min.js"></script><script src="/eos-toolbox/assets/js/vartical/vartical-layout.min.js"></script><script type="text/javascript" src="/eos-toolbox/assets/js/script.js"></script><script type="text/javascript" src="/eos-toolbox/static/js/main.e265ba8a.js"></script></body></html>
