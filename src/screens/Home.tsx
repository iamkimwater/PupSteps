import React, {useEffect, useState} from 'react';
import {
  Button,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {HomeProps, NavigationProps, RootState} from '../types/navigationsTypes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PetInfoComponent from '../components/PetInfoComponent';
import {set} from 'zod';

const Home = (props: HomeProps) => {
  // 로컬 데이터
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  const gotoBoard = () => {
    navigation.navigate('Board');
  };

  const gotoSetting = () => {
    navigation.navigate('Settings');
  };

  const gotoAddPet1 = () => {
    navigation.navigate('AddPet1');
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(userSlice.actions.loginByCookie({}));
  };

  useEffect(() => {
    navigation.setOptions({
      title: '홈화면',
      headerRight: () => (
        <MaterialCommunityIcons
          name={'account-settings'}
          color={'#000000'}
          size={30}
          onPress={gotoSetting}
        />
      ),
    });
  });

  useEffect(() => {
    if (me) {
      setRefreshing(false);
    }
  }, [me]);

  // 리턴
  return !me ? (
    <Button title={'Login'} onPress={gotoLogin} />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{flex: 1}}>
      <View style={{flex: 6, alignItems: 'center', margin: 20}}>
        <PetInfoComponent />
      </View>
      <View>
        <MaterialCommunityIcons
          onPress={gotoAddPet1}
          name={'plus-box-outline'}
          size={40}
          color={'#c2c2c2'}
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={gotoBoard}>
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
    </ScrollView>
  );
};

export default Home;
