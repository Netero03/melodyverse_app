// In your frontend routes or component handling the verification process
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (token) {
      // Make a request to your backend to verify the token
      axios.post('https://melodyverse-backend.vercel.app/api/signup', { token })
        .then(response => {
          // Handle successful verification
          console.log(response.data.message); // Display success message
          // Redirect the user to a success page or display a success message
        })
        .catch(error => {
          // Handle verification error
          console.error('Verification error:', error.response.data.message);
          // Redirect the user to an error page or display an error message
        });
    }
  }, [token]);

  return (
    // You can render a loading spinner or message while verification is in progress
    <div>Loading...</div>
  );
};

export default VerifyEmailPage;
