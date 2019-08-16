import React, { Component } from 'react';
import QuestionHomePage from '../QuestionHomePage/QuestionHomePage';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';
import editIcon from '../../images/editIcon.png';
import deleteIcon from '../../images/deleteIcon.png';
import CreateQuizButton from '../Buttons/CreateQuizButton';

class QuizHomePage extends Component {
    constructor() {
        super();

        this.state = {
            permissions: null,
            quizList: null,
            quizzes: [],
            selectedQuiz: null,
            isCreatingQuiz: false
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
                quizzes.push(this.newQuizDiv(quiz, i));
            });
        }
        if (this.state.permissions === 'edit') {
            quizzes.push(<CreateQuizButton key="add-quiz" onQuizSubmit={this.postNewQuiz} quizzes={this.state.quizzes}/>);
        }
        this.setState({ quizzes });
    }

    newQuizDiv = (quiz, i) => {
        return (
            <div key={i} className="button-entry button-list list-entry">
                <label>{quiz.order}.</label>
                <button type="button" className="button-list list-entry button-title list-entry-title" onClick={(() => { this.onQuizClick(quiz) })}>{quiz.title}</button>
                {this.state.permissions === 'edit' &&
                    <span>
                        <input type="image" src={deleteIcon} className="delete edit-button" alt="delete" onClick={(() => { this.onDeleteClick(quiz) })} />
                        <input type="image" src={editIcon} className="edit edit-button" alt="edit" onClick={(() => { this.onEditTextClick(quiz, i) })} />
                    </span>
                }
                {this.state.permissions !== 'edit' &&
                    <span className="span-filler" />
                }
            </div>
        )
    }

    onQuizClick = selectedQuiz => {
        this.setState({ selectedQuiz });
        document.getElementById("Quiz Home Page").style.display = "none";
        document.getElementById("Question Home Page").style.display = "";
    }

    onDeleteClick = (quiz) => {
        let result = window.confirm("Are you sure you want to delete quiz " + quiz.order + ": " + quiz.title);
        if (result) {
            this.sendDeleteRequest(quiz);
        }
    }

    sendDeleteRequest = async (quiz) => {
        let url = 'http://localhost:8080/quiz/quiz' + quiz.order;

        const response = await fetch(url, {
            method: 'DELETE'
        }).catch((e) => {
            console.log(e);
        });
        await response.json().then(quizList => {
            if (response.status === 200) {
                this.setState({ quizList, quizzes: [] });
                this.createListOfQuizButtons();
            } else {
                alert(quizList.message);
            }
        });
    }

    onEditTextClick = (quiz, index) => {
        let quizzes = this.state.quizzes;
        let oldQuizDiv = quizzes[index];

        let editForm = <form key={index} className="button-entry button-list list-entry" onSubmit={((event) => { this.postEditedText(event, quiz) })}>
            <label>{quiz.order}.</label>
            <input type="text" className="button-list list-entry button-title edit-button-title" defaultValue={quiz.title} placeholder="Add your quiz title here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={(() => { this.removeEditForm(oldQuizDiv, index) })} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        quizzes[index] = editForm;
        this.setState({ quizzes });
    }

    removeEditForm = (oldQuizDiv, index) => {
        let quizzes = this.state.quizzes;
        quizzes[index] = oldQuizDiv;
        this.setState({ quizzes });
    }

    postEditedText = async (event, quiz) => {
        event.preventDefault();
        let quizText = event.target[0].value;

        if (quizText) {
            const payload = {
                title: quizText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quiz.order;

            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                }
            }).catch((e) => {
                console.log(e);
            });
            await response.json().then(quizList => {
                if (response.status === 200) {
                    this.setState({ quizList, quizzes: [] });
                    this.createListOfQuizButtons();
                } else {
                    alert(quizList.message);
                }
            });
        } else {
            alert("Please submit a title for the quiz");
        }
    }

    postNewQuiz = async (event) => {
        event.preventDefault();
        let quizOrder = event.target[0].value;
        let quizText = event.target[1].value;

        if (quizOrder && quizText) {
            const payload = {
                title: quizText
            };
            let url = 'http://localhost:8080/quiz/quiz' + quizOrder;

            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                }
            }).catch((e) => {
                console.log(e);
            });
            await response.json().then(quizList => {
                if (response.status === 200) {
                    this.setState({ quizList, quizzes: [] });
                    this.createListOfQuizButtons();
                } else {
                    alert(quizList.message);
                }
            });
        } else {
            alert("Please submit quiz title and a number for quiz order");
        }
    }

    // onCreateQuizClick = () => {
    //     this.setState({ isCreatingQuiz: true });
    //     document.getElementById("Quiz Home Page").style.display = "none";
    //     document.getElementById("Create Quiz Form").style.display = "";
    // }

    // turnCreateQuizFormOff = () => {
    //     this.setState({ isCreatingQuiz: false });
    //     document.getElementById("Create Quiz Form").style.display = "none";
    //     document.getElementById("Quiz Home Page").style.display = "";
    // }

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
                 {/* <div id="Create Quiz Form" style={{ display: "none" }}>
                    {this.state.isCreatingQuiz &&
                        <CreateQuizForm onFormClosed={this.turnCreateQuizFormOff} />
                    }
                </div> */}
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
