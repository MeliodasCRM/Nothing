import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Star Wars App
                </Link>
                <div className="ml-auto">
                    <div className="dropdown">
                        <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            data-bs-toggle="dropdown"
                        >
                            Favoritos <span className="badge bg-secondary">{store.favorites.length}</span>
                        </button>
                        <ul className="dropdown-menu">
                            {store.favorites.length === 0 ? (
                                <li><span className="dropdown-item">No hay favoritos</span></li>
                            ) : (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        {fav.name}
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => actions.removeFromFavorites(fav.uid)}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};