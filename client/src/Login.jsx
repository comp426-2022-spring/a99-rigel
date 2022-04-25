import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import image from "./resources/FindYourFitLogo.png"
import "./styles/Login.css";

class Login extends Component {
  constructor(props) { //Constructor, initialize the state of the Login component to have 2 fields:
    super(props);      //user_id, and user_password
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => { //Updates the user_id field or user_password field any time the user types
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  login = event => {  //Post request to server containing the current user_id and user_password fields
    const username = this.state.loginParams.user_id;
    const user_password = this.state.loginParams.user_password;
    axios.post("http://localhost:5000/login", {
      username: username,
      password: user_password
    })
    .then((response) => {
      alert(JSON.stringify(response))
      if (response.data.status === 1){//We store info about the current user locally in browser
        localStorage.setItem("token", "T")
        localStorage.setItem("username", username); 
        localStorage.setItem("password", user_password);
        localStorage.setItem("user_id", "5");
        this.setState({
          islogged: true
        });
      }
      else {
        alert(JSON.stringify(response))
        alert("Error: Invalid input")
      }
    })
    .catch(function (error) {
      alert(JSON.stringify(error))
      alert("Error with HTTP request");
    });
    event.preventDefault();
  };

  render() { //Render component
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <img src = {image} className = "center"></img><br/>
        <form onSubmit={this.login} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="user_id"
                onChange={this.handleFormChange}
                placeholder="Enter Username"
              />
              <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />
              <input type="submit" value="Login" />
              <Link to="/register" >
              <button>
                Register Here if You Don't Have an Account!
              </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;