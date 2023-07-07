import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {RootStackParamList, RootState} from '../types/navigationsTypes';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import userSlice from '../redux/reducers/user';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';
import InfoAreaComponent from '../components/InfoAreaComponent';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import AddPost from '../screens/AddPost';
import Setting from '../screens/Setting';
import SplashScreen from 'react-native-splash-screen';
import errorSlice from '../redux/reducers/error';
import Board from '../screens/Board';
import EncryptedStorage from 'react-native-encrypted-storage';
import Post from '../screens/Post';
import AddPet1 from '../screens/AddPet1';
import AddPet2 from '../screens/AddPet2';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);
  const {error} = useSelector((state: RootState) => state.error);

  // 함수
  const dispatch = useDispatch();

  const authCheck = async () => {
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
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    try {
      if (user) {
        const idToken = await user.getIdToken();
        console.log('get idToken success');
        dispatch(userSlice.actions.loginByFirebase({idToken}));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 컴포넌트가 렌더링될 때 자동으로 실행될 함수들의 모음
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
    authCheck();
  }, []);
  useEffect(() => {
    if (me) {
      SplashScreen.hide();
    }
  }, [me]);
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

  // 리턴
  return (
    <NavigationContainer>
      {!me ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="InfoAreaComponent"
            component={InfoAreaComponent}
          />
          <Stack.Screen name="AddPet1" component={AddPet1} />
          <Stack.Screen name="AddPet2" component={AddPet2} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Settings" component={Setting} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
