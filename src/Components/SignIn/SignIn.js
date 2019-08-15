import React, { Component } from 'react';
import './SignIn.css';

var bcrypt = require('bcryptjs');
var userData = require("../../user-data.js");

class SignIn extends Component {
    onFormSubmit = (event) => {
        event.preventDefault();
        let email = event.target[0].value;
        let password = event.target[1].value;
        let isAuthSuccessful = this.authenticate(email, password);
        if (isAuthSuccessful) {
            document.getElementById("App Sign In").style.display = "none";
            document.getElementById("Sign Out Button").style.display = "";
            document.getElementById("QuizHomePage").style.display = "";
        } else {
            alert("Sign in failed. Check your email and password are correct")
        }
    }

    // createPasswordHash = () => {
    //     var salt = bcrypt.genSaltSync(10);
    //     var generatedHash = bcrypt.hashSync("password", salt);
    //     console.log(generatedHash);
    // }

    authenticate = (email, password) => {
        let isAuthenticated = false;
        if (email) {
            userData.forEach((user) => {
                if (!isAuthenticated && email === user.email &&
                    bcrypt.compareSync(password, user.password)) {
                    isAuthenticated = true;
                }
            })
        }
        return isAuthenticated;
    }

    render() {
        return (
            <div id="App Sign In" className="SignIn">
                <div className="title">
                    Sign In
                </div>
                <form className="SignInForm" onSubmit={this.onFormSubmit}>
                    <div className="signin-input-field">
                        <label>Email: </label>
                        <input type="text" />
                    </div>
                    <br />
                    <div className="signin-input-field">
                        <label>Password: </label>
                        <input type="password" />
                    </div>
                    <br />
                    <input type="submit" value="Sign In" className="signin-input-submit" />
                </form>
            </div>
        )
    }
}

export default SignIn;
