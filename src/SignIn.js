import React, { Component } from 'react';
import './SignIn.css';

var bcrypt = require('bcryptjs');
var userData = require("./user-data.js");

class SignIn extends Component {
    handleForm = (event) => {
        event.preventDefault();
        let password = event.target[0].value;
        console.log("input:" + password);
        this.hashingTest(password);
    }

    // createPasswordHash = () => {
    //     var salt = bcrypt.genSaltSync(10);
    //     var generatedHash = bcrypt.hashSync("trees", salt);
    //     console.log(generatedHash);
    // }

    hashingTest = (input) => {
        if (input) {
            let storedPasswordHash = userData.password;
            console.log(bcrypt.compareSync(input, storedPasswordHash));
        }
    }

    render() {
        this.hashingTest();
        return (
            <div className="SignIn">
                <header className="App-header">
                    Quiz Manager
                </header>
                <div className="title">
                    Sign In
                </div>
                <form className="SignInForm" onSubmit={this.handleForm}>
                    <div className="input-field">
                        <label>Email: </label>
                        <input type="text" />
                    </div>
                    <br />
                    <div className="input-field">
                        <label>Password: </label>
                        <input type="password" />
                    </div>
                    <br />
                    <input type="submit" value="Sign In" className="input-submit" />
                </form>
            </div>
        )
    }
}

export default SignIn;
