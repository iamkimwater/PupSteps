import React from 'react';
import {Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../types/navigationsTypes';
import {IChat} from '../../types/infoTypes';

const ChatComponent = (props: {chat: IChat}) => {
  // 부모에게서 받은 데이터
  const {chat} = props;
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  return me ? (
    me.id === chat.sender.id ? (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 30,
          marginRight: 35,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#000000',
            borderRadius: 15,
            padding: 15,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 30,
            marginRight: 10,
            position: 'relative',
          }}>
          <Image
            source={{uri: me.petsInfo[0].petImageUrl}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              position: 'absolute',
              bottom: -28,
              right: -43,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#ffffff',
              marginLeft: 5,
              marginRight: 5,
            }}>
            {chat.message}
          </Text>
        </View>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 30,
          marginLeft: 35,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#ececec',
            borderRadius: 15,
            padding: 14,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 20,
            marginLeft: 10,
            position: 'relative',
          }}>
          <Image
            source={{uri: me.petsInfo[1].petImageUrl}} // 수정해야 함
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              position: 'absolute',
              bottom: -28,
              left: -43,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#9a9a9a',
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 3,
              marginRight: 3,
            }}>
            {chat.sender.userName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              marginLeft: 5,
              marginRight: 5,
            }}>
            {chat.message}
          </Text>
        </View>
      </View>
    )
  ) : null;
};

export default ChatComponent;
