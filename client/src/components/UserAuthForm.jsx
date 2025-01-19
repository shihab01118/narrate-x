import PropTypes from 'prop-types';
import InputBox from './InputBox';
import GoogleIcon from '../assets/google.png';
import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/AnimationWrapper';

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className='h-cover flex justify-center items-center'>
        <form className='w-[80%] max-w-[400px]'>
          <h2 className='text-4xl text-center mb-24 capitalize'>
            {type === 'sign-in' ? 'Welcome back' : 'Join Us today'}
          </h2>

          {type !== 'sign-in' ? (
            <InputBox
              name='fullname'
              type='text'
              placeholder='Fullname'
              icon='fi-rr-user'
            />
          ) : (
            ''
          )}
          <InputBox
            name='email'
            type='email'
            placeholder='Email'
            icon='fi-rr-envelope'
          />
          <InputBox
            name='password'
            type='password'
            placeholder='Password'
            icon='fi-rr-key'
          />

          <button className='btn-dark center mt-14' type='submit'>
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </button>

          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='w-1/2 border-black' />
            <p>or</p>
            <hr className='w-1/2 border-black' />
          </div>

          <button className='btn-dark flex items-center justify-center gap-4 w-[90%] center'>
            <img src={GoogleIcon} alt='google-icon' className='w-5' />
            Continue with Google
          </button>

          {type === 'sign-in' ? (
            <p className='text-center mt-6 text-dark-grey text-xl'>
              Don&apos;t have an account?{' '}
              <Link to='/sign-up' className='underline text-black text-xl ml-1'>
                Join us today!
              </Link>
            </p>
          ) : (
            <p className='text-center mt-6 text-dark-grey text-xl'>
              Already a member?{' '}
              <Link to='/sign-in' className='underline text-black text-xl ml-1'>
                Sign In here!
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

UserAuthForm.propTypes = {
  type: PropTypes.string
};

export default UserAuthForm;
