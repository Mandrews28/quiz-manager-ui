import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {

    render() {
        return (
            <div id="App Sign In" className="SignIn">
                <div className="title">
                    Sign In
                </div>
                <form className="SignInForm" onSubmit={this.props.onSignInSubmit}>
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
