import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./Components/menu-item";
import AddToMenu from "../AddToMenu/add-to-menu";
import "./rest-menu.css";
import MainHeader from "../../Componenets/New_Header/new-header";

function RestMenu() {
    const [menu, setMenu] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchMenu = async () => {
        if (!token) {
            alert("Unauthorized. Please log in.");
            navigate("/loginrestaurant");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/menu", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/logincustomer");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch menu data");
            }

            const data = await response.json();
            setMenu(data.menu);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, [navigate, token]);

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentFood({});
    };

    const openCreateModal = () => {
        if (!isModalOpen) setIsModalOpen(true);
    };

    const openEditModal = (food) => {
        if (isModalOpen) return;
        setCurrentFood(food);
        setIsModalOpen(true);
    };

    const onUpdate = async () => {
        await fetchMenu(); // Immediately fetch the updated menu after an update
        closeModal();
    };

    const onDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/delete_food/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Pass the token for authentication
                },
            });

            if (response.status === 200) {
                await fetchMenu(); // Reload the menu after deletion
            } else {
                console.error("Failed to delete");
            }
        } catch (error) {
            alert(error);
        }
    };

    if (loading) {
        return <p>Loading menu...</p>;
    }

    if (error) {
        return <p>Error loading menu: {error}</p>;
    }

    return (
        <>
            <MainHeader />
            <div className="Menu Container">
                <div className="header-container">
                    <h1 className="restaurnat-h1">Restaurant Menu</h1>
                    <button className="new-item-button1" onClick={openCreateModal}>
                        Add New Item
                    </button>


                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="close" onClick={closeModal}>
                                    Close
                                </button>
                                <AddToMenu existingFood={currentFood} updateCallback={onUpdate} />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {menu.map((food) => (
                        <MenuItem
                            key={food.id}
                            food={food}
                            updateFood={openEditModal}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default RestMenu;