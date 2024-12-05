import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') return; // Игнорируем пустую строку
        navigate(`/search?search=${encodeURIComponent(searchTerm.trim())}`); // Кодируем строку поиска
    };

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.overlay}>
                    <h1 className={styles.headerText}>Anime Explorer</h1>
                    <form className={styles.form} onSubmit={handleSearch}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Search for anime..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className={styles.button}
                            type="submit"
                            disabled={searchTerm.trim() === ''}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Home;
