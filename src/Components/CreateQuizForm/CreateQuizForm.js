// import React, { Component } from 'react';
// import './CreateQuizForm.css';

// class CreateQuizForm extends Component {
//     constructor() {
//         super();

//         this.state = {
//             questions: [],
//             addQuestionDiv: <div />,
//             addAnswerDiv: <div />
//         }

//     }

//     componentDidMount = () => {
//         this.setState({ addQuestionDiv: this.initialAddQuestionDiv });
//         // let questions = this.state.questions;
//         // questions.push(this.initialAddQuestionDiv())
//         // this.setState({ questions });
//     }

//     initialAddQuestionDiv = () => {
//         return (
//             <div key="add-question" className="button-entry button-list add-button">
//                 <label>+</label>
//                 <button type="button" className="button-list add-button button-title" onClick={this.onAddQuestionClick}>Add Question</button>
//             </div>
//         )
//     }

//     initialAddAnswerDiv = () => {
//         return (
//             <div key="add-answer" className="button-entry button-list add-button">
//                 <label>+</label>
//                 <button type="button" className="button-list add-button button-title" onClick={(() => { this.onAddAnswerClick() })}>Add Answer</button>
//             </div>
//         )
//     }

//     onAddQuestionClick = () => {
//         let questions = this.state.questions;
//         // questions.pop(); //Remove Add Question div
//         let newQuestionDiv = this.newQuestionDiv(questions.length + 1);


//         // questions.push(this.initialAddQuestionDiv());
//         this.setState({ questions });
//     }

//     newQuestionDiv = (order) => {
//         return (
//             <div className="create-question">
//                 <div className="button-entry button-list list-entry">
//                     <label>{order + 1}.</label>
//                     <input type="text" className="button-list list-entry button-title edit-button-title" placeholder="Add your question here" />
//                     <span className="span-filler" />
//                 </div>
//                 <div>
//                     {}
//                 </div>
//             </div>
//         )
//     }

//     onAddAnswerClick = () => {

//     }


//     //on submit, call this.props.onFormClosed

//     postCreateQuizForm = (event) => {


//         this.props.onFormClosed();
//     }

//     render() {
//         return (
//             <div >
//                 <div className="title">
//                     Create Quiz
//                 </div>
//                 <form className="CreateQuizForm" onSubmit={this.postCreateQuizForm}>
//                     <div className="title-input-field">
//                         <label>Title: </label>
//                         <input type="text" />
//                     </div>
//                     <br />
//                     <div>
//                         {this.state.questions}
//                     </div>
//                     <div>
//                         {this.addQuestionDiv}
//                     </div>
//                     <br />
//                     <input type="submit" value="Sign In" className="create-quiz-submit" />
//                 </form>
//                 <p>There must be between 3 and 5 answers for every question</p>
//             </div>
//         )
//     }
// }

// export default CreateQuizForm;
