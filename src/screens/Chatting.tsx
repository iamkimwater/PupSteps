import {ChattingProps, RootState} from '../types/navigationsTypes';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {IChat} from '../types/infoTypes';
import ChattingSubmitComponent from '../components/chatting/ChattingSubmitComponent';
import useSocket from '../hooks/useSocket';
import ChatComponent from '../components/chatting/ChatComponent';
import axios from 'axios';
import Config from 'react-native-config';

const Chatting = (props: ChattingProps) => {
  // 부모가 공유해 준 데이터
  const {otherId, otherName} = props.route.params;
  // 로컬 데이터
  const [chats, setChats] = useState<IChat[]>([]);
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);
  // 훅으로 가져온 데이터
  const [socket] = useSocket();
  const windowHeight = Dimensions.get('window').height;

  // 함수
  const addChat = useCallback(
    (newChat: IChat) => {
      setChats([...chats, newChat]);
    },
    [chats],
  );

  const fetchChats = useCallback(async () => {
    if (!me) {
      return;
    }
    const roomName = me.id;
    const res = await axios.get(
      `${Config.API_URL}/chattings/chats/${roomName}`,
    );
    const {chats} = res.data;
    setChats(chats);
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (me && socket) {
      // 2. 이벤트를 받는다
      socket.on('new-chat-created', data => {
        const {chat} = data;
        addChat(chat);
      });
    }
  }, [addChat, me, socket]);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff', padding: 15}}>
      <View
        style={{
          height: windowHeight - 200,
          backgroundColor: '#ffffff',
        }}>
        <FlatList
          data={chats}
          renderItem={({item}) => <ChatComponent chat={item} />}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View style={{height: 50, backgroundColor: '#ffffff'}}>
        <ChattingSubmitComponent
          otherId={otherId}
          otherName={otherName}
          addChat={addChat}
        />
      </View>
    </View>
  );
};

export default Chatting;
