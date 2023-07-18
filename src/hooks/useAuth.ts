import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../redux/reducers/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import errorSlice from '../redux/reducers/error';
import {RootState} from '../types/navigationsTypes';

const useAuth = (): [
  () => Promise<void>,
  (user: FirebaseAuthTypes.User | null) => Promise<void>,
] => {
  const dispatch = useDispatch();
  const {error} = useSelector((state: RootState) => state.error);

  const authCheck = useCallback(async () => {
    try {
      const cookie = await EncryptedStorage.getItem('cookie');
      dispatch(userSlice.actions.loginByCookie({cookie}));
      // const cookie = await EncryptedStorage.getItem('cookie');
      // if (cookie) {
      //   dispatch(userSlice.actions.loginByCookie({}));
      //   return;
      // }
      //
      // const isSignedIn = await GoogleSignin.isSignedIn();
      // if (!isSignedIn) {
      //   SplashScreen.hide();
      //   return;
      // }
      //
      // const {idToken} = await GoogleSignin.signInSilently();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      try {
        if (user) {
          const idToken = await user.getIdToken();
          console.log('get idToken success');
          dispatch(userSlice.actions.loginByFirebase({idToken}));
        }
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  useEffect(() => {
    if (error) {
      if (error.type === 'cookie-expired') {
        SplashScreen.hide();
      } else if (error.type === 'firebase-token-error') {
        SplashScreen.hide();
      } else if (error.type === 'user-type-error') {
        SplashScreen.hide();
      }
      dispatch(errorSlice.actions.setError({}));
    }
  }, [dispatch, error]);

  return [authCheck, onAuthStateChanged];
};

export default useAuth;
