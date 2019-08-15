import React, { Component } from 'react';

class AnswerHomePage extends Component {
    constructor() {
        super();

        this.state = {
            quiz: null,
            question: null,
            answerList: null,
            answers: []
        }
    }

    componentDidMount = () => {
        this.setState({ quiz: this.props.quiz, question: this.props.question }, () => {
            setTimeout(() => { this.getAnswerList() })
        } );
    }

    getAnswerList = () => {
        let quiz = this.state.quiz;
        let question = this.state.question;
        if (quiz && question) {
            let quizOrder = quiz.order;
            let questionOrder = question.order;

            let url = 'http://localhost:8080/quiz/quiz' + quizOrder + '/question' + questionOrder;

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
                answers.push(<div key={i} className="button-entry button-list list-entry">
                    <label>{answer.order}.</label>
                    <button type="button" className="button-list list-entry button-title">{answer.value}</button>
                </div>
                )
            });
        }
        answers.push(<div key={answerList.length} className="button-entry button-list add-button">
            <label>+</label>
            <button type="button" className="button-list add-button button-title">Add Answer</button>
        </div>);
        this.setState({ answers });
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
                    </span>
                }
            </div>
        )
    }
}

export default AnswerHomePage;
