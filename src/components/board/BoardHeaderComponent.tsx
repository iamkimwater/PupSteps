import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigationsTypes';

const BoardHeaderComponent = () => {
  // 함수
  const navigation = useNavigation<NavigationProps>();

  const GotoAddPost = () => {
    navigation.navigate('AddPost');
  };

  // 리턴
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 40,
        marginLeft: 10,
        marginRight: 10,
      }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000',
          marginTop: 30,
        }}>
        Find Walk Mate :)
      </Text>
      <TouchableOpacity onPress={GotoAddPost}>
        <View
          style={{
            backgroundColor: '#000000',
            height: 70,
            width: 70,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: '#ffffff', textAlign: 'center'}}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoardHeaderComponent;
