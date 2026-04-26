import { useState } from 'react';
import { BookFormData } from '../types';

interface Props {
    initialData?: BookFormData;
    onSubmit: (data: BookFormData) => Promise<void>;
    submitLabel: string;
}

const validate = (name: string, description: string): string | null => {
    const pattern = /^[a-zA-Zа-яА-Я\d,;:.!?'"\-— /()\[\]]+$/;
    if (!name.trim()) return 'Name is required';
    if (!description.trim()) return 'Description is required';
    if (!pattern.test(name)) return 'Name contains invalid characters';
    if (!pattern.test(description)) return 'Description contains invalid characters';
    return null;
};

export default function BookForm({ initialData, onSubmit, submitLabel }: Props) {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validate(name, description);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setLoading(true);
        try {
            await onSubmit({ name, description });
        } catch (err) {
            setError('Failed to save book');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">{submitLabel}</h1>

            {error && <div className="text-red mb-4 p-2 bg-red-100 rounded">{error}</div>}

            <div className="mb-4">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label>Description</label>
                <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}
