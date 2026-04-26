import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { BookFormData } from '../types';

export default function BookCreatePage() {
    const navigate = useNavigate();

    const handleCreate = async (data: BookFormData) => {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Невозможно создать книгу');
        }

        navigate('/books');
    };

    return <BookForm onSubmit={handleCreate} submitLabel="Создание кноги" />;
}
