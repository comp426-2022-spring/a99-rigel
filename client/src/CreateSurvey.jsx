import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Question from "./Question"
import axios from 'axios';

class CreateSurvey extends Component {

  constructor(props) { //Constructor, initialize fields
    super(props);
    this.state = {
      size: 1,
      title: "",
      responses: [""], //Will store the list of questions of the new survey, with elemnet 0 = the title
      questions: [<Question question = "Enter Survey Title" index = {0} handleChange = {(new_answer, index) => this.handleAnswerChange(new_answer, index)}/>],
      submitted: false
    }
  }

  handleAnswerChange = (new_answer, index) => { //Handles whenever theres an answer change in a child Question component
    let new_responses = [...this.state.responses];
    new_responses[index] = new_answer;
    this.setState({
      responses: new_responses
    })
    if (index == 0) { //Special case if the first question is changed--this question is the title
      this.setState({
        title: new_answer
      })
    }
  }

  addQuestion = event => {
    let curr_questions = [...this.state.questions] //Must do array copy here damn
    let curr_responses = [...this.state.responses]
    let curr_index = this.state.size
    let question_title = "Enter Question "+curr_index
    curr_questions.push(<Question question = {question_title} index = {curr_index} handleChange = {(new_answer, index) => this.handleAnswerChange(new_answer, index)}/>)
    curr_responses.push("")
    let new_size = curr_index + 1;
    this.setState({
      questions: curr_questions,
      responses: curr_responses,
      size: new_size
    })
    event.preventDefault();
  }

  removeQuestion = event => {
    if (this.state.size > 1) {
      let curr_questions = [...this.state.questions] //Must do array copy here damn
      let curr_responses = [...this.state.responses]
      let curr_size = this.state.size
      curr_questions.pop()
      curr_responses.pop()
      curr_size = curr_size - 1
      this.setState({
        questions: curr_questions,
        responses: curr_responses,
        size: curr_size
      })
    }
    else {
      alert("Error: cannot remove the title question")
    }
    event.preventDefault();
  }

  submit = event => { //Submit the survey, combine the survey data to a single array
    let survey_questions = []
    for (let i = 1; i < this.state.responses.length; i++) {
      survey_questions.push({type: "FreeInput", question: this.state.responses[i]})
    }
    //At this point, this.state.title stores the title of the survey, this.state.responses stores all questions (including title)
    axios.post("http://localhost:5000/add_survey/" + localStorage.getItem("user_id"), {
      survey_name: this.state.title,
      questions: survey_questions
    })
    .then((response) => {
      this.setState({
        submitted: true
      })
    })
    .catch(function (error) {
      console.log(error);
      alert("error");
    });
    event.preventDefault();
  }

  render() { //Render components
    let questions = this.state.questions
    if (this.state.submitted) {
      return <Redirect to="/" />;
    }
    return (
        <div>
          <br/>
          <h1 className = "surveyListHeader"> Create New Survey</h1>
          {questions}
          <button onClick = {this.addQuestion} className = "center">
            Add question
          </button>
          <button onClick = {this.removeQuestion} className = "center">
            Remove question
          </button>
          <button onClick = {this.submit} className = "center">
            Submit
          </button>
        </div>
      )
  }
}
export default CreateSurvey;