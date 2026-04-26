import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '@/components/BookForm';
import { BookFormData, Book } from '@/types';

export default function BookEditPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = async (data: BookFormData) => {
        const response = await fetch(`/api/books/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Невозможно обновить книгу');
        }

        navigate('/books');
    };

    if (loading) return <div className="container">Loading...</div>;
    if (!book) return <div className="container">Book not found</div>;

    return (
        <BookForm
            initialData={{ name: book.name, description: book.description }}
            onSubmit={handleUpdate}
            submitLabel="Update Book"
        />
    );
}
