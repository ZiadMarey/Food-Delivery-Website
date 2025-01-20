import "./lieferspatz.css";
import Logo from "./assets/logoPlaceHolder.png";
import { useState, useEffect } from 'react';

function LiferspatzPage() {
    const [balance, setBalance] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch Lieferspatz balance from the server
        fetch("http://127.0.0.1:5000/lieferspatz_balance", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.balance !== undefined) {
                setBalance(data.balance); // Update balance in state
            } else {
                console.error("Failed to fetch balance:", data.message);
            }
        })
        .catch(error => {
            console.error("Error fetching Lieferspatz balance:", error);
        });
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className="page-div">
            <img src={Logo} alt="Lieferspatz's Logo" className="page-logo" />
            <div className="info-section">
                <p className="balance-text">Current Balance: {balance.toFixed(2)} EUR</p> {/* Display the balance */}
            </div>
        </div>
    );
}

export default LiferspatzPage;
