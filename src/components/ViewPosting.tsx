import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationProps, ViewPostingProps} from '../types/navigationsTypes';
import {useNavigation} from '@react-navigation/native';

function ViewPosting(props: ViewPostingProps) {
  const navigation = useNavigation<NavigationProps>();
  const {postInfo} = props.route.params;

  const GotoFindWalkmateBoard = () => {
    navigation.navigate('FindWalkmateBoard');
  };

  return (
    <View style={{padding: 30}}>
      <Text style={{fontSize: 30}}>{postInfo.title}</Text>
      <Text style={{fontSize: 20}}>{postInfo.content}</Text>
      <Text>펫 정보: ooo{/* 펫 정보띄워주기 */}</Text>
      <Text>산책 정보: ooo{/* 산책 정보 띄워주기 */}</Text>
      <Button title={'게시판으로 돌아가기'} onPress={GotoFindWalkmateBoard} />
    </View>
  );
}

export default ViewPosting;
