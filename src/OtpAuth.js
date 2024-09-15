// src/OtpAuth.js
import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseConfig";

const OtpAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.recaptchaVerifier) {
      return;
    }

    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
        },
        expiredCallback: () => {
          // Response expired
        }
      }
    );

    window.recaptchaVerifier = recaptchaVerifier;
    recaptchaVerifier.render();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const sendOtp = async () => {
    const MIN_DIGITS_REQUIRED = 10;

    if (phoneNumber === "" || phoneNumber.length < MIN_DIGITS_REQUIRED) {
      alert("Invalid phone number. Please enter a valid number with at least " + MIN_DIGITS_REQUIRED + " digits.");
      return;
    }

    try {
      const response = await setupRecaptcha(phoneNumber);
      setVerificationId(response.verificationId);
      setIsOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error sending OTP: " + err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("User signed in successfully");
      navigate('/welcome');
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Phone Number Authentication
        </h2>

        {!isOtpSent ? (
          <>
            <input
              type="text"
              className="border p-2 w-full rounded mb-4"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={sendOtp}
            >
              Send OTP
            </button>
            
            <div id="recaptcha-container"></div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="border p-2 w-full rounded mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpAuth;
