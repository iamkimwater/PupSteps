import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootStackParamList, RootState} from '../types/navigationsTypes';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import AddPost from '../screens/AddPost';
import Setting from '../screens/Setting';
import SplashScreen from 'react-native-splash-screen';
import Board from '../screens/Board';
import Post from '../screens/Post';
import AddPet1 from '../screens/AddPet1';
import AddPet2 from '../screens/AddPet2';
import useSocket from '../hooks/useSocket';
import Chatting from '../screens/Chatting';
import Chattings from '../screens/Chattings';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const [socket, connect] = useSocket();
  const [authCheck, onAuthStateChanged] = useAuth();

  // 컴포넌트가 렌더링될 때 자동으로 실행될 함수들의 모음
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
    authCheck();
  }, [authCheck, onAuthStateChanged]);
  useEffect(() => {
    if (me) {
      // 채팅 통신을 위해서 통로를 개설
      if (!socket) {
        const connectedSocket = connect();
        connectedSocket.emit('join-room', {userId: me.id});
      }
      SplashScreen.hide();
    }
  }, [connect, me, socket]);

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
          <Stack.Screen name="AddPet1" component={AddPet1} />
          <Stack.Screen name="AddPet2" component={AddPet2} />
          <Stack.Screen name="Board" component={Board} options={{title: ''}} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="Post" component={Post} options={{title: ''}} />
          <Stack.Screen name="Settings" component={Setting} />
          <Stack.Screen
            name="Chatting"
            component={Chatting}
            options={{title: '루비엄마 김유아와 대화중..'}}
          />
          <Stack.Screen name="Chattings" component={Chattings} options={{}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
