import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Cargar entidades al montar el componente
        actions.loadStarWarsEntities('people');
        actions.loadStarWarsEntities('planets');
        actions.loadStarWarsEntities('vehicles');
        
        // Cargar favoritos desde localStorage
        actions.loadFavoritesFromStorage();
    }, []);

    const categories = [
        { name: 'Personajes', type: 'people', icon: '👥' },
        { name: 'Planetas', type: 'planets', icon: '🌍' },
        { name: 'Vehículos', type: 'vehicles', icon: '🚀' }
    ];

    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Star Wars Universe</h1>
            <div className="row mt-4">
                {categories.map((category, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">
                                    {category.icon} {category.name}
                                </h3>
                                <Link 
                                    to={`/${category.type}`} 
                                    className="btn btn-primary"
                                >
                                    Explorar {category.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};