import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateAccount } from '../utils/api';

const ValidationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleValidation = async (e) => {
        e.preventDefault();
        try {
            const response = await validateAccount({ email, password });
            if (response.success) {
                // Redirect to the appropriate dashboard based on user role
                history.push(`/${response.role}-dashboard`);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Validation failed. Please try again.');
        }
    };

    return (
        <div className="validation-page">
            <h2>Account Validation</h2>
            <form onSubmit={handleValidation}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Validate Account</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default ValidationPage;