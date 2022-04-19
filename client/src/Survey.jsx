import React, { Component, Fragment } from "react";
import Question from "./Question"

//Axios call example:
/*
axios.get("http://localhost:5000/app/surveys/")
.then((response) => {
  
})
*/

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
    window.addEventListener('beforeunload', this.remove_tokens());
    const surveyComponents = surveys.map((survey) =>//Surprised this works
        <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
            {survey.name}
        </li>, this
    );
    this.setState({
        surveys: surveys,
        surveyComponents: surveyComponents,
    });
  }

  handleAnswerChange = (new_answer, index) => { //Handles whenever theres an answer change in a child Question component
    let new_answers = {...this.state.survey_answers};
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

  openSurvey = survey_id => {
    //Displays an opened survey
    localStorage.setItem("taking_survey", "T");
    localStorage.setItem("curr_survey_id", survey_id)
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
  }

  submitSurvey = event => { //Submit the survey, combine the survey data to a single array
    localStorage.removeItem("taking_survey")
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