import React, { useState } from "react";
import getState from "./flux.js";

// Creo el Context
export const Context = React.createContext(null);

// Este componente envuelve la aplicación y maneja el estado global
export const AppContextProvider = ({ children }) => {
    const [state, setState] = useState(
        getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore =>
                setState({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
                })
        })
    );

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};