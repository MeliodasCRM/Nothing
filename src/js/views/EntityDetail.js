import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EntityDetail = ({ type }) => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadEntityDetails(type, uid);
    }, [type, uid]);

    const entity = store.currentEntity;
    const isFavorite = store.favorites.some(f => f.uid === uid);

    if (!entity) return <div>Cargando...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={actions.getStarWarsImage(type, uid)} 
                        className="img-fluid rounded" 
                        alt={entity.name}
                    />
                </div>
                <div className="col-md-6">
                    <h1>{entity.name}</h1>
                    <button 
                        className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} mb-3`}
                        onClick={() => 
                            isFavorite 
                                ? actions.removeFromFavorites(uid)
                                : actions.addToFavorites({...entity, uid, type})
                        }
                    >
                        {isFavorite ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
                    </button>
                    
                    {Object.entries(entity).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};