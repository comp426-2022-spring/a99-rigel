import React, { Component, Fragment } from "react";
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
  }

  componentDidMount() {//After mounting, we will make post request for survey data, and add this to the component state
    /*
    axios.get("http://localhost:5000/app/surveys/")
    .then((response) => {
      const surveys = response.data //Creating a list of jsx HTML components with the survey list data. Surveys should consist of a list of objects, each with 2 fields: name and id
      const surveyComponents = surveys.map((survey) =>//Surprised this works
          <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
              {survey.name}
          </li>, this
      );
      this.setState({
          surveys: surveys,
          surveyComponents: surveyComponents,
      });
      if (localStorage.getItem("curr_survey_id") != null) {
        this.openSurvey(localStorage.getItem("curr_survey_id")); //This only executes if we refresh the tab while still answering a survey.
      }
    })
    */
   //Displays the survey list
    const surveys = [{name: "How are you feeling?", id: 1}, //Testing w/out backend interaction 
                   {name: "How is your day?", id: 2},
                   {name: "Whats up bro?", id: 3},
                   {name: "Have a nice day!", id: 4},
                   {name: "Tell me how many cars have you stolen?", id: 5},
                   {name: "Tell me how many cars have you stolen?", id: 6},
                   {name: "Tell me how many cars have you stolen?", id: 7},
                   {name: "Tell me how many cars have you stolen?", id: 8}
                  ]
    const surveyComponents = surveys.map((survey) =>//Surprised this works
        <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
            {survey.name}
        </li>, this
    );
    this.setState({
        surveys: surveys,
        surveyComponents: surveyComponents,
    });
    if (localStorage.getItem("curr_survey_id") != null) {
      this.openSurvey(localStorage.getItem("curr_survey_id")); //This only executes if we refresh the tab while still answering a survey.
    }
  }

  handleAnswerChange = (new_answer, index) => { //Handles whenever theres an answer change in a child Question component
    let new_answers = {...this.state.survey_answers};
    new_answers[index] = new_answer;
    this.setState({
      survey_answers: new_answers
    })
  }

  openSurvey = survey_id => {
    //Displays an opened survey
    localStorage.setItem("taking_survey", "T");
    /*
    axios.get("http://localhost:5000/app/getsurvey/"+survey_id)
    .then((response) => {
      let question_strings = [];
      for (let i = 0; i < survey_data.length; i++) {
        question_strings.push(survey_data[i].question)
      }
      let questions = [];
      for (let i = 0; i < survey_data.length; i++) {
        questions.push(<Question question = {survey_data[i].question} index = {i} handleChange = {(new_answer, index) => this.handleAnswerChange(new_answer, index)}/>)
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
      this.setState({ //Initializing state variables for survey-taking mode
        survey_questions_render: final_survey_questions,
        survey_questions: question_strings,
        survey_answers: new Array(survey_data.length).fill("")
      })
      localStorage.setItem("curr_survey_id", survey_id) //Means that if you refresh the page, you stay on that survey (though your input data is lost)
    }) */

    const survey_data = [
      {question: "q1 answer here?", type: "free-response"},
      {question: "q2 answer here?", type: "free-response"},
      {question: "q3 answer here?", type: "free-response"},
      {question: "Please rate?", type: "free-response"},
      {question: "Any thing else?", type: "free-response"},
      {question: "Final question!", type: "free-response"},
    ]
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
    localStorage.setItem("curr_survey_id", survey_id) //Means that if you refresh the page, you stay on that survey (though your input data is lost)
  }

  submitSurvey = event => { //Submit the survey, combine the survey data to a single array
    localStorage.setItem("taking_survey", "F")
    localStorage.removeItem("curr_survey_id")
    let survey_answers = [];
    for (let i = 0; i < this.state.survey_questions.length; i++) {
      survey_answers.push(this.state.survey_answers[i.toString()])
    }
    let res = [];
    for (let k = 0; k < survey_answers.length; k++) {
      res.push({question: this.state.survey_questions[k], answer: survey_answers[k]})
    }
    alert(JSON.stringify(res));//Res is an array of objects, each object has two fields: question and the corresponding answer
    //Each question and its corresponding answer in the survey is accounted for
    //Fill in an appropriate axios post request here
  }

  render() { //Render component
    const surveyList = this.state.surveyComponents;
    const survey_questions_render = this.state.survey_questions_render;
    const { match } = this.props;
    if (localStorage.getItem("taking_survey") === "T") {
      return (
        <div>
          <br/>
          <p>You are doing survey {localStorage.getItem("curr_survey_id")}</p>
          {survey_questions_render}
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