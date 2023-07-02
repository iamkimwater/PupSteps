import {Button, Text, View} from 'react-native';
import {RootState, SettingsProps} from '../types/navigationsTypes';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import userSlice from '../redux/reducers/user';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LoadingComponent from '../components/common/LoadingComponent';

function Setting(props: SettingsProps) {
  // 글로벌 데이터
  const dispatch = useDispatch();
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const Logout = async () => {
    dispatch(userSlice.actions.logout({}));
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
        await auth().signOut();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 리턴
  return me ? (
    <View>
      <Text style={{color: 'black'}}>
        userId: {me.id}
        email: {me.email}
      </Text>
      <Button title={'Logout'} onPress={Logout} />
    </View>
  ) : (
    <LoadingComponent />
  );
}
export default Setting;
