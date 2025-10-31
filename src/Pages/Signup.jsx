import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // ✅ Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update the display name (optional, but nice for greetings)
      if (name.trim()) {
        await updateProfile(user, { displayName: name });
      }

      alert('Signup successful! Welcome to MOVIE 🎬');
      navigate('/'); // ✅ Redirect to home page

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <input
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type='submit'>Sign Up</button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
