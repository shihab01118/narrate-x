import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/AnimationWrapper';
import useAuth from '../hooks/useAuth';
import { removeFromSession } from '../common/Session';

const UserNavigationPanel = () => {
  const { user, setUser } = useAuth();

  const handleSignOut = () => {
    removeFromSession('user');
    setUser({ token: null });
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className='absolute right-0 z-50'
    >
      <div className='bg-white border border-grey w-60 overflow-hidden duration-200 rounded'>
        <Link
          to='/editor'
          className='flex gap-3 link md:hidden pl-8 py-4 items-center'
        >
          <i className='fi fi-rr-file-edit text-xl'></i>
          <span>Write</span>
        </Link>

        <Link
          to={`/user/${user?.username}`}
          className='flex gap-3 link pl-8 py-4 items-center'
        >
          <i className='fi fi-rr-user text-xl'></i>
          <span>Profile</span>
        </Link>

        <Link
          to='/dashboard/blogs'
          className='flex gap-3 link pl-8 py-4 items-center'
        >
          <i className='fi fi-rr-apps-add text-xl'></i>
          <span>Dashboard</span>
        </Link>

        <Link
          to='/settings/edit-profile'
          className='flex gap-3 link pl-8 py-4 items-center'
        >
          <i className='fi fi-rs-settings text-xl'></i>
          <span>Settings</span>
        </Link>

        <span className='absolute border-t border-grey w-[100%]'></span>

        <button
          onClick={handleSignOut}
          className='text-left hover:bg-grey pl-8 py-4 w-full'
        >
          <p className='font-bold text-xl mb-1'>Sign Out</p>
          <span className='text-dark-grey'>@{user?.username}</span>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
