import React, { Component } from 'react';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';

class CreateQuizButton extends Component {
    constructor() {
        super();

        this.state = {
            addQuizDiv: <div />,
            quizzes: []
        }
    }

    componentDidMount = () => {
        this.setState({ quizzes: this.props.quizzes }, () => {
            setTimeout(() => { this.addInitialDiv() });
        });
    }

    addInitialDiv = () => {
        this.setState({ addQuizDiv: this.initialDiv() });
    }

    initialDiv = () => {
        return (
            <div key="add-quiz" className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title add-button-title" onClick={this.onCreateQuizClick}>Create Quiz</button>
            </div>
        )
    }

    onCreateQuizClick = () => {
        let quizzes = this.state.quizzes;
        let newQuizForm = <form key="new-quiz-form" className="button-entry button-list add-button" onSubmit={this.props.onQuizSubmit}>
            <input type="number" className="input-order button-list" min="1" max={quizzes.length} defaultValue={quizzes.length} placeholder="Q" />
            <input type="text" className="button-list add-button button-title edit-button-title" placeholder="Add your quiz title here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={this.addInitialDiv} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        this.setState({ addQuizDiv: newQuizForm });
    }

    render() {
        return (
            <div id="Create Quiz Button">
                {this.state.addQuizDiv}
            </div>
        )
    }
}

export default CreateQuizButton;
