import React from "react";
import './start.css';

function StartPage() {
    return (
        <>
            <div className="page">
                <a href="/signupcus">
                    <button className="choice-button1">
                        <span className="button-icon">👤</span> Sign in as Customer
                    </button>
                </a>
                <a href="/signupres">
                    <button className="choice-button2">
                        <span className="button-icon">🍴</span> Sign in as Restaurant
                    </button>
                </a>
            </div>
        </>
    );
}

export default StartPage;