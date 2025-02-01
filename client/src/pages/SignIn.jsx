import { useState } from 'react';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

// components
import AnimationWrapper from '../common/AnimationWrapper';
import InputBox from '../components/InputBox';
import GoogleAuthButton from '../components/GoogleAuthButton';

// hooks
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import { storeInSession } from '../common/Session';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const axiosPublic = useAxiosPublic();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.length) {
      return enqueueSnackbar('Email is required!', { variant: 'error' });
    }

    if (!password.length) {
      return enqueueSnackbar('Password is required!', { variant: 'error' });
    }

    try {
      const { data } = await axiosPublic.post('/api/auth/sign-in', formData);

      if (data?.success) {
        storeInSession('user', JSON.stringify(data?.user));
        setUser(data?.user);
        enqueueSnackbar(data?.message, { variant: 'success' });
      }
      
    } catch (error) {
      console.log('Error in signing in: ', error);
      if (error?.status === 400 || error?.status === 404) {
        return enqueueSnackbar(error?.response?.data?.message, {
          variant: 'error'
        });
      }
      return enqueueSnackbar('Sign in failed!', { variant: 'error' });
    }
  };

  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center items-center'>
        <form id='authForm' className='w-[80%] max-w-[400px]'>
          <h2 className='text-4xl text-center mb-24 capitalize font-gelasio'>
            Welcome back
          </h2>

          <InputBox
            name='email'
            type='email'
            placeholder='Email'
            icon='fi-rr-envelope'
            value={formData.email}
            onChange={handleChange}
          />

          <InputBox
            name='password'
            type='password'
            placeholder='Password'
            icon='fi-rr-key'
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className='btn-dark center mt-14'
            type='submit'
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='w-1/2 border-black' />
            <p>or</p>
            <hr className='w-1/2 border-black' />
          </div>

          <GoogleAuthButton />

          <p className='text-center mt-6 text-dark-grey text-xl'>
            Don&apos;t have an account?{' '}
            <Link to='/sign-up' className='underline text-black text-xl ml-1'>
              Join us today!
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignIn;
