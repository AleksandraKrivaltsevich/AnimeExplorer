import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AnimeList from './components/AnimeList/AnimeList';
import AnimeSearch from './components/AnimeSearch/AnimeSearch';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLAnchorElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<AnimeList />} />
                    <Route path="search" element={<AnimeSearch />} />
                    <Route path="/anime/:id" element={<AnimeDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);



