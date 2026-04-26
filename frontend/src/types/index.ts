export interface User {
    login: string;
    role: 'user' | 'admin';
    created_at: string;
}

export interface Book {
    id: string;
    name: string;
    description: string;
    publisher: string;
    created_at: string;
}

export interface BookFormData {
    name: string;
    description: string;
}
