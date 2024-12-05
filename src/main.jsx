// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home.jsx';
// import AnimeList from './components/AnimeList/AnimeList.jsx';
// import AnimeDetails from './components/AnimeDetails/AnimeDetails.jsx';
// import './index.css';
// import CategoriesPage from "./components/CategoriesPage/CategoriesPage.jsx";
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Home />}>
//                     <Route index element={<AnimeList />} />
//                     <Route path="anime/:id" element={<AnimeDetails />} />
//                     <Route path="/categories" element={<CategoriesPage />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// );
//


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home.jsx';
// import AnimeList from './components/AnimeList/AnimeList.jsx';
// import AnimeDetails from './components/AnimeDetails/AnimeDetails.jsx';
// import TopRatedAnimeList from './components/TopRatedAnimeList/TopRatedAnimeList.jsx';
// import './index.css';
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Home />}>
//                     <Route index element={<AnimeList />} />
//                     <Route path="anime/:id" element={<AnimeDetails />} />
//                     <Route path="top-rated" element={<TopRatedAnimeList />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// );



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home.jsx';
// import AnimeList from './components/AnimeList/AnimeList.jsx';
// import AnimeDetails from './components/AnimeDetails/AnimeDetails.jsx';
// import TopRatedAnimeList from './components/TopRatedAnimeList/TopRatedAnimeList.jsx';
// import ShowNewestAnimeList from './components/ShowNewestAnimeList/ShowNewestAnimeList.jsx';
// import ShowOldestAnimeList from './components/ShowOldestAnimeList/ShowOldestAnimeList.jsx';
// import './index.css';
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Home />}>
//                     <Route index element={<AnimeList />} />
//                     <Route path="anime/:id" element={<AnimeDetails />} />
//                     <Route path="top-rated" element={<TopRatedAnimeList />} />
//                     <Route path="newest" element={<ShowNewestAnimeList />} />
//                     <Route path="oldest" element={<ShowOldestAnimeList />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import AnimeList from './components/AnimeList/AnimeList.jsx';
import AnimeSearch from './components/AnimeSearch/AnimeSearch.jsx';
import AnimeDetails from './components/AnimeDetails/AnimeDetails.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
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



