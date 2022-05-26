import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const hostName = "http://localhost:5000";
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(hostName + '/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem("auth-token", json.authToken);
            navigate("/");
            props.showAlert("success", "Account created successfully");
        }
        else {
            props.showAlert("danger", "Please fill the details correctly");
        }
    }
    return (
        <form className='container' style={{ width: "500px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required minLength={3} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}

export default Signup