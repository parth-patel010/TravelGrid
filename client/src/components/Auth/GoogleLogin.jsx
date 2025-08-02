import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const GoogleLoginButton = ({ onSuccess, onError, buttonText = "Continue with Google", className = "" }) => {
  const { googleLogin } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`);
      const userInfo = await response.json();
      
      const googleUser = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        sub: userInfo.sub
      };

      const result = await googleLogin(googleUser);
      
      if (result.success) {
        toast.success('Successfully logged in with Google! 🎉');
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || 'Google login failed');
        if (onError) onError(result.error);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google');
      if (onError) onError('Failed to login with Google');
    }
  };

  const handleError = () => {
    toast.error('Google login was cancelled or failed');
    if (onError) onError('Google login was cancelled or failed');
  };

  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        size="large"
        text={buttonText}
        shape="rectangular"
        locale="en"
      />
    </div>
  );
};

export default GoogleLoginButton; 