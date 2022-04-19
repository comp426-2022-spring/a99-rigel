import React, { Component, Fragment } from "react";
import QandABox from "./QandABox"

class MySurvey extends Component {

  constructor(props) { //Constructor, initialize fields
    localStorage.removeItem("curr_survey_id")
    localStorage.setItem("taking_survey", "F")
    super(props);
    this.state = {
      surveys: [], //Keeps a list of survey objects. Each survey object should contain two fields: name and id
      surveyComponents: [], //The jsx for the survey list (not questions in an individual survey)
      survey_data: [], //The jsx for a a list of questions in a single survey
      curr_survey_title: ""
    }
  }

  componentDidMount() {//After mounting, we will make post request for survey data, and add this to the component state
    const surveys = [{name: "Public health survey", id: 1}, //Testing w/out backend interaction 
                    {name: "Weekend survey", id: 2},
                    {name: "Music survey", id: 3}]
    const surveyComponents = surveys.map((survey) =>//Surprised this works
        <li onClick = {() => this.openSurvey(survey.id)} class = "surveyComponent">
            {survey.name}
        </li>, this
    );
    this.setState({
        surveys: surveys,
        surveyComponents: surveyComponents,
    });
    if (localStorage.getItem("view_survey_id") != null) {
      this.openSurvey(localStorage.getItem("view_survey_id")); //This only executes if we refresh the tab while still answering a survey.
    }
  }

  openSurvey = survey_id => {
    //Displays an opened survey and its results
    localStorage.setItem("viewing_survey", "T");
    const survey_data = {
        survey_id: 123,
        survey_name: "Health survey",
        q_and_a: [{question: "Are you overweight?", responses: ["no", "yes", "no", "yes"]},
                  {question: "Are you diabetic?", responses: ["no", "yes", "no", "yes"]},
                  {question: "What is your age", responses: ["25", "24", "40", "18"]},
                  {question: "How often do you run", responses: ["12 times a day", "Every day", "Never", "Rarely"]}
                 ]
    }
    let responses = []
    for (let i = 0; i < survey_data.q_and_a.length; i++) {
      responses.push(<QandABox question = {survey_data.q_and_a[i].question} answers = {survey_data.q_and_a[i].responses}/>)
    }
    this.setState({ //Initializing state variables for survey-taking mode
      survey_data: responses,
      curr_survey_title: survey_data.survey_name
    })
    localStorage.setItem("view_survey_id", survey_id) //Means that if you refresh the page, you stay on that survey (though your input data is lost)
  }

  closeSurvey = event => { //Submit the survey, combine the survey data to a single array
    localStorage.setItem("viewing_survey", "F")
    localStorage.removeItem("view_survey_id")
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
          <a href = "" onClick = {this.closeSurvey}>Close</a>
        </div>
      )
    }
    return (
        <div>
            <br/>
            <h1 class = "surveyListHeader">My Surveys</h1>
            <ul class = "surveyList">
                {surveyList}
            </ul>
        </div>
    )
  }
}
export default MySurvey;