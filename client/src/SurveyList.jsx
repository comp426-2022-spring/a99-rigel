import React, { Component, Fragment } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios"

class SurveyList extends Component {

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
      const surveys = response.data //Creating a list of jsx HTML components with the survey list data
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
                   {name: "Tell me how many cars have you stolen?", id: 5}
                  ]
    const surveyComponents = surveys.map((survey) =>
        <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
            {survey.name}
        </li>, this
    );
    this.setState({
        surveys: surveys,
        surveyComponents: surveyComponents
    });
  }

  openSurvey = event => {
    alert(event)
  }

  render() {
    let surveyList = this.state.surveyComponents;
    const { match } = this.props;
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
export default SurveyList;