import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  PanResponder,
  Button,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {NavigationProps, RootState} from '../types/navigationsTypes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PetInfoComponent from '../components/PetInfoComponent';
import {set} from 'zod';
import {SafeAreaView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import useSocket from '../hooks/useSocket';

const Home = () => {
  // 로컬 데이터
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [count, setCount] = useState(3);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();

  const pan = useRef(new Animated.ValueXY()).current;

  const [socket] = useSocket();

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

  const loginUser2 = () => {
    const cookie = '2';
    dispatch(userSlice.actions.loginByCookie({cookie}));
    Alert.alert('유저2로 로그인되었습니다');
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < 0) {
          gotoBoard();
        }
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const gotoChattings = () => {
    navigation.navigate('Chattings');
  };

  useEffect(() => {
    // 2. 이벤트를 받는다
    if (socket) {
      socket.on('new-chat-created', () => {
        console.log('이벤트받았음');
        setCount(count + 1);
      });
    }
  }, [count, socket]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigationBarColor: '#000000',
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name={'login'}
            color={'#000000'}
            size={30}
            onPress={loginUser2}
            style={{marginRight: 10}}
          />
          <MaterialCommunityIcons
            name={'send'}
            color={'#000000'}
            size={30}
            onPress={gotoChattings}
            style={{marginRight: 10}}
          />
          <Text>{count}</Text>
          <MaterialCommunityIcons
            name={'account-details'}
            color={'#000000'}
            size={30}
            onPress={gotoSetting}
          />
        </View>
      ),
    });
  });

  useEffect(() => {
    if (me) {
      setRefreshing(false);
    }
  }, [me]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  // 리턴
  return !me ? (
    <Button title={'Login'} onPress={gotoLogin} />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View>
        <View style={{marginTop: 30}}>
          <Text
            style={{
              color: '#4d4d4d',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 50,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            PupSteps :)
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={gotoAddPet1}>
            <View
              style={{
                backgroundColor: '#000000',
                height: 70,
                width: 70,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
                marginLeft: 50,
                marginRight: 285,
              }}>
              <Text
                style={{
                  fontSize: 40,
                  color: '#ffffff',
                  textAlign: 'left',
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{flex: 6, alignItems: 'center'}}>
          <PetInfoComponent />
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Animated.View style={{opacity: fadeAnim, marginTop: 80}}>
            <MaterialCommunityIcons
              name="chevron-up"
              color="#000000"
              size={50}
            />
          </Animated.View>
        </View>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-15, 0],
                  outputRange: [-15, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          onAccessibilityAction={gotoBoard}>
          <View
            style={{
              backgroundColor: '#000000',
              height: 40,
              marginLeft: 70,
              marginRight: 70,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, color: '#ffffff'}}>
              산책메이트 찾으러 가볼까?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#000000',
              height: 30,
              marginLeft: 70,
              marginRight: 70,
            }}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1, backgroundColor: '#000000'}} />
    </ScrollView>
  );
};

export default Home;
