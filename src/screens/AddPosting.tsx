import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AddPostingProps, NavigationProps} from '../types/navigationsTypes';
import {useNavigation} from '@react-navigation/native';

function AddPosting(props: AddPostingProps) {
  const navigation = useNavigation<NavigationProps>();

  const GotoFindWalkmateBoard = () => {
    navigation.navigate('FindWalkmateBoard');
  };

  return (
    <View>
      <Text>포스팅하기</Text>
      <Button title={'포스팅완료'} onPress={GotoFindWalkmateBoard} />
    </View>
  );
}

// const styles = StyleSheet.create();

export default AddPosting;

// 포스팅 완료하면 postingId 생성
