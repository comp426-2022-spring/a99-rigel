import React, { Component } from "react";

class QandABox extends Component {
  constructor(props) { //Constructor
    super(props);   
    this.state = {
      question: this.props.question,
      answers: this.props.answers
    };
  }

  render() { //Render component
    return (
      <div>
        <div className="container">
          <h3>{this.state.question}</h3>
          <p>{JSON.stringify(this.state.answers)}</p>
        </div>
        <br/>
      </div>
    );
  }
}
export default QandABox;