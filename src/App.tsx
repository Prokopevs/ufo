import React from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Article from "./pages/Article";
import Home from "./pages/Home";

import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div className="page">
            <Header />
            <Sidebar />
            <main className="main">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/article" element={<Article />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;