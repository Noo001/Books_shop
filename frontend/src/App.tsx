import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import  RoutesConfig from './routes';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RoutesConfig />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

