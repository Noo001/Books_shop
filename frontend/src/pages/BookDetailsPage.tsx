import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Book } from '@/types';

export default function BookDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/books/${id}`, {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(setBook)
            .catch(() => setBook(null))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Удалить навсегда??')) return;
        await fetch(`/api/books/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        navigate('/books');
    };

    if (loading) return <div className="container">Загрузка...</div>;
    if (!book) return <div className="container">Книга не найдена</div>;

    return (
        <div className="container">
            <Link to="/books" className="text-blue mb-4 inline-block">← Обратно в каталог</Link>

            <div className="card">
                <div className="flex-between mb-2">
                    <h1 className="text-3xl font-bold">{book.name}</h1>
                    {user?.role === 'admin' && (
                        <div className="flex gap-2">
                            <Link to={`/books/${id}/edit`} className="btn btn-warning">
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-gray-600 mb-4">Опубликовано пользователем {book.publisher} {new Date(book.created_at).toLocaleDateString()}</p>

                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Описание</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{book.description}</p>
                </div>
            </div>
        </div>
    );
}
