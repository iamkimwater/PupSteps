import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IPostInfo} from '../../types/infoTypes';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigationsTypes';

const PrePostComponent = (props: {post: IPostInfo}) => {
  // 부모가 준 데이터
  const {post} = props;
  const windowWidth = Dimensions.get('window').width;

  // 함수
  const navigation = useNavigation<NavigationProps>();

  const GotoViewPostingComponent = (postInfo: IPostInfo) => {
    navigation.navigate('Post', {postId: postInfo.id});
  };

  // 리턴
  return (
    <TouchableOpacity onPress={() => GotoViewPostingComponent(post)}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <View style={{flex: 3}}>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>
          <Text>{post.createdAt}</Text>
          <Text>{post.postWriter.userName}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={{uri: post.postWriter.petInfo.petImageUrl}}
            width={(windowWidth - 40) / 4}
            height={(windowWidth - 40) / 4}
            style={{borderRadius: 50}}
          />
          <Text style={{fontSize: 16}}>{post.postWriter.petInfo.petName}</Text>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: '#b9b9b9'}} />
    </TouchableOpacity>
  );
};

export default PrePostComponent;
