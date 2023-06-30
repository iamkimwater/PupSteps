import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {RootStackParamList, RootState} from '../types/navigationsTypes';
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import userSlice from '../redux/reducers/user';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';
import InfoArea from '../components/InfoArea';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import PetInfo from '../components/PetInfo';
import Alarms from '../components/Alarms';
import FindWalkmateBoard from '../components/FindWalkmateBoard';
import AddPosting from '../components/AddPosting';
import ViewPosting from '../components/ViewPosting';
import Setting from '../screens/Setting';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigation() {
  const {me} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const authCheck = async () => {
    try {
      const cookie = await EncryptedStorage.getItem('cookie');
      if (cookie === null) {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const {idToken} = await GoogleSignin.signInSilently();
          if (idToken !== null) {
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
          } else {
            throw new Error('google login failed');
          }
        } else {
          /*아무 것도 안 함*/
        }
      } else {
        dispatch(userSlice.actions.loginByCookie({}));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const idToken = await user.getIdToken();
      console.log('get idToken success');
      dispatch(userSlice.actions.loginByFirebase({idToken: idToken}));
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
    authCheck().then();
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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="InfoArea" component={InfoArea} />
          <Stack.Screen name="PetInfo" component={PetInfo} />
          {/*<Stack.Screen name="Alarms" component={Alarms} />*/}
          <Stack.Screen
            name="FindWalkmateBoard"
            component={FindWalkmateBoard}
          />
          <Stack.Screen name="AddPosting" component={AddPosting} />
          <Stack.Screen name="ViewPosting" component={ViewPosting} />
          <Stack.Screen name="Settings" component={Setting} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default StackNavigation;
