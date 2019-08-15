import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    onSignOut = () => {
        window.location.reload();
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
