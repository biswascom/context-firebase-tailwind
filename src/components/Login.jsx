import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

const Login = () => {
    const { loginUser, resetPassword } = useContext(authContext);

    // redirect page where user can go from login page
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // useRef for collect input(Here we collect email field value. But you collect any kind of input field value) value to reset password 
    const emailRef = useRef();

    const handleLogin = event => {
        // prevent reload page
        event.preventDefault();

        // collect data from input field of form
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // firebase login user
        loginUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();

                // (function call here) redirect page where user can go from login page
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
            })

        // firebase password reset
    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address for reset password');
            return
        }
        resetPassword(email)
            .then(() => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Please Login!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" ref={emailRef} placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                            <label className="label">
                                <Link to="/register" className="label-text-alt link link-hover">Do not have an account? Please register!</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <a onClick={handleResetPassword} className="link link-hover mb-5">Reset Password</a>
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;