import React from "react";
import './start.css';
import MainHeaderPlain from "../../Componenets/New_Header_Plain/new-header-plain.jsx";

function StartPage() {
    return (
        <>
            <MainHeaderPlain />
            <div className="page">
                <a href="/signupcus">
                    <button className="choice-button1">
                        <span className="button-icon">👤</span> Sign up as Customer
                    </button>
                </a>
                <a href="/signupres">
                    <button className="choice-button2">
                        <span className="button-icon">🍴</span> Sign up as Restaurant
                    </button>
                </a>
            </div>
        </>
    );
}

export default StartPage;