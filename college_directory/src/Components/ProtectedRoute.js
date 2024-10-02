import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
    const token = localStorage.getItem('jwtToken');
    let isAuthorized = false;

    if (token) {
        const decodedToken = jwtDecode(token);
        isAuthorized = decodedToken.role === requiredRole;
    }

    return isAuthorized ? element : <Navigate to="/login" />
};

export default ProtectedRoute;

