import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  FindWalkmateBoardProps,
  NavigationProps,
} from '../types/navigationsTypes';
import {useNavigation} from '@react-navigation/native';

function FindWalkmateBoard(props: FindWalkmateBoardProps) {
  const navigation = useNavigation<NavigationProps>();

  const GotoAddPosting = () => {
    navigation.navigate('AddPosting');
  };

  const GotoViewPosting = () => {
    navigation.navigate('ViewPosting');
  };

  return (
    <View>
      <Text style={{fontSize: 30}}>나랑산책갈사람찾아요</Text>
      <Button title={'포스팅하기'} onPress={GotoAddPosting} />
      <Button title={'야탑에서산책해요게시물'} onPress={GotoViewPosting} />
    </View>
  );
}

// const styles = StyleSheet.create();

export default FindWalkmateBoard;
