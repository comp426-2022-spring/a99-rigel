import React, { Component, Fragment } from "react";
import Question from "./Question"

class Survey extends Component {

  constructor(props) { //Constructor, initialize fields
    super(props);
    this.state = {
      surveys: [], //Keeps a list of survey objects. Each survey object should contain two fields: name and id
      surveyComponents: [] //Actual jsx to be rendered
    }
  }

  componentDidMount() {//After mounting, we will make post request for survey data, and add this to the component state
    /*
    axios.get("http://localhost:5000/app/surveys/")
    .then((response) => {
      const surveys = response.data //Creating a list of jsx HTML components with the survey list data. Surveys should consist of a list of objects, each with 2 fields: name and id
      const surveyComponents = surveys.map((survey) =>
          <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
              {survey.name}
          </li>, this
      );
      this.setState({
          surveys: surveys,
          surveyComponents: surveyComponents
      });
    })
    */
    const surveys = [{name: "How are you feeling?", id: 1}, //Testing w/out backend interaction 
                   {name: "How is your day?", id: 2},
                   {name: "Whats up bro?", id: 3},
                   {name: "Have a nice day!", id: 4},
                   {name: "Tell me how many cars have you stolen?", id: 5},
                   {name: "Tell me how many cars have you stolen?", id: 6},
                   {name: "Tell me how many cars have you stolen?", id: 7},
                   {name: "Tell me how many cars have you stolen?", id: 8}
                  ]
    const surveyComponents = surveys.map((survey) =>
        <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
            {survey.name}
        </li>, this
    );
    this.setState({
        surveys: surveys,
        surveyComponents: surveyComponents,
    });
    if (localStorage.getItem("curr_survey_id") != null) {
      this.openSurvey(localStorage.getItem("curr_survey_id"));
    }
  }

  openSurvey = survey_id => {
    localStorage.setItem("taking_survey", "T");
    /*
    axios.get("http://localhost:5000/app/getsurvey/"+survey_id)
    .then((response) => {
      const survey_data = response.data; //survey_data should consist of a list of objects, each wiht 2 fields: question and type
      //Use for loop to build a list of <Question /> components which will then be added to the state
      //The list of <Questoin /> components will be rendered as we have changed the taking_survey token
      //When we submit the survey, we will go to the list of <Questoin /> components in state.
      //Then, we go to the state of each <Question /> component and get the value of the responses to each question.
      //We also go to the state of the <Question /> component and get the text of the question itself
      //Then we take this, put it into a json, and post it to the server
      //Pass props into Question like <Question question = "" />
      let questions = [];
      for (let i = 0; i < survey_data.length; i++) {
        questions.push(<Question question = {survey_data[i].question}/>)
      }
      let breaklist = [];
      for (let k = 0; k < survey_data.length; k++) {
        breaklist.push(<br/>)
      }
      let final_survey_questions = []; //List of <Question /> components interspersed with <br/>
      for (let j = 0; j < survey_data.length; j++) {
        final_survey_questions.push(questions[j]);
        final_survey_questions.push(breaklist[j]);
      }
      this.setState({
        survey_questions: final_survey_questions,
      })
      localStorage.setItem("curr_survey_id", survey_id)
    }) */

    const survey_data = [
      {question: "q1 answer here?", type: "free-response"},
      {question: "q2 answer here?", type: "free-response"},
      {question: "q3 answer here?", type: "free-response"},
      {question: "Please rate?", type: "free-response"},
      {question: "Any thing else?", type: "free-response"},
      {question: "Final question!", type: "free-response"},
    ]
    let questions = [];
    for (let i = 0; i < survey_data.length; i++) {
      questions.push(<Question question = {survey_data[i].question}/>)
    }
    let breaklist = [];
    for (let k = 0; k < survey_data.length; k++) {
      breaklist.push(<br/>)
    }
    let final_survey_questions = []; //List of <Question /> components interspersed with <br/>
    for (let j = 0; j < survey_data.length; j++) {
      final_survey_questions.push(questions[j]);
      final_survey_questions.push(breaklist[j]);
    }
    this.setState({
      survey_questions: final_survey_questions,
    })
    localStorage.setItem("curr_survey_id", survey_id) //Means that if you refresh the page, you stay on that survey (though your input data is lost)
  }

  submitSurvey = event => {
    localStorage.setItem("taking_survey", "F")
    localStorage.removeItem("curr_survey_id")
  }

  render() {
    const surveyList = this.state.surveyComponents;
    const survey_questions = this.state.survey_questions;
    const { match } = this.props;
    if (localStorage.getItem("taking_survey") === "T") {
      return (
        <div>
          <p>hello</p>
          {survey_questions}
          <a href = "" onClick = {this.submitSurvey}>Submit</a>
        </div>
      )
    }
    return (
        <div>
            <br/>
            <h1 class = "surveyListHeader">Surveys to Take</h1>
            <ul class = "surveyList">
                {surveyList}
            </ul>
        </div>
    )
  }
}
export default Survey;