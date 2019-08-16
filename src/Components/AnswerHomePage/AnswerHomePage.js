import React, { Component } from 'react';
import './AnswerHomePage.css';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';
import editIcon from '../../images/editIcon.png';
import deleteIcon from '../../images/deleteIcon.png';
import AddAnswerButton from '../Buttons/AddAnswerButton';

class AnswerHomePage extends Component {
    constructor() {
        super();

        this.state = {
            quiz: null,
            question: null,
            permissions: null,
            answerList: null,
            answers: []
        }
    }

    componentDidMount = () => {
        this.setState({ quiz: this.props.quiz, question: this.props.question, permissions: this.props.permissions }, () => {
            setTimeout(() => { this.getAnswerList() })
        });
    }

    getAnswerList = () => {
        let quiz = this.state.quiz;
        let question = this.state.question;
        if (quiz && question) {
            let quizOrder = quiz.order;
            let answerOrder = question.order;

            let url = 'http://localhost:8080/quiz/quiz' + quizOrder + '/question' + answerOrder;

            fetch(url).then((res) => {
                if (res.status === 200) {
                    res.json().then(answerList => {
                        this.setState({ answerList });
                        this.createListOfAnswerButtons();
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    createListOfAnswerButtons = () => {
        let answerList = this.state.answerList;
        let answers = this.state.answers;
        if (answerList) {
            answerList.forEach((answer, i) => {
                answers.push(this.newAnswerDiv(answer, i));
            });
        }
        if (this.state.permissions === 'edit') {
            answers.push(<AddAnswerButton key="add-question" onAnswerSubmit={this.postNewAnswer} answers={this.state.answers}/>);
        }
        this.setState({ answers });
    }

    newAnswerDiv = (answer, i) => {
        return (
            <div key={i} className="button-entry button-list list-entry">
                <label>{answer.order}.</label>
                <button type="button" className="button-list list-entry button-title list-entry-title">{answer.value}</button>
                {this.state.permissions === 'edit' &&
                    <span>
                        <input type="image" src={deleteIcon} className="delete edit-button" alt="delete" onClick={(() => { this.onDeleteClick(answer) })} />
                        <input type="image" src={editIcon} className="edit edit-button" alt="edit" onClick={(() => { this.onEditTextClick(answer, i) })} />
                    </span>
                }
                {this.state.permissions !== 'edit' &&
                    <span className="span-filler" />
                }
            </div>
        )
    }

    onDeleteClick = (answer) => {
        let result = window.confirm("Are you sure you want to delete answer " + answer.order + ": " + answer.value);
        if (result) {
            this.sendDeleteRequest(answer);
        }
    }

    sendDeleteRequest = async (answer) => {
        let quiz = this.state.quiz;
        let question = this.state.question;

        let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + question.order + '/answer' + answer.order;

        const response = await fetch(url, {
            method: 'DELETE'
        }).catch((e) => {
            console.log(e);
        });
        await response.json().then(answerList => {
            if (response.status === 200) {
                this.setState({ answerList, answers: [] });
                this.createListOfAnswerButtons();
            } else {
                alert(answerList.message);
            }
        });
    }

    onEditTextClick = (answer, index) => {
        let answers = this.state.answers;
        let oldAnswerDiv = answers[index];

        let editForm = <form key={index} className="button-entry button-list list-entry" onSubmit={((event) => { this.postEditedText(event, answer) })}>
            <label>{answer.order}.</label>
            <input type="text" className="button-list list-entry button-title edit-button-title" defaultValue={answer.value} placeholder="Add your answer here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={(() => { this.removeEditForm(oldAnswerDiv, index) })} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        answers[index] = editForm;
        this.setState({ answers });
    }

    removeEditForm = (oldAnswerDiv, index) => {
        let answers = this.state.answers;
        answers[index] = oldAnswerDiv;
        this.setState({ answers });
    }

    postEditedText = async (event, answer) => {
        event.preventDefault();
        let quiz = this.state.quiz;
        let question = this.state.question;
        let answerText = event.target[0].value;

        if (answerText) {
            const payload = {
                value: answerText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + question.order + '/answer' + answer.order;

            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                }
            }).catch((e) => {
                console.log(e);
            });
            await response.json().then(answerList => {
                if (response.status === 200) {
                    this.setState({ answerList, answers: [] });
                    this.createListOfAnswerButtons();
                } else {
                    alert(answerList.message);
                }
            });
        } else {
            alert("Please submit an answer");
        }
    }

    postNewAnswer = async (event) => {
        event.preventDefault();
        let answerOrder = event.target[0].value;
        let answerText = event.target[1].value;
        let quiz = this.state.quiz;
        let question = this.state.question;

        if (answerOrder && answerText) {
            const payload = {
                value: answerText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quiz.order + '/question' + question.order + '/answer' + answerOrder;

            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                }
            }).catch((e) => {
                console.log(e);
            });
            await response.json().then(answerList => {
                if (response.status === 200) {
                    this.setState({ answerList, answers: [] });
                    this.createListOfAnswerButtons();
                } else {
                    alert(answerList.message);
                }
            });
        } else {
            alert("Please submit answer text and a number for answer order");
        }
    }

    render() {
        return (
            <div>
                {this.state.quiz && this.state.question &&
                    <span>
                        <div className="title">
                            Quiz {this.state.quiz.order}: {this.state.quiz.title}
                        </div>
                        <div className="subtitle">
                            Question {this.state.question.order}: {this.state.question.value}
                        </div>
                        <div>
                            {this.state.answers}
                        </div>
                        <div>
                            {this.state.permissions === 'edit' &&
                                <p>There must be between 3 and 5 answers for every question</p>
                            }
                        </div>
                    </span>
                }
            </div>
        )
    }
}

export default AnswerHomePage;
