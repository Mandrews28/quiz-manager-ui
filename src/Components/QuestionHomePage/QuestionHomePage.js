import React, { Component } from 'react';
import AnswerHomePage from '../AnswerHomePage/AnswerHomePage';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';

class QuestionHomePage extends Component {
    constructor() {
        super();

        this.state = {
            quiz: null,
            permissions: null,
            questionList: null,
            questions: [],
            selectedQuestion: null
        }
    }

    componentDidMount = () => {
        this.setState({ quiz: this.props.quiz, permissions: this.props.permissions }, () => {
            setTimeout(() => { this.getQuestionList() })
        });
    }

    getQuestionList = () => {
        let quiz = this.state.quiz;
        if (quiz) {
            let order = quiz.order;

            let url = 'http://localhost:8080/quiz/quiz' + order;

            fetch(url).then((res) => {
                if (res.status === 200) {
                    res.json().then(questionList => {
                        this.setState({ questionList });
                        this.createListOfQuestionButtons();
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    createListOfQuestionButtons = () => {
        let questionList = this.state.questionList;
        let questions = this.state.questions;
        if (questionList) {
            questionList.forEach((question, i) => {
                questions.push(this.newQuestionDiv(question, i));
            });
        }
        if (this.state.permissions === 'edit') {
            questions.push(this.addQuestionDiv());
        }
        this.setState({ questions });
    }

    newQuestionDiv = (question, i) => {
        return (
            <div key={i} className="button-entry button-list list-entry">
                <label>{question.order}.</label>
                <button type="button" className="button-list list-entry button-title list-entry-title" onClick={(() => { this.onQuestionClick(question) })}>{question.value}</button>
            </div>
        )
    }

    addQuestionDiv = () => {
        return (
            <div key="add-question" className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title" onClick={this.onAddQuestionClick}>Add Question</button>
            </div>
        )
    }

    onQuestionClick = (selectedQuestion) => {
        if (this.state.permissions === 'edit' || this.state.permissions === 'view') {
            this.setState({ selectedQuestion });
            document.getElementById("Question List").style.display = "none";
            document.getElementById("Answer Home Page").style.display = "";
        }
    }

    onAddQuestionClick = () => {
        let questions = this.state.questions;
        questions.pop(); //Removes Add Question div
        let newQuestionForm = <form key={questions.length} className="button-entry button-list add-button" onSubmit={this.postNewQuestion}>
            <input type="number" className="input-order button-list" min="1" max={questions.length + 1} defaultValue={questions.length + 1} placeholder="Q" />
            <input type="text" className="button-list add-button button-title edit-button-title" placeholder="Add your question here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={this.removeAddQuestionForm} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        questions.push(newQuestionForm);
        this.setState({ questions });
    }

    removeAddQuestionForm = () => {
        let questions = this.state.questions;
        questions.pop(); //Removes Add Question form
        questions.push(this.addQuestionDiv());
        this.setState({ questions });
    }

    postNewQuestion = async (event) => {
        event.preventDefault();
        let questionOrder = event.target[0].value;
        let questionText = event.target[1].value;
        let quiz = this.state.quiz;

        if (questionOrder && questionText) {
            const payload = {
                value: questionText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + questionOrder;

            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                }
            }).catch((e) => {
                console.log(e);
            });
            await response.json().then(questionList => {
                if (response.status === 200) {
                    this.setState({ questionList, questions: [] });
                    this.createListOfQuestionButtons();
                } else {
                    alert(questionList.message);
                }
            });
        } else {
            alert("Please submit question text and a number for question order");
        }
    }

    render() {
        return (
            <div>
                <div id="Question List">
                    {this.state.quiz &&
                        <span>
                            <div className="title">
                                Quiz {this.state.quiz.order}: {this.state.quiz.title}
                            </div>
                            <div>
                                {this.state.questions}
                            </div>
                        </span>
                    }
                </div>
                <div id="Answer Home Page" style={{ display: "none" }}>
                    {this.state.selectedQuestion &&
                        <AnswerHomePage quiz={this.state.quiz} question={this.state.selectedQuestion} permissions={this.state.permissions} />
                    }
                </div>
            </div>
        )
    }
}

export default QuestionHomePage;
