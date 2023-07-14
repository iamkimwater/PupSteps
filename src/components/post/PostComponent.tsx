import React, {useCallback} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {IPostInfo} from '../../types/infoTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../../types/navigationsTypes';
import LoadingComponent from '../common/LoadingComponent';
import {BREED, GENDER} from '../../types/enums';

const PostComponent = (props: {post: IPostInfo}) => {
  const windowWidth = Dimensions.get('window').width;

  // 부모가 공유해 준 데이터
  const {post} = props;
  const {me} = useSelector((state: RootState) => state.user);

  // 함수
  const getBreed = useCallback(() => {
    if (!me) {
      return null;
    }

    return me.petsInfo[0].petBreed === BREED.JINDO
      ? '진돗개'
      : me.petsInfo[0].petBreed === BREED.BULDOG
      ? '불독'
      : me.petsInfo[0].petBreed === BREED.SHEPHERD
      ? '셰퍼드'
      : '알 수 없음';
  }, [me]);
  // 리턴
  return me ? (
    <View>
      <View>
        <Text
          style={{
            color: '#000000',
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {post.title}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <Image
          source={{uri: post.postWriter.petsInfo[0].petImageUrl}}
          style={{
            width: windowWidth - 90,
            height: windowWidth - 90,
            borderRadius: 300,
          }}
        />
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{fontSize: 15, color: '#777777'}}>
          저는 {me.petsInfo[0].petName} 입니다. ({me.petsInfo[0].petAge}살,{' '}
          {me.petsInfo[0].petGender === GENDER.boy ? 'Boy' : 'Girl'})
        </Text>
        {/*<Text style={{fontSize: 16, color: '#5e5d5d'}}>견종: {getBreed()}</Text>*/}
        <Text style={{fontSize: 15, color: '#777777'}}>
          주 산책구역은 {me.walkInfo.walkArea}입니다. ({me.walkInfo.walkTime})
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 20, color: '#000000'}}>{post.content}</Text>
      </View>
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default PostComponent;
