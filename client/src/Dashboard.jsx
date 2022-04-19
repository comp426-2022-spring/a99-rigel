import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Dashboard.css";
import Profile from "./Profile";
import Matches from "./Matches"
import Survey from "./Survey";
import NotFound from "./Notfound";

class Dashboard extends Component {
  constructor(props) { //Constructor, initialize fields (only one that checks if user logged in)
    super(props);
    this.state = {
      islogout: false
    };
  }

  signOut = () => { //Signing out of account
    localStorage.removeItem("token"); //Remove necessary items from local storage in browser
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("taking_survey")
    this.setState({
      islogout: true //Means that upon rendering, we will be redirected to login page.
    });
  };

  render() { //Render component
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;

    return (
      <div>
        <ul>
          <li>
            <Link to={`${match.path}`}>Surveys To Take</Link>
          </li>
          <li>
            <Link to={`${match.path}/mysurveys`}>My Surveys</Link>
          </li>
          <li>
            <Link to={`${match.path}/create`}>Create Survey</Link>
          </li>
          <li className="push-right">
            <button onClick={this.signOut} href="#">
              Sign Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/mysurveys`}>
                <Matches />
              </Route>
              <Route path={`${match.path}/create`}>
                <Matches />
              </Route>
              <Route exact path={`${match.path}`}>
                <Survey />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Dashboard);
