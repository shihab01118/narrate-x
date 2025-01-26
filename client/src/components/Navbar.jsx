import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// images
import logo from '../assets/logo.png';
import UserNavigationPanel from './UserNavigationPanel';

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanelVisible, setUserNavPanelVisible] = useState(false);

  const { user } = useAuth();

  return (
    <nav className='navbar'>
      {/* logo */}
      <Link to='/' className='flex-none w-10'>
        <img src={logo} alt='logo' className='w-full' />
      </Link>

      {/* search box */}
      <div
        className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
          searchBoxVisibility ? 'show' : 'hide'
        }`}
      >
        <input
          type='text'
          placeholder='Search'
          className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
        />

        <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey'></i>
      </div>

      {/* buttons */}
      <div className='flex items-center gap-3 md:gap-6 ml-auto'>
        {/* search toggle button */}
        <button
          className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'
          onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
        >
          <i className='fi fi-rr-search text-xl mt-1'></i>
        </button>

        {/* write button */}
        <Link
          to='/editor'
          className='hidden md:flex gap-2 link items-center text-xl hover:rounded-full'
        >
          <i className='fi fi-rr-file-edit text-xl'></i>
          <p className='text-xl'>Write</p>
        </Link>

        {user?.token ? (
          <>
            {/* notification button */}
            <Link to='/dashboard/notification'>
              <button className='size-12 rounded-full bg-grey relative hover:bg-black/10 flex justify-center items-center'>
                <i className='fi fi-rs-bell text-xl mt-1'></i>
              </button>
            </Link>

            {/* profile button */}
            <div
              className='relative'
              onClick={() => setUserNavPanelVisible(!userNavPanelVisible)}
              onBlur={() => {
                setTimeout(() => setUserNavPanelVisible(false), 200);
              }}
            >
              <button className='size-12 mt-1'>
                <img
                  src={user?.profile_img}
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </button>

              {userNavPanelVisible && <UserNavigationPanel />}
            </div>
          </>
        ) : (
          <>
            {/* sign-in button */}
            <Link to='/sign-in' className='btn-dark py-2'>
              Sign In
            </Link>

            {/* sign up button */}
            <Link to='/sign-up' className='btn-light py-2 hidden md:block'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
