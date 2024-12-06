import styles from './Pagination.module.css';
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = [];
        const delta = 1;

        pages.push(1);

        if (currentPage > delta + 2) {
            pages.push('...');
        }

        if (currentPage - delta > 1) {
            for (let i = currentPage - delta; i <= currentPage + delta; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }
        } else {
            for (let i = 2; i < currentPage + delta; i++) {
                if (i < totalPages) {
                    pages.push(i);
                }
            }
        }

        if (currentPage + delta < totalPages - 1) {
            pages.push('...');
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>

            {generatePageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        disabled={page === currentPage}
                        className={page === currentPage ? styles.activePage : ''}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className={styles.ellipsis}>{page}</span>
                )
            ))}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
