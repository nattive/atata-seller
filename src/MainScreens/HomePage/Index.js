import React, { Component } from "react";
import {
  Container,
  Row,
  Header,
  Navbar,
  Nav,
  Dropdown,
  Icon,
  ButtonToolbar,
  Button,
} from "rsuite";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeNav from "./HomeNav";
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="container-fluid body">
          <HomeNav />
          <div className="body-text">
            <p>Sell on ATATA57, Reach millions of African buyers</p>
          </div>
        </div>
        <div className="container m-4">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <h3>Why Sell on ATATA57</h3>
              <p className="text-left mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique, necessitatibus excepturi tempore iste beatae
                exercitationem aut dolor qui dolorem porro earum, ad veritatis
                non? Praesentium laudantium nesciunt maxime nisi ducimus!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
