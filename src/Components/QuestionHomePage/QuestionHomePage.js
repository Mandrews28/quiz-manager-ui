import React, { Component } from 'react';
import AnswerHomePage from '../AnswerHomePage/AnswerHomePage';

class QuestionHomePage extends Component {
    constructor() {
        super();

        this.state = {
            quiz: null,
            questionList: null,
            permissions: null,
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
                questions.push(<div key={i} className="button-entry button-list list-entry">
                    <label>{question.order}.</label>
                    <button type="button" className="button-list list-entry button-title" onClick={(() => { this.onQuestionClick(question) })}>{question.value}</button>
                </div>
                )
            });
        }
        questions.push(<div key={questionList.length} className="button-entry button-list add-button">
            <label>+</label>
            <button type="button" className="button-list add-button button-title">Add Question</button>
        </div>);
        this.setState({ questions });
    }

    onQuestionClick = selectedQuestion => {
        if (this.state.permissions === 'edit' || this.state.permissions === 'view') {
            this.setState({ selectedQuestion });
            document.getElementById("Question List").style.display = "none";
            document.getElementById("Answer Home Page").style.display = "";
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
                        <AnswerHomePage quiz={this.state.quiz} question={this.state.selectedQuestion} />
                    }
                </div>
            </div>
        )
    }
}

export default QuestionHomePage;
