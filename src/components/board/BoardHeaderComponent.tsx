import React from 'react';
import {Button, Text, View} from 'react-native';
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
    <View>
      <Button title="포스팅하기" onPress={GotoAddPost} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 30,
          marginBottom: 50,
        }}>
        나랑 산책 갈 사람!
      </Text>
    </View>
  );
};

export default BoardHeaderComponent;
