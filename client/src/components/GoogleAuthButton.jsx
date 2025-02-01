import { enqueueSnackbar } from 'notistack';
import { SignInWithGoogle } from '../firebase/firebase.config';
import GoogleIcon from '../assets/google.png';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { storeInSession } from '../common/Session';
import useAuth from '../hooks/useAuth';

const GoogleAuthButton = () => {
  const axiosPublic = useAxiosPublic();
  const { setUser } = useAuth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      const user = await SignInWithGoogle();
      const { data } = await axiosPublic.post('/api/auth/google-auth', {
        token: user.accessToken
      });

      if (data?.success) {
        storeInSession('user', JSON.stringify(data?.user));
        setUser(data?.user);
        enqueueSnackbar('Login successful!', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Google sign in failed!', { variant: 'error' });
      return console.log('Error in handle google sign in: ', error);
    }
  };

  return (
    <button
      className='btn-dark flex items-center justify-center gap-4 w-[90%] center'
      onClick={handleGoogleSignIn}
    >
      <img src={GoogleIcon} alt='google-icon' className='w-5' />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
