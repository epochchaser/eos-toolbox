import React from "react"
import "../styles/Header.css"

const Header = props => {
  return (
    <div className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar p-3 px-md-4 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">EOS Toolbox</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="#">
          About
        </a>
        <a className="p-2 text-dark" href="#">
          Github
        </a>
        <a className="p-2 text-dark" href="#">
          Contribute
        </a>
      </nav>
      <a className="btn btn-outline-primary" href="#">
        Login
      </a>
    </div>
  )
}

export default Header
