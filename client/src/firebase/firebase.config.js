import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

export const SignInWithGoogle = async () => {
  let user = null;

  try {
    const result = await signInWithPopup(auth, googleProvider);
    user = result?.user;
  } catch (error) {
    console.log('Error in sign in with google: ', error);
  }

  return user;
};
