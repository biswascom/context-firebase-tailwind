import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(authContext);
    const location = useLocation();

    if(loader){
        return <div>Loading...</div>
    }

    if (user) {
        return children;
    }
    
    return <Navigate to="/login" state={{from: location}} replace ></Navigate>;
};

export default PrivateRoute;