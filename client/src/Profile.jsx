import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Question from "./Question"

class Profile extends Component {
  constructor(props) { //Constructor
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      change_pass_responses: ["","",""],
      changing_pass: false,
      deleting_account: false,
      account_deleted: false
    };
  }

  handleChange = (new_answer, index) => { //Handles change to the password change text boxes
    let curr_pass_responses = [...this.state.change_pass_responses];
    curr_pass_responses[index] = new_answer
    this.setState({
        change_pass_responses: curr_pass_responses
    })
  }

  close = () => { //General purpose close button from the deleting account and change password screens
    this.setState({
        changing_pass: false,
        deleting_account: false
    })
  }

  changePass = () => { //Brings you to the change password screen
    this.setState({
        changing_pass: true
    })
  }

  submitNewPass = () => { //Submits changed password and checks for invalid response,
    const oldPass = this.state.change_pass_responses[0]
    const newPass1 = this.state.change_pass_responses[1]
    const newPass2 = this.state.change_pass_responses[2]
    if (oldPass !== localStorage.getItem("password")) {
        alert("Error: the inputted current password is incorrect")
    }
    else if (newPass1 !== newPass2) {
        alert("Error: new passwords do not match")
    }
    else if (newPass1 === "") {
        alert("Error: new password cannot be empty")
    }
    else if (oldPass === newPass1) {
        alert("Error: new password cannot be same as old password")
    }
    else {
      axios.post("http://localhost:5000/user/chpwd/"+localStorage.getItem("user_id"), {
        old_pwd: oldPass,
        new_pwd: newPass1
      })
      .then((response) => {
        if (response.data.status === "success") {
          this.close()
          alert("Password changed")
        }
        else {
          alert("Error:" + response.data.message)
        }
      })
      .catch(function (error) {
        alert("Error with HTTP request");
      });
    }
  }

  deletingAccount = () => { //Brings you to the deleting account screen
    this.setState({
        deleting_account: true
    })
  }

  deleteAccount = () => { //Actually deletes the account, ultimately redirects you to login page
    axios.delete("http://localhost:5000/user/delete/"+localStorage.getItem("user_id"))
    .then((response) => {
      if (response.data.status === "success") {
        alert("Account deleted!")
        localStorage.removeItem("token"); //Remove local storage items to log out
        localStorage.removeItem("username");
        localStorage.removeItem("password")
        localStorage.removeItem("taking_survey")
        localStorage.removeItem("curr_survey_id")
        localStorage.removeItem("viewing_survey")
        localStorage.removeItem("user_id")
        this.setState({
          account_deleted: true
        })
      }
      else {
        alert("Error with delete request")
      }
    })
    .catch(function (error) {
      alert("Error with HTTP request");
    });
  }

  render() { //Render component
    if (this.state.account_deleted) {
      return <Redirect to="/" />;
    }
    if (this.state.deleting_account) {
      return (
        <div className="container">
            <h1 className = "surveyListHeader">User: {this.state.username}</h1><br/>
            <p>Profile deletion is not reversible. Are you sure you wish to delete your profile?</p>
            <button className = "center" onClick = {this.deleteAccount}>Yes</button> <br/>
            <button className = "center" onClick = {this.close}>No, take me back</button>
        </div>
      )
    }
    if (this.state.changing_pass) {
        return (
            <div className="container">
                <h1 className = "surveyListHeader">User: {this.state.username}</h1><br/>
                <p>Change password</p>
                <Question question = "Enter old password" index = {0} handleChange = {(new_answer, index) => this.handleChange(new_answer, index)} />
                <Question question = "Enter new password" index = {1} handleChange = {(new_answer, index) => this.handleChange(new_answer, index)} />
                <Question question = "Enter new password again" index = {2} handleChange = {(new_answer, index) => this.handleChange(new_answer, index)} />
                <button className = "center" onClick = {this.submitNewPass}>Submit</button> <br/>
                <button className = "center" onClick = {this.close}>Close</button>
            </div>
        )
    }
    return (
      <div className="container">
        <h1 className = "surveyListHeader">User: {this.state.username}</h1><br/>
        <button className = "center" onClick = {this.changePass}>Change password</button><br/>
        <button className = "center" onClick = {this.deletingAccount}>Delete Profile</button>
      </div>
    );
  }
}
export default Profile;