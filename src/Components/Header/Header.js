import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    onSignOut = (event) => {
        event.preventDefault();
        document.getElementById("App Sign In").style.display = "";
        document.getElementById("Sign Out Button").style.display = "none";
        document.getElementById("App").style.display = "none";
        document.getElementById("Quiz Home Page").style.display = "";
        document.getElementById("Question Home Page").style.display = "none";
        document.getElementById("Answer Home Page").style.display = "none";
    }

    render() {
        return (
            <header className="Header">
                <div>
                    WebbiSkools Quiz Manager
                    <span id="Sign Out Button" style={{ display: "none" }}>
                        <input type="submit" value="Sign Out" className="signout-button" onClick={this.onSignOut} />
                    </span>
                </div>
            </header>
        );
    }
}

export default Header;
