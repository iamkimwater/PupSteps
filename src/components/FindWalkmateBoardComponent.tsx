import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {
  FindWalkmateBoardProps,
  NavigationProps,
} from '../types/navigationsTypes';
import {useNavigation} from '@react-navigation/native';
import {IPostInfo} from '../types/infoTypes';
import mockData from '../mocks/mockData.json';

function FindWalkmateBoardComponent(props: FindWalkmateBoardProps) {
  const navigation = useNavigation<NavigationProps>();
  const [posts, setPosts] = useState<IPostInfo[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setPosts(mockData.map(item => item.postInfo));
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  const GotoAddPosting = () => {
    navigation.navigate('AddPosting');
  };

  const GotoViewPosting = (postInfo: IPostInfo) => {
    navigation.navigate('ViewPosting', {postInfo});
  };

  return (
    <View style={{padding: 30}}>
      <Button title="포스팅하기" onPress={GotoAddPosting} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 30,
          marginBottom: 50,
        }}>
        나랑 산책 갈 사람!
      </Text>
      {posts.map(postInfo => (
        <View key={postInfo.postId} style={{marginBottom: 10}}>
          <Text>산책정보라벨{/* 산책정보라벨 */}</Text>
          <Button
            title={postInfo.title}
            onPress={() => GotoViewPosting(postInfo)}
          />
        </View>
      ))}
    </View>
  );
}

export default FindWalkmateBoardComponent;
