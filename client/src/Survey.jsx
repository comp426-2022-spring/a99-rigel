import React, { Component } from "react";
import axios from 'axios';
import Question from "./Question"

class Survey extends Component {
  constructor(props) { //Constructor, initialize fields
    super(props);
    this.state = {
      surveys: [], //Keeps a list of survey objects. Each survey object should contain two fields: name and id
      surveyComponents: [], //The jsx for the survey list (not questions in an individual survey)
      survey_questions: [], //A list of strings for all the survey questions
      survey_questions_render: [], //The jsx for a a list of questions in a single survey
      survey_answers: [], //A list of strings for the survey answers
    }
    this.remove_tokens = this.remove_tokens.bind(this);
  }

  componentDidMount() {//After mounting, we will make post request for survey data, and add this to the component state
    axios.get("http://localhost:5000/all_surveys")
    .then((response) => {
      const surveys = response.data
      window.addEventListener('beforeunload', this.remove_tokens());
      const surveyComponents = surveys.map((survey) =>//Surprised this works
          <li onClick = {() => this.openSurvey(survey.survey_id)} className = "surveyComponent">
              {survey.survey_name}
          </li>, this
      );
      this.setState({
          surveys: surveys,
          surveyComponents: surveyComponents,
      });
    })
    .catch(function (error) {
      console.log(error);
      alert("Error getting all survey data");
    });    
  }

  handleAnswerChange = (new_answer, index) => { //Handles whenever theres an answer change in a child Question component
    let new_answers = [...this.state.survey_answers];
    new_answers[index] = new_answer;
    this.setState({
      survey_answers: new_answers
    })
  }

  componentWillUnmount() {
    this.remove_tokens()
    window.removeEventListener('beforeunload', this.remove_tokens()); // remove the event handler for normal unmounting
  }

  remove_tokens = () => {
    localStorage.removeItem("taking_survey")
    localStorage.removeItem("curr_survey_id")
  }
  
  close = () => {
    localStorage.removeItem("taking_survey")
    localStorage.removeItem("curr_survey_id")
    window.location.reload(false);
  }

  openSurvey = survey_id => {
    //Displays an opened survey
    //At this point there would be an API call using the survey_id to get the questions from serve
    axios.get("http://localhost:5000/survey/"+survey_id)
    .then((response) => {
      const survey_data = response.data.questions
      localStorage.setItem("taking_survey", "T");
      localStorage.setItem("curr_survey_id", survey_id)
      let question_strings = [];
      let questions = [];
      for (let i = 0; i < survey_data.length; i++) {
        questions.push(<Question question = {survey_data[i].question} index = {i} handleChange = {(new_answer, index) => this.handleAnswerChange(new_answer, index)}/>)
        question_strings.push(survey_data[i].question)
      }
      this.setState({ //Initializing state variables for survey-taking mode
        survey_questions_render: questions,
        survey_questions: question_strings,
        survey_answers: new Array(survey_data.length).fill("")
      })
    })
    .catch(function (error) {
      console.log(error);
      alert("Error opening survey");
    });
  }

  submitSurvey = event => { //Submit the survey, combine the survey data to a single array
    let survey_answers = [];
    for (let i = 0; i < this.state.survey_questions.length; i++) {
      survey_answers.push(this.state.survey_answers[i.toString()])
    }
    let res = [];
    for (let j = 0; j < survey_answers.length; j++) {
      res.push({type: "FreeInput", text: survey_answers[j]})
    }
    axios.post("http://localhost:5000/add_result/" + localStorage.getItem("curr_survey_id"), {
      result: res
    })
    .catch(function (error) {
      console.log(error);
      alert("Error submitting");
    });
    localStorage.removeItem("taking_survey")
    localStorage.removeItem("curr_survey_id")
    window.location.reload(false); //Reload the page so the tokens are cleared and survey list is displayed again

  }

  render() { //Render component
    const surveyList = this.state.surveyComponents;
    const survey_questions_render = this.state.survey_questions_render;
    if (localStorage.getItem("taking_survey") === "T") {
      return (
        <div>
          <br/>
          <p>You are doing survey {localStorage.getItem("curr_survey_id")}</p>
          {survey_questions_render}
          <button onClick = {this.submitSurvey} className = "center">
            Submit
          </button><br/>
          <button onClick = {this.close} className = "center">
            Close
          </button><br/>
        </div>
      )
    }
    return (
        <div>
            <br/>
            <h1 className = "surveyListHeader">Surveys to Take</h1>
            <ul className = "surveyList">
                {surveyList}
            </ul>
            <br/>
        </div>
    )
  }
}
export default Survey;