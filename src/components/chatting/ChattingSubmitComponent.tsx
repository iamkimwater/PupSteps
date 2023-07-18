import React, {useState} from 'react';
import {Dimensions, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../types/navigationsTypes';
import useSocket from '../../hooks/useSocket';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IChat} from '../../types/infoTypes';

const ChattingSubmitComponent = (props: {
  otherId: number;
  otherName: string;
  addChat: (chat: IChat) => void;
}) => {
  // 부모에게 공유받은 데이터
  const {otherId, otherName, addChat} = props;
  // 로컬 데이터
  const [message, setMessage] = useState<string>();
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);
  // 훅으로 사용하는 데이터
  const windowWidth = Dimensions.get('window').width;
  const [socket] = useSocket();

  const onChangeMessage = (text: string) => {
    setMessage(text);
  };

  const submitMessage = async () => {
    try {
      if (!me || !message || !socket) {
        return;
      }
      // 이벤트를 보낸다
      socket.emit('send-chat', {
        chat: {
          sender: {
            id: me.id,
            userName: me.userName,
          },
          receiver: {
            id: otherId,
            userName: otherName,
          },
          message,
        },
      });
      setMessage(undefined);
      addChat({
        sender: {
          id: me.id,
          userName: me.userName,
        },
        receiver: {
          id: otherId,
          userName: otherName,
        },
        message,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <TextInput
        placeholder="  메시지를 입력해주세요"
        value={message}
        multiline={true}
        onChangeText={text => onChangeMessage(text)}
        style={{
          width: windowWidth - 90,
          height: 45,
          padding: 10,
          fontSize: 16,
          borderRadius: 10,
          borderWidth: 0.7,
          borderColor: '#bebebe',
          color: '#000000',
          marginBottom: 5,
          marginRight: 10,
        }}
      />
      <MaterialCommunityIcons
        name={'send'}
        color={'#ffffff'}
        size={25}
        onPress={submitMessage}
        style={{padding: 7, borderRadius: 50, backgroundColor: '#000000'}}
      />
    </View>
  );
};

export default ChattingSubmitComponent;
