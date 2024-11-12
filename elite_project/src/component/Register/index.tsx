
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/Forms.css';
import logo from "../../assets/logos/logo1.png";
import backgroundImage from "../../assets/home/bacground.png";

const Register = () => {

    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const requestBody = { username, email, password };

        try {
            const response = await fetch('https://api.elitemediahouses.com/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();

            console.log('Registration successful', data);
            navigate("/login")
            // Redirect to login or home page after successful registration
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <>
            <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="login-card">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2 className="login-title">Register</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleRegister} className="login-form">
                        <div className="input-group">
                            <label  className="input-label">User Name:</label>
                            <input
                                type="text"
                                id="email"
                                className="input-field"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
                        </div>
                        <button type="submit" className="login-button">REGISTER</button>
                    </form>
                    <div className="login-footer">
                        <p>Do you  have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Register;