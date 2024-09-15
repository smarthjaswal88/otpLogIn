import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './FirebaseConfig'; 
import { signOut } from 'firebase/auth'; 

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App!</h1>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Welcome;
