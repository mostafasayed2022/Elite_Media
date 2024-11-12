import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/Forms.css';
import logo from "../../assets/logos/logo1.png";
import backgroundImage from "../../assets/home/bacground.png";

const Login: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://api.elitemediahouses.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log('Login successful', data);

            // Store tokens in localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Redirect to the home page after successful login
            navigate('/HomeDashboard');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="login-card">
            <img src={logo} alt="Logo" className="logo" />
                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">User Name:</label>
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
                        <label htmlFor="password" className="input-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
                {/* <div className="social-login">
                    <p>Or login with</p>
                    <button className="social-button google">Google</button>
                    <button className="social-button facebook">Facebook</button>
                </div> */}
                <div className="login-footer">
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
