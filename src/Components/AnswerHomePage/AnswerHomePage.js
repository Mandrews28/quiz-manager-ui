import React, { Component } from 'react';
import './AnswerHomePage.css';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';

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
            answers.push(this.addAnswerDiv());
        }
        console.log(this.state);
        this.setState({ answers });
    }

    newAnswerDiv = (answer, i) => {
        return (
            <div key={i} className="button-entry button-list list-entry">
                <label>{answer.order}.</label>
                <button type="button" className="button-list list-entry button-title">{answer.value}</button>
            </div>
        )
    }

    addAnswerDiv = () => {
        return (
            <div key="add-answer" className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title" onClick={this.onAddAnswerClick}>Add Answer</button>
            </div>
        )
    }

    onAddAnswerClick = () => {
        let answers = this.state.answers;
        answers.pop(); //Removes Add Answer div
        let newAnswerForm = <form key={answers.length} className="button-entry button-list add-button" onSubmit={this.postNewAnswer}>
            <input type="number" className="input-order button-list" min="1" max={answers.length + 1} defaultValue={answers.length + 1} placeholder="A" />
            <input type="text" className="button-list add-button button-title edit-button-title" placeholder="Add your answer here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={this.removeAddAnswerForm} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        answers.push(newAnswerForm);
        this.setState({ answers });
    }

    removeAddAnswerForm = () => {
        let answers = this.state.answers;
        answers.pop(); //Removes Add Answer form
        answers.push(this.addAnswerDiv());
        this.setState({ answers });
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
                        <p>There must be between 3 and 5 answers for every question</p>
                    </span>
                }
            </div>
        )
    }
}

export default AnswerHomePage;
