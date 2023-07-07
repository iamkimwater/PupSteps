import React, {useEffect} from 'react';
import {Button, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {LoginProps, RootState} from '../types/navigationsTypes';

function Login() {
  const dispatch = useDispatch();
  const {me} = useSelector((state: RootState) => state.user);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const singinINf = await GoogleSignin.signIn();
      console.log(singinINf);
      const {idToken} = singinINf;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {});

  return me ? (
    <Text>
      로그인 성공 {me.email}, {me.id}
    </Text>
  ) : (
    <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
  );
}

export default Login;
