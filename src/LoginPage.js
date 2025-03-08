import React, { useState, useEffect } from 'react';
import { keychain, hasKeychainBeenUsed } from '@hiveio/keychain';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if Keychain exists in the window object before calling API
    if (window.hive_keychain) {
      setIsInstalled(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!isInstalled) {
      setMessage('Please install Hive Keychain to continue.');
      return;
    }

    try {
      const { success, msg, cancel, notActive } = await keychain(
        window,
        'requestSignBuffer',
        username,
        'Login request',
        'Posting'
      );

      if (success) {
        setMessage('Login successful!');
      } else if (!cancel) {
        if (notActive) {
          setMessage('Please allow Keychain to access this website.');
        } else {
          setMessage(`Error: ${msg}`);
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Hive Keychain Login</h2>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Hive username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login with Keychain
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
