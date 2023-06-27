import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationProps, ViewPostingProps} from '../types/navigationsTypes';
import {useNavigation} from '@react-navigation/native';

function ViewPosting(props: ViewPostingProps) {
  const navigation = useNavigation<NavigationProps>();

  const GotoFindWalkmateBoard = () => {
    navigation.navigate('FindWalkmateBoard');
  };

  return (
    <View>
      <Text>야탑에서산책해요게시물</Text>
      <Button title={'게시판 돌아가기'} onPress={GotoFindWalkmateBoard} />
    </View>
  );
}

// const styles = StyleSheet.create();

export default ViewPosting;

// if 포스팅 한 사람이 나라면
// 내 게시물 보여주기
// 나 아니면
// 다른 게시물 보여주기

// 게시물에 postingId 부여
// FindWalkmateBoard 와 postingId 주고받기
