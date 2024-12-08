import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { EntityList } from "./views/EntityList";
import { EntityDetail } from "./views/EntityDetail";

import { AppContextProvider } from "./store/appContext";

const Layout = () => {
    return (
        <div>
            <AppContextProvider>
                <BrowserRouter>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/single/:theid" element={<Single />} />
                            
                            {/* Nuevas rutas de Star Wars */}
                            <Route path="/people" element={<EntityList type="people" />} />
                            <Route path="/planets" element={<EntityList type="planets" />} />
                            <Route path="/vehicles" element={<EntityList type="vehicles" />} />
                            
                            <Route path="/people/:uid" element={<EntityDetail type="people" />} />
                            <Route path="/planets/:uid" element={<EntityDetail type="planets" />} />
                            <Route path="/vehicles/:uid" element={<EntityDetail type="vehicles" />} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </AppContextProvider>
        </div>
    );
};

export default Layout;