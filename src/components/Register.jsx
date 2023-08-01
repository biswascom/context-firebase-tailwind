import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { creatUser } = useContext(authContext);

    const handleRegister = event => {
        event.preventDefault();

        // collect form data
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);

        // firebase creat user auth
        creatUser(email, password)
            .then(result => {
                const currentUser = result.user;
                console.log(currentUser);
                updateUserData(currentUser, name)
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    // firebase update user name
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Please Register!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                            <label className="label">
                                <Link to="/login" className="label-text-alt link link-hover">Already have an account? Please login!</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;