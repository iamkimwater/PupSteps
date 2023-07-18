import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {IRoom} from '../types/infoTypes';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types/navigationsTypes';

const Chattings = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const fetchChattings = async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/chattings/rooms`);
      const {rooms} = res.data;
      setRooms(rooms);
    } catch (e) {
      console.error(e);
    }
  };

  const gotoChattingRoom = (otherId: number, otherUserName: string) => {
    navigation.navigate('Chatting', {
      otherId: otherId,
      otherName: otherUserName,
    });
  };

  useEffect(() => {
    fetchChattings();
  }, []);

  return (
    <FlatList
      style={{backgroundColor: '#ffffff'}}
      data={rooms}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              gotoChattingRoom(item.other.id, item.other.userName)
            }>
            <View style={{height: 50, margin: 10}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                {item.other.userName}와 대화중...
              </Text>
              <Text style={{fontSize: 14, color: '#4f4f4f'}}>
                {item.lastMessage}
              </Text>
            </View>
            <View style={{height: 0.7, backgroundColor: '#b4b4b4'}} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
export default Chattings;
