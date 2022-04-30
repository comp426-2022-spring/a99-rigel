import React, { Component } from "react";
import Question from "./Question";
import axios from 'axios';

class Logs extends Component {
  constructor(props) { //Constructor, initialize the fields of each question (the question and answer)
    super(props);      //The props contains 3 inputs: question, index, and handleChange
    this.state = {
      admin_privilege: false,
      admin_password: "",
      logs: []
    };
  }

  handleAnswerChange = (new_answer, index) => {
    this.setState({
        admin_password: new_answer
    })
  }
  login = () => {
    if (this.state.admin_password === "admin") {
        axios.get("http://localhost:5000/log/")
        .then((response) => {
            let log_data = []
            const logs = response.data
            logs.forEach(element => {
                log_data.push(<p className = "log">{JSON.stringify(element)}</p>)
            })
            this.setState({
                admin_privilege: true,
                logs: log_data,
            });
        })
    }
    else {
        alert("Error: incorrect admin password")
    }
  }

  render() { //Render component
    if (this.state.admin_privilege) {
      return (
          <div>
              <h1 className = "surveyListHeader">View Logs</h1>
              {this.state.logs}
          </div>
      );
    }
    return (
        <div className = "center">
            <h1 className = "surveyListHeader">View Logs</h1>
            <p >Hint: admin password is "admin"</p>
            <Question question = "Enter admin password to view logs" index = {0} handleChange = {(new_answer, index) => this.handleAnswerChange(new_answer, index)}/>
            <button onClick = {this.login} className = "center">
                Submit
            </button>
        </div>
    )
  }
}
export default Logs;