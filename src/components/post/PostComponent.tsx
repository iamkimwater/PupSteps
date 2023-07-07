import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {IPostInfo} from '../../types/infoTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../../types/navigationsTypes';
import LoadingComponent from '../common/LoadingComponent';
import {BREED, GENDER} from '../../types/enums';

const PostComponent = (props: {post: IPostInfo}) => {
  // 부모가 공유해 준 데이터
  const {post} = props;
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
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
      <Text style={{fontSize: 30}}>{post.title}</Text>
      <Text style={{fontSize: 20}}>{post.content}</Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        이름: {me.petInfo.petName}
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        나이: {me.petInfo.petAge}살
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        성별: {me.petInfo.petGender === GENDER.boy ? '수컷' : '암컷'}
      </Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>견종: {getBreed()}</Text>
      <Text style={{fontSize: 16, color: '#5e5d5d'}}>
        산책 구역: {me.walkInfo.walkArea} / 시간: {me.walkInfo.walkTime}
      </Text>
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default PostComponent;
