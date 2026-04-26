import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookCard from '../components/BookCard';
import { Book } from '../types';

export default function BooksCatalogPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState<'name' | 'created_at'>('created_at');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const { user } = useAuth();

    useEffect(() => {
        fetch(`/api/books?sort=${sort}&order=${order}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [sort, order]);

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div className="flex-between mb-6">
                <h1 className="text-3xl font-bold">Books Catalog</h1>
                <div className="flex gap-2">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                        className="p-2 border rounded"
                    >
                        <option value="created_at">Sort by Date</option>
                        <option value="name">Sort by Name</option>
                    </select>
                    <button
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className="btn btn-secondary"
                    >
                        {order === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                    {user?.role === 'admin' && (
                        <Link to="/books/new" className="btn btn-primary">
                            + Add Book
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid">
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

            {books.length === 0 && (
                <div className="text-center p-6">No books found.</div>
            )}
        </div>
    );
}
