import React, { Component } from 'react';
import './Home.css';
import Header from './Components/Header/Header.js';
import SignIn from './Components/SignIn/SignIn';
import QuizHomePage from './Components/QuizHomePage/QuizHomePage';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <SignIn />
                <QuizHomePage />
            </div>
        )
    }
}

export default Home;
