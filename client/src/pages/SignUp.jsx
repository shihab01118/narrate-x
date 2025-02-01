import { useState } from 'react';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

// components
import AnimationWrapper from '../common/AnimationWrapper';
import InputBox from '../components/InputBox';
import GoogleAuthButton from '../components/GoogleAuthButton';

// hooks
import useAxiosPublic from '../hooks/useAxiosPublic';
import { storeInSession } from '../common/Session';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const axiosPublic = useAxiosPublic();
  const {setUser} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const { fullname, email, password } = formData;

    if (fullname.length < 3) {
      return enqueueSnackbar('Fullname must be at least 3 characters long!', {
        variant: 'error'
      });
    }

    if (!email.length) {
      return enqueueSnackbar('Email is required!', { variant: 'error' });
    }

    if (!emailRegex.test(email)) {
      return enqueueSnackbar('Invalid Email!', { variant: 'error' });
    }

    if (!password.length) {
      return enqueueSnackbar('Password is required!', { variant: 'error' });
    }

    if (!passwordRegex.test(password)) {
      return enqueueSnackbar(
        'Password should be 6 to 20 characters long with a numeric, uppercase and lowercase letter!',
        { variant: 'error' }
      );
    }

    try {
      const { data } = await axiosPublic.post('/api/auth/sign-up', formData);

      if (data?.success) {
        storeInSession('user', JSON.stringify(data?.user));
        setUser(data?.user);
        enqueueSnackbar(data?.message, { variant: 'success' });
      }
    } catch (error) {
      console.log('Error in signing up: ', error);
      if (error?.status === 400 || error?.status === 404) {
        return enqueueSnackbar(error?.response?.data?.message, {
          variant: 'error'
        });
      }
      return enqueueSnackbar('Sign up failed!', { variant: 'error' });
    }
  };

  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center items-center'>
        <form className='w-[80%] max-w-[400px]'>
          <h2 className='text-4xl text-center mb-24 capitalize font-gelasio'>
            Join Us today
          </h2>

          <InputBox
            name='fullname'
            type='text'
            placeholder='Fullname'
            icon='fi-rr-user'
            value={formData.fullname}
            onChange={handleChange}
          />

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
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='w-1/2 border-black' />
            <p>or</p>
            <hr className='w-1/2 border-black' />
          </div>

          <GoogleAuthButton />

          <p className='text-center mt-6 text-dark-grey text-xl'>
            Already a member?{' '}
            <Link to='/sign-in' className='underline text-black text-xl ml-1'>
              Sign In here! 
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignUp;
