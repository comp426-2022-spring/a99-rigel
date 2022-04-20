import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Question from "./Question"

class Profile extends Component {
  constructor(props) { //Constructor, initialize the fields of each question (the question and answer)
    super(props);      //The props contains 3 inputs: question, index, and handleChange
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
    if (oldPass != localStorage.getItem("password")) {
        alert("Error: the inputted current password is incorrect")
    }
    else if (newPass1 != newPass2) {
        alert("Error: new passwords do not match")
    }
    else if (newPass1 === "") {
        alert("Error: new password cannot be empty")
    }
    else {
      //Here we would submit a post request to server with the new password
      this.close()
      alert("Password changed")
    }
  }

  deletingAccount = () => { //Brings you to the deleting account screen
    this.setState({
        deleting_account: true
    })
  }

  deleteAccount = () => { //Actually deletes the account, ultimately redirects you to login page
    //Axios post to delete account
    localStorage.removeItem("token"); //Remove local storage items to log out
    localStorage.removeItem("username");
    localStorage.removeItem("password")
    localStorage.removeItem("taking_survey")
    localStorage.removeItem("curr_survey_id")
    localStorage.removeItem("viewing_survey")
    this.setState({
      account_deleted: true
    })
  }

  render() { //Render component
    if (this.state.account_deleted) {
      return <Redirect to="/" />;
    }
    if (this.state.deleting_account) {
      return (
        <div className="container">
            <h1 class = "surveyListHeader">User: {this.state.username}</h1><br/>
            <p>Profile deletion is not reversible. Are you sure you wish to delete?</p>
            <button className = "center" onClick = {this.deleteAccount}>Yes</button> <br/>
            <button className = "center" onClick = {this.close}>No, take me back</button>
        </div>
      )
    }
    if (this.state.changing_pass) {
        return (
            <div className="container">
                <h1 class = "surveyListHeader">User: {this.state.username}</h1><br/>
                <p>Hint: the default username is user123 and the default password is abcd123</p>
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
        <h1 class = "surveyListHeader">User: {this.state.username}</h1><br/>
        <button className = "center" onClick = {this.changePass}>Change password</button><br/>
        <button className = "center" onClick = {this.deletingAccount}>Delete Profile</button>
      </div>
    );
  }
}
export default Profile;