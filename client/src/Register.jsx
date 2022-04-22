import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import image from "./resources/FindYourFitLogo.png";
import "./styles/Login.css";

class Register extends Component { //Constructor, initialize the fields of this component
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      registerParams: {
        username: "",
        password: "",
        password_2: "",
      }
    };
  }
  
  handleFormChange = event => { //Same as Login component, update field any time the user types
    let registerParamsNew = { ...this.state.registerParams };
    let val = event.target.value;
    registerParamsNew[event.target.name] = val;
    this.setState({
      registerParams: registerParamsNew
    });
  };

  register = event => { //Post request to server when the user officially registers
    let username = this.state.registerParams.username;
    let password = this.state.registerParams.password;
    let password_2 = this.state.registerParams.password_2;

    if (username.length !== 0 && password.length !== 0 && password === password_2) {
      axios.post("http://localhost:5000/add_user", {
        user_name: username,
        //user_email
        //user_info
        //user_intro
        password: password,
      })
      .then((response) => {
        if (response.status === "success") {
          this.setState({
            isRegistered: true
          });
        }
        else {
          console.log("error");
          alert("Error registering");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Error registering");
      });      
    }
    else {
      console.log("Error");
      alert("Error: please enter valid inputs. Make sure passwords match.")
    }
    event.preventDefault();
  };
  
  render() { //Render component
    if (this.state.isRegistered) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <img src = {image} className = "center"></img><br/>
        <form onSubmit={this.register} className="form-register">
          <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="username"
                onChange={this.handleFormChange}
                placeholder="Enter New Username"
              />
              <input
                type="text"
                name="password"
                onChange={this.handleFormChange}
                placeholder="Enter New Password"
              />
              <input
                type="text"
                name="password_2"
                onChange={this.handleFormChange}
                placeholder="Enter Password Again"
              />
              <input type="submit" value="Register" />
            </div>
          </div>
        </form><br/>
        <Link to="/login" >
          <button className = "center">
            Back to Login
          </button>
        </Link>
      </div>
    );
  }
}
export default Register;
