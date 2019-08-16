import React, { Component } from 'react';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';

class AddQuestionButton extends Component {
    constructor() {
        super();

        this.state = {
            addQuestionDiv: <div />,
            questions: []
        }
    }

    componentDidMount = () => {
        this.setState({ questions: this.props.questions }, () => {
            setTimeout(() => { this.addInitialDiv() });
        });
    }

    addInitialDiv = () => {
        this.setState({ addQuestionDiv: this.initialDiv() });
    }

    initialDiv = () => {
        return (
            <div className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title" onClick={this.onAddQuestionClick}>Add Question</button>
            </div>
        )
    }

    onAddQuestionClick = () => {
        let questions = this.state.questions;
        let newQuestionForm = <form key="new-question-form" className="button-entry button-list add-button" onSubmit={this.props.onQuestionSubmit}>
            <input type="number" className="input-order button-list" min="1" max={questions.length} defaultValue={questions.length} placeholder="Q" />
            <input type="text" className="button-list add-button button-title edit-button-title" placeholder="Add your question here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={this.addInitialDiv} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        this.setState({ addQuestionDiv: newQuestionForm });
    }

    render() {
        return (
            <div id="Add Question Button">
                {this.state.addQuestionDiv}
            </div>
        )
    }
}

export default AddQuestionButton;
