import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AddMyPet from '../screens/AddMyPet';
import AddPosting from '../screens/AddPosting';
import ViewPosting from '../screens/ViewPosting';
import FindWalkmateBoard from '../screens/FindWalkmateBoard';

import usePalette from '../hooks/usePalette';
import {RootStackParamList, RootState} from '../types/navigationsTypes';
import {useEffect} from 'react';
import {IPalette} from '../types/hooksTypes';
import EncryptedStorage from 'react-native-encrypted-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import userSlice from '../redux/reducers/user';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigation() {
  const palette: IPalette = usePalette();
  const {me} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const authCheck = async () => {
    try {
      const cookie = await EncryptedStorage.getItem('cookie');
      if (cookie === null) {
        // cookie not exist
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          // logged in google
          const {idToken} = await GoogleSignin.signInSilently();
          if (idToken !== null) {
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
          } else {
            throw new Error('google login failed');
          }
        } else {
          // not logged in google
        }
      } else {
        // cookie exist
        dispatch(userSlice.actions.loginByCookie({}));
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      const idToken = await user.getIdToken();
      console.log(idToken);
      // send to my server
      dispatch(userSlice.actions.loginByFirebase({idToken: idToken}));
    }
  }

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
    authCheck();
  }, []);

  useEffect(() => {
    if (me) {
      // setTimeout(() => {
      //   SplashScreen.hide();
      // }, 1000);
    }
  }, [me]);

  return (
    <NavigationContainer>
      {!me ? (
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              flex: 1,
              backgroundColor: palette.THEME_COLOR,
              paddingLeft: 12,
              paddingRight: 12,
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AddMyPet"
            component={AddMyPet}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AddPosting"
            component={AddPosting}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="ViewPosting"
            component={ViewPosting}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="FindWalkmateBoard"
            component={FindWalkmateBoard}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default StackNavigation;
