import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

export default function VerifyOtpPage({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();


  const email = location.state?.email || localStorage.getItem('email_for_verification') || '';
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      setError('❌ No email found. Please sign up again.');
    }
  }, [email]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/users/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed');
        return;
      }

      setSuccessMessage('✅ Verified successfully! Logging you in...');

      setTimeout(() => {
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        localStorage.removeItem('email_for_verification');
        navigate('/');
      }, 2000);


    } catch (err) {
      setError('Something went wrong');
    }
  };


  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);

    try {
      const res = await fetch('http://localhost:8000/users/resend-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Something went wrong while resending.');
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify</h2>
      <p>Your code was sent to you via email</p>

      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="otp-box"
              inputMode="numeric"
              required
            />
          ))}
        </div>

        <button type="submit" className="verify-btn" disabled={otpDigits.join('').length < 6}>
          Verify
        </button>

        {successMessage && <p className="success-msg">{successMessage}</p>}

        {error && <p className="error-msg">{error}</p>}

        <p className="resend">
          {!canResend ? (
            <>Didn't receive code? <span style={{ color: '#aaa' }}>Resend in {countdown}s</span></>
          ) : (
            <>Didn't receive code? <span className="link" onClick={handleResend}>Request again</span></>
          )}
        </p>
      </form>
    </div>
  );
}
