import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import LoginPage from '../pages/LoginPage';
import BooksCatalogPage from '../pages/BooksCatalogPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import BookCreatePage from '../pages/BookCreatePage';
import BookEditPage from '../pages/BookEditPage';

export default function RoutesConfig() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/" element={<BooksCatalogPage />} />
                <Route path="/books" element={<BooksCatalogPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />

                <Route element={<AdminRoute />}>
                    <Route path="/books/new" element={<BookCreatePage />} />
                    <Route path="/books/:id/edit" element={<BookEditPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
