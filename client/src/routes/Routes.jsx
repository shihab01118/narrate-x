import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      }
    ]
  }
]);

export default router;
