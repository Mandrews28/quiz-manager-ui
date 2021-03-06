import React, { Component } from 'react';
import AnswerHomePage from '../AnswerHomePage/AnswerHomePage';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';
import editIcon from '../../images/editIcon.png';
import deleteIcon from '../../images/deleteIcon.png';
import AddQuestionButton from '../Buttons/AddQuestionButton';

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
            questions.push(<AddQuestionButton key="add-question" onQuestionSubmit={this.postNewQuestion} questions={this.state.questions}/>);
        }
        this.setState({ questions });
    }

    newQuestionDiv = (question, i) => {
        return (
            <div key={i} className="button-entry button-list list-entry">
                <label>{question.order}.</label>
                <button type="button" className="button-list list-entry button-title list-entry-title" onClick={(() => { this.onQuestionClick(question) })}>{question.value}</button>
                {this.state.permissions === 'edit' &&
                    <span>
                        <input type="image" src={deleteIcon} className="delete edit-button" alt="delete" onClick={(() => { this.onDeleteClick(question) })} />
                        <input type="image" src={editIcon} className="edit edit-button" alt="edit" onClick={(() => { this.onEditTextClick(question, i) })} />
                    </span>
                }
                {this.state.permissions !== 'edit' &&
                    <span className="span-filler" />
                }
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

    onDeleteClick = (question) => {
        let result = window.confirm("Are you sure you want to delete question " + question.order + ": " + question.value);
        if (result) {
            this.sendDeleteRequest(question);
        }
    }

    sendDeleteRequest = async (question) => {
        let quiz = this.state.quiz;

        let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + question.order;

        const response = await fetch(url, {
            method: 'DELETE'
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
    }

    onEditTextClick = (question, index) => {
        let questions = this.state.questions;
        let oldQuestionDiv = questions[index];

        let editForm = <form key={index} className="button-entry button-list list-entry" onSubmit={((event) => { this.postEditedText(event, question) })}>
            <label>{question.order}.</label>
            <input type="text" className="button-list list-entry button-title edit-button-title" defaultValue={question.value} placeholder="Add your question here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={(() => { this.removeEditForm(oldQuestionDiv, index) })} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        questions[index] = editForm;
        this.setState({ questions });
    }

    removeEditForm = (oldQuestionDiv, index) => {
        let questions = this.state.questions;
        questions[index] = oldQuestionDiv;
        this.setState({ questions });
    }

    postEditedText = async (event, question) => {
        event.preventDefault();
        let quiz = this.state.quiz;
        let questionText = event.target[0].value;

        if (questionText) {
            const payload = {
                value: questionText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + question.order;

            const response = await fetch(url, {
                method: 'PATCH',
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
            alert("Please submit a question");
        }
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
