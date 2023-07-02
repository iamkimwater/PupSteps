import {Image, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../types/navigationsTypes';
import LoadingComponent from './common/LoadingComponent';

const PetInfoComponent = () => {
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 함수

  // 리턴
  return me ? (
    <View>
      <Image source={{uri: me.petInfo.petImageUrl}} width={100} height={100} />
      <Text>펫 이름: {me.petInfo.petName}</Text>
      <Text>펫 나이: {me.petInfo.petAge}</Text>
      <Text>펫 성별: {me.petInfo.petGender}</Text>
      <Text>견종: {me.petInfo.petBreed}</Text>
      <Text>
        산책 구역: {me.walkInfo.walkArea} / 시간: {me.walkInfo.walkTime}
      </Text>
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default PetInfoComponent;
