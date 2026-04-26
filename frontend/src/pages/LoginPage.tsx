import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/books', { replace: true });
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(loginInput, password);
            navigate('/books');
        } catch (err) {
            setError('Invalid login or password');
        }
    };

    if (loading) {
        return <div className="login-container">Loading...</div>;
    }

    if (user) {
        return null;
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="card" style={{ width: '400px' }}>
                <h1 className="text-2xl font-bold mb-6 text-center">Books Shop</h1>

                {error && <div className="text-red mb-4 text-center">{error}</div>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Login"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-login">
                    Войти
                </button>

                <div className="text-center mt-4 text-sm" style={{ color: '#6b7280' }}>
                    демО: user/user, admin/admin
                </div>
            </form>
        </div>
    );
}
