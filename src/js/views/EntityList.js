import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EntityList = ({ type }) => {
    const { store, actions } = useContext(Context);
    const entities = store[type] || [];

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
            <div className="row">
                {entities.map((entity) => (
                    <div key={entity.uid} className="col-md-4 mb-4">
                        <div className="card">
                            <img 
                                src={actions.getStarWarsImage(type, entity.uid)} 
                                className="card-img-top" 
                                alt={entity.name}
                                style={{height: '300px', objectFit: 'cover'}}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{entity.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <Link 
                                        to={`/${type}/${entity.uid}`} 
                                        className="btn btn-primary"
                                    >
                                        Ver detalles
                                    </Link>
                                    <button 
                                        className={`btn ${store.favorites.some(f => f.uid === entity.uid) ? 'btn-warning' : 'btn-outline-warning'}`}
                                        onClick={() => 
                                            store.favorites.some(f => f.uid === entity.uid)
                                                ? actions.removeFromFavorites(entity.uid)
                                                : actions.addToFavorites({...entity, type})
                                        }
                                    >
                                        {store.favorites.some(f => f.uid === entity.uid) ? '★' : '☆'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};