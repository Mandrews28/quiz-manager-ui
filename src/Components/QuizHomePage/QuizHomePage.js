import React, { Component } from 'react';
import QuestionHomePage from '../QuestionHomePage/QuestionHomePage';

class QuizHomePage extends Component {
    constructor() {
        super();

        this.state = {
            quizList: null,
            permissions: null,
            quizzes: [],
            selectedQuiz: null
        }
    }

    componentDidMount() {
        this.setState({ permissions: this.props.permissions }, () => {
            setTimeout(() => { this.getQuizList() })
        });
    }

    getQuizList = () => {
        fetch('http://localhost:8080/quizzes').then((res) => {
            if (res.status === 200) {
                res.json().then(quizList => {
                    this.setState({ quizList });
                    this.createListOfQuizButtons();
                });
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    createListOfQuizButtons = () => {
        let quizList = this.state.quizList;
        let quizzes = this.state.quizzes;
        if (quizList) {
            quizList.forEach((quiz, i) => {
                quizzes.push(<div key={i} className="button-entry button-list list-entry">
                    <label>{quiz.order}.</label>
                    <button type="button" className="button-list list-entry button-title" onClick={(() => { this.onQuizClick(quiz) })}>{quiz.title}</button>
                </div>
                )
            });
        }
        if (this.state.permissions === 'edit') {
            quizzes.push(<div key={quizList.length} className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title">Create Quiz</button>
            </div>);
        }
        this.setState({ quizzes });
    }

    onQuizClick = selectedQuiz => {
        this.setState({ selectedQuiz });
        document.getElementById("Quiz Home Page").style.display = "none";
        document.getElementById("Question Home Page").style.display = "";
    }

    render() {
        return (
            <div>
                <div id="Quiz Home Page" className="QuizHomePage">
                    <div className="title">
                        Quiz List
                    </div>
                    <div>
                        {this.state.quizzes}
                    </div>
                </div>
                <div id="Question Home Page" style={{ display: "none" }}>
                    {this.state.selectedQuiz &&
                        <QuestionHomePage quiz={this.state.selectedQuiz} permissions={this.state.permissions} />
                    }
                </div>
            </div>
        )
    }
}

export default QuizHomePage;
