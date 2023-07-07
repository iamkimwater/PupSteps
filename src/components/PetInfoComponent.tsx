import {Dimensions, Image, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../types/navigationsTypes';
import LoadingComponent from './common/LoadingComponent';
import {BREED, GENDER} from '../types/enums';

const PetInfoComponent = () => {
  // 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);
  const windowWidth = Dimensions.get('window').width;

  // 계산된 데이터
  const calculatedBreed = useMemo(() => {
    if (!me) {
      return null;
    }

    return me.petInfo.petBreed === BREED.JINDO
      ? '진돗개'
      : me.petInfo.petBreed === BREED.BULDOG
      ? '불독'
      : me.petInfo.petBreed === BREED.SHEPHERD
      ? '셰퍼드'
      : '알 수 없음';
  }, [me]);

  // 값을 계산해서 리턴 해주는 함수
  const getBreed = useCallback(() => {
    if (!me) {
      return null;
    }

    return me.petInfo.petBreed === BREED.JINDO
      ? '진돗개'
      : me.petInfo.petBreed === BREED.BULDOG
      ? '불독'
      : me.petInfo.petBreed === BREED.SHEPHERD
      ? '셰퍼드'
      : '알 수 없음';
  }, [me]);

  // 리턴
  return me ? (
    <View>
      <Image
        source={{uri: me.petInfo.petImageUrl}}
        style={{
          width: windowWidth - 50,
          height: windowWidth - 50,
          borderRadius: 10,
        }}
      />
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        이름: {me.petInfo.petName}
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        나이: {me.petInfo.petAge}살
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        성별: {me.petInfo.petGender === GENDER.boy ? '수컷' : '암컷'}
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>견종:{getBreed()}</Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        산책 구역: {me.walkInfo.walkArea} / 시간: {me.walkInfo.walkTime}
      </Text>
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default PetInfoComponent;
