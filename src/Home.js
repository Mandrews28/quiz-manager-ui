import React, { Component } from 'react';
import './Home.css';
import Header from './Components/Header/Header.js';
import SignIn from './Components/SignIn/SignIn';
import QuizHomePage from './Components/QuizHomePage/QuizHomePage';

var bcrypt = require('bcryptjs');
var userData = require("./user-data.js");

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isAuthSuccess: false,
            permissions: null
        }

        this.tryAuthentication = this.tryAuthentication.bind(this);
    }

    // createPasswordHash = () => {
    //     var salt = bcrypt.genSaltSync(10);
    //     var generatedHash = bcrypt.hashSync("password", salt);
    //     console.log(generatedHash);
    // }

    tryAuthentication = (event) => {
        event.preventDefault();
        let email = event.target[0].value;
        let password = event.target[1].value;
        let isAuthSuccess = this.authenticate(email, password);
        if (isAuthSuccess) {
            this.setState({ isAuthSuccess });
            document.getElementById("App Sign In").style.display = "none";
            document.getElementById("Sign Out Button").style.display = "";
            document.getElementById("App").style.display = "";
        } else {
            alert("Sign in failed. Check your email and password are correct")
        }
    }

    authenticate = (email, password) => {
        console.log(this.state);
        let isAuthenticated = false;
        if (email) {
            userData.forEach((user) => {
                if (!isAuthenticated && email === user.email &&
                    bcrypt.compareSync(password, user.password)) {
                    isAuthenticated = true;
                    this.setState({ permissions: user.permissions });
                }
            })
        }
        return isAuthenticated;
    }


    render() {
        console.log(this.state);
        return (
            <div className="Home">
                <Header />
                <SignIn onSignInSubmit={this.tryAuthentication} />
                <div id="App" style={{display: "none"}}>
                    {this.state.isAuthSuccess &&
                        <QuizHomePage permissions={this.state.permissions} />
                    }
                </div>
            </div>
        )
    }
}

export default Home;
