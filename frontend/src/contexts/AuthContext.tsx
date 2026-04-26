import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (login: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Проверяем сессию при загрузке приложения
    useEffect(() => {
        fetch('/api/me', {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Not authenticated');
            })
            .then(data => {
                setUser({ login: data.login, role: data.role, created_at: data.created_at });
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logout = () => {
        setUser(null);
        // Удаляем cookie на клиенте
        document.cookie = 'us=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    const login = async (login: string, password: string) => {
        const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        setUser({ login: data.login, role: data.role, created_at: data.created_at });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должна использоваться через AuthProvider');
    }
    return context;
}
