import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    background: '#1a1625',
  },
  leftPanel: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(45deg, #2d1b69, #5d2fbd)',
  },
  rightPanel: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '480px',
    margin: '0 auto',
    width: '100%',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '4rem',
  },
  heroText: {
    fontSize: '3.5rem',
    fontWeight: '600',
    color: 'white',
    lineHeight: '1.2',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: '1',
  },
  subText: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
    position: 'relative',
    zIndex: '1',
  },
  formTitle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '1rem',
  },
  formSubtext: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '2rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s',
    outline: 'none',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
    },
    '&:focus': {
      borderColor: '#5d2fbd',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#5d2fbd',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#4d27a8',
      transform: 'translateY(-2px)',
    },
  },
  error: {
    color: '#ff4e4e',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) {
      setError('Please enter your Hive username');
      return;
    }

    if (window.hive_keychain) {
      const memo = Math.random().toString(36).substring(2);
      
      window.hive_keychain.requestSignBuffer(
        username,
        memo,
        'Posting',
        (response) => {
          if (response.success) {
            localStorage.setItem('hive_username', username);
            navigate('/hiveblogs');
          } else {
            setError('Authentication failed: ' + response.message);
          }
        }
      );
    } else {
      setError('Hive Keychain is not installed. Please install it to continue.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.logo}>HIVE</div>
        <h1 style={styles.heroText}>
          Capturing Moments,<br />
          Creating Memories
        </h1>
        <p style={styles.subText}>
          Join the decentralized content platform where your voice matters.
        </p>
        <Link to="/" style={styles.backButton}>Back to website →</Link>
      </div>
      
      <div style={styles.rightPanel}>
        <h2 style={styles.formTitle}>Create an account</h2>
        <p style={styles.formSubtext}>
          Already have an account? <Link to="/" style={{color: '#5d2fbd', textDecoration: 'none'}}>Log in</Link>
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter your Hive username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handleLogin} style={styles.button}>
          Login with Hive Keychain
        </button>
      </div>
    </div>
  );
};

export default Login; 