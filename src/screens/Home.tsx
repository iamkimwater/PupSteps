import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {HomeProps, NavigationProps, RootState} from '../types/navigationsTypes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function Home(props: HomeProps) {
  const navigation = useNavigation<NavigationProps>();
  const me = useSelector((state: RootState) => state.user.me);

  const GotoLogin = () => {
    navigation.navigate('Login');
  };

  const GotoFindWalkmateBoard = () => {
    navigation.navigate('FindWalkmateBoard');
  };

  const dispatch = useDispatch();

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

  return (
    <View>
      {!me ? (
        <Button title={'Login'} onPress={GotoLogin} />
      ) : (
        <View>
          <Text style={{color: 'black'}}>
            userId: {me.userId}
            email: {me.email}
          </Text>
          <Text>Welcome to PupSteps</Text>
          <Button title={'Logout'} onPress={Logout} />
          <Button title={'나랑산책갈래'} onPress={GotoFindWalkmateBoard} />
        </View>
      )}
    </View>
  );
}

export default Home;

// 로그인 전 화면
// 로그인 후 화면
