import React, { Component, Fragment } from "react";
import QandABox from "./QandABox"
import axios from 'axios';

class MySurvey extends Component {

  constructor(props) { //Constructor, initialize fields
    super(props);
    this.state = {
      surveys: [], //Keeps a list of survey objects. Each survey object should contain two fields: name and id
      surveyComponents: [], //The jsx for the survey list (not questions in an individual survey)
      survey_data: [], //The jsx for a a list of questions in a single survey
      curr_survey_title: ""
    }
    this.remove_tokens = this.remove_tokens.bind(this);
  }

  remove_tokens = () => {
    localStorage.removeItem("viewing_survey")
  }

  componentDidMount() {//After mounting, we will make get request for survey data, and add this to the component state
    axios.get("http://localhost:5000/surveys/"+localStorage.getItem("user_id"))
    .then((response) => {
      const surveys = response.data
      const surveyComponents = surveys.map((survey) =>//Surprised this works
          <li onClick = {() => this.openSurvey(survey.survey_id)} className = "surveyComponent">
              {survey.survey_name}
          </li>, this
      );
      this.setState({
          surveys: surveys,
          surveyComponents: surveyComponents,
      });
      window.addEventListener('beforeunload', this.remove_tokens());
    })
  }

  componentWillUnmount() {
    this.remove_tokens()
    window.removeEventListener('beforeunload', this.remove_tokens()); // remove the event handler for normal unmounting
  }

  openSurvey = survey_id => {
    //At this point there would be an api call using survey_id to get the questions/responses for this survey
    localStorage.setItem("viewing_survey", "T")
    let survey_data = {
      survey_id: -1,
      survey_name: "",
      q_and_a: []
    }
    axios.get("http://localhost:5000/survey/"+survey_id)
    .then((response) => {
      survey_data.survey_id = response.data.survey_id;
      survey_data.survey_name = response.data.survey_name;
      for (let i = 0; i < response.data.questions.length; i++) {
        survey_data.q_and_a.push({question: response.data.questions[i].question, responses: []})
      }
      axios.get("http://localhost:5000/result/"+survey_id)
      .then((response) => {
          for (let k = 0; k < response.data.length; k++) {
            for (let j = 0; j < response.data[k].result.length; j++) {
              survey_data.q_and_a[j].responses.push(response.data[k].result[j].text);
            }
          }
          let responses = []
          for (let i = 0; i < survey_data.q_and_a.length; i++) {
            responses.push(<QandABox question = {survey_data.q_and_a[i].question} answers = {survey_data.q_and_a[i].responses}/>)
          }
          this.setState({ //Initializing state variables for survey-taking mode
            survey_data: responses,
            curr_survey_title: survey_data.survey_name
          })
      })
    })
  }

  closeSurvey = event => {
    localStorage.removeItem("viewing_survey")
    this.setState({
        survey_data: [],
        curr_survey_title: ""
    })
  }

  render() { //Render component
    const surveyList = this.state.surveyComponents;
    if (localStorage.getItem("viewing_survey") === "T") {
      return (
        <div>
          <br/>
          <p>Responses for: {this.state.curr_survey_title}</p>
          {this.state.survey_data}
          <button onClick = {this.closeSurvey} className = "center">
            Close
          </button><br/>
        </div>
      )
    }
    return (
        <div>
            <br/>
            <h1 className = "surveyListHeader">My Surveys</h1>
            <ul className = "surveyList">
                {surveyList}
            </ul>
            <br/>
        </div>
    )
  }
}
export default MySurvey;