import { Link } from 'react-router-dom';
import { Book } from '../types';

interface Props {
    book: Book;
}

export default function BookCard({ book }: Props) {
    const shortDesc = book.description.length > 100
        ? book.description.slice(0, 100) + '...'
        : book.description;

    return (
        <div className="card">
            <h2 className="text-xl font-bold">{book.name}</h2>
            <p className="text-gray-600 mt-1">{shortDesc}</p>
            <p className="text-sm text-gray-500 mt-2">by {book.publisher}</p>
            <Link to={`/books/${book.id}`} className="btn btn-primary mt-4 inline-block">
                View Details
            </Link>
        </div>
    );
}
