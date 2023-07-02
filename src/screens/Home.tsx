import React, {useEffect} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {HomeProps, NavigationProps, RootState} from '../types/navigationsTypes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PetInfoComponent from '../components/PetInfoComponent';

const Home = (props: HomeProps) => {
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const navigation = useNavigation<NavigationProps>();

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  const gotoFindWalkmateBoardComponent = () => {
    navigation.navigate('FindWalkmateBoardComponent');
  };

  const goToSetting = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    navigation.setOptions({
      title: '홈화면',
      headerRight: () => (
        <MaterialCommunityIcons
          name={'account-settings'}
          color={'#000000'}
          size={30}
          onPress={goToSetting}
        />
      ),
    });
  });

  // 리턴
  return !me ? (
    <Button title={'Login'} onPress={gotoLogin} />
  ) : (
    <View style={{flex: 1}}>
      <View style={{flex: 8, alignItems: 'center', margin: 20}}>
        <PetInfoComponent />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={gotoFindWalkmateBoardComponent}>
          <View
            style={{
              backgroundColor: '#000000',
              height: 50,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 0,
              marginBottom: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>나랑산책갈래</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
