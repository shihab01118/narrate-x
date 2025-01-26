import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import RedirectAuthenticatedUser from './RedirectAuthenticatedUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sign-in',
        element: (
          <RedirectAuthenticatedUser>
            <SignIn />
          </RedirectAuthenticatedUser>
        )
      },
      {
        path: 'sign-up',
        element: (
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        )
      }
    ]
  }
]);

export default router;
