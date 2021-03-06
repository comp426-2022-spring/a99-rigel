import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

class Register extends Component { //Constructor, initialize the fields of the component
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      registerParams: {
        username: "",
        password: "",
        password_2: "",
        email: "",
        info: "",
        intro: ""
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
      axios.post("http://localhost:5000/register", {
        user_name: this.state.registerParams.username,
        user_email: this.state.registerParams.email,
        user_info: this.state.registerParams.info,
        user_intro: this.state.registerParams.intro,
        user_password: password
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Thank you for registering!")
          this.setState({
            isRegistered: true
          });
        }
        else {
          alert("Error registering. Your email or username has already been registered.")
        }
      })
      .catch(function (error) {
        alert("Error with registration HTTP request");
      });
    }
    else {
      alert("Error: please enter valid inputs. Make sure passwords match.")
    }
    event.preventDefault();
  };
  
  render() { //Render component
    if (this.state.isRegistered) {
      return <Redirect to="/" />;
    }
    return (
      <div><br/>
        <h1 className = "surveyListHeader">Public Health Survey Site</h1>
        <div className="container">
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
                  name="email"
                  onChange={this.handleFormChange}
                  placeholder="Enter Your Email"
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
                <input
                  type="text"
                  name="intro"
                  onChange={this.handleFormChange}
                  placeholder="Introduce Yourself! (Optional)"
                />
                <input
                  type="text"
                  name="info"
                  onChange={this.handleFormChange}
                  placeholder="Any other Information you'd like to share? (Optional)"
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
      </div>
    );
  }
}
export default Register;
