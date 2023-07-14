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
    <View style={{borderBottomWidth: 0.2, borderBottomColor: '#b9b9b9'}}>
      <TouchableOpacity onPress={() => GotoViewPostingComponent(post)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <View style={{flex: 3}}>
            <View>
              <Text style={{fontSize: 20, color: '#000000', marginTop: 5}}>
                {post.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#919191',
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                {post.content}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#b9b9b9',
                  marginTop: 15,
                }}>
                {post.createdAt} {post.postWriter.petsInfo[0].petName}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={{uri: post.postWriter.petsInfo[0].petImageUrl}}
              width={(windowWidth - 40) / 4}
              height={(windowWidth - 40) / 4}
              style={{borderRadius: 50}}
            />
          </View>
        </View>
        {/*<View style={{height: 0.5, backgroundColor: '#b9b9b9'}} />*/}
      </TouchableOpacity>
    </View>
  );
};

export default PrePostComponent;
