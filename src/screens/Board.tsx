import {RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IPostInfo} from '../types/infoTypes';
import {FlatList} from 'react-native';
import BoardHeaderComponent from '../components/board/BoardHeaderComponent';
import PrePostComponent from '../components/post/PrePostComponent';
import axios from 'axios';
import Config from 'react-native-config';
import {ZPostsInfo} from '../types/zodinfoTypes';

const Board = () => {
  // 로컬 데이터
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPostInfo[]>([]);

  // 함수
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/posts`);
      const {posts} = res.data;
      const parsedResult = ZPostsInfo.safeParse(posts);
      if (parsedResult.success) {
        setPosts(parsedResult.data);
      } else {
        console.error(parsedResult.error.message);
      }
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchPosts();
      setRefreshing(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <FlatList
      style={{padding: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={posts}
      renderItem={({item}) => <PrePostComponent post={item} />}
      keyExtractor={(item, index) => `${index}`}
      ListHeaderComponent={<BoardHeaderComponent />}
    />
  );
};

export default Board;
