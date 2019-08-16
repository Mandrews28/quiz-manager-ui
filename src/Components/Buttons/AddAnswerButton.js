import React, { Component } from 'react';
import tick from '../../images/tick.png';
import cross from '../../images/cross.png';

class AddAnswerButton extends Component {
    constructor() {
        super();

        this.state = {
            addAnswerDiv: <div />,
            answers: []
        }
    }

    componentDidMount = () => {
        this.setState({ answers: this.props.answers }, () => {
            setTimeout(() => { this.addInitialDiv() });
        });
    }

    addInitialDiv = () => {
        this.setState({ addAnswerDiv: this.initialDiv() });
    }

    initialDiv = () => {
        return (
            <div key="add-answer" className="button-entry button-list add-button">
                <label>+</label>
                <button type="button" className="button-list add-button button-title" onClick={this.onAddAnswerClick}>Add Answer</button>
            </div>
        )
    }

    onAddAnswerClick = () => {
        let answers = this.state.answers;
        let newAnswerForm = <form key={answers.length} className="button-entry button-list add-button" onSubmit={this.props.onAnswerSubmit}>
            <input type="number" className="input-order button-list" min="1" max={answers.length} defaultValue={answers.length} placeholder="A" />
            <input type="text" className="button-list add-button button-title edit-button-title" placeholder="Add your answer here" />
            <img src={cross} className="cross edit-button" alt="cross" onClick={this.addInitialDiv} />
            <input type="image" src={tick} className="tick edit-button" alt="tick" />
        </form>
        this.setState({ addAnswerDiv: newAnswerForm });
    }

    render() {
        return (
            <div id="Add Answer Button">
                {this.state.addAnswerDiv}
            </div>
        )
    }
}

export default AddAnswerButton;
