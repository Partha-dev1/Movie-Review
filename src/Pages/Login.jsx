import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>

        <div className='divider'>or</div>

        <button type='button' className='google-btn' onClick={handleGoogleLogin}>
          <img
            src='https://developers.google.com/identity/images/g-logo.png'
            alt='Google'
          />
          Continue with Google
        </button>

        <p>
          Don’t have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
