import React, { Component } from "react";

class Question extends Component {
  constructor(props) { //Constructor, initialize the fields of each question (the question and answer)
    super(props);      //user_id, and user_password
    this.state = {
      question: this.props.question,
      answer: ""
    };
  }
  handleFormChange = event => { //Updates state after each user interaction
    let newAnswer = { ...this.state.answer };
    let val = event.target.value;
    newAnswer = val;
    this.setState({
      answer: newAnswer
    });
  };

  render() { //Render component
    return (
      <div className="container">
        <form onSubmit={this.login} className="form-signin">
          <div className="row">
            <div className="col">
              <b>{this.state.question}</b>
              <input
                type="text"
                onChange={this.handleFormChange}
                placeholder="Enter Text"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Question;