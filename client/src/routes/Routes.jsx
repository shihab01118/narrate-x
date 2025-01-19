import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserAuthForm from '../components/UserAuthForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sign-in',
        element: <UserAuthForm type='sign-in' />
      },
      {
        path: 'sign-up',
        element: <UserAuthForm type='sign-up' />
      }
    ]
  }
]);

export default router;
