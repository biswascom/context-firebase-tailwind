import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(authContext);
    const handleLogout = () => {
        logOut()
            .then(result => { console.log(result.user) })
            .catch(error => { console.log(error) })
    }
    return (
        <div className='flex justify-center'>
            <div className="navbar bg-primary text-primary-content">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Context & Firebase</a>
                    <Link className="btn btn-ghost normal-case text-xl" to="/">Home</Link>
                    <Link className="btn btn-ghost normal-case text-xl" to="/login">Login</Link>
                    <Link className="btn btn-ghost normal-case text-xl" to="/register">Register</Link>
                    <Link className="btn btn-ghost normal-case text-xl" to="/profile">Profile</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        {user && <p>{user.displayName} <button onClick={handleLogout} className="btn btn-ghost normal-case text-xl">Logout</button></p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;