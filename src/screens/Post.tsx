import React, {useCallback, useEffect, useState} from 'react';
import {NavigationProps, PostProps, RootState} from '../types/navigationsTypes';
import axios from 'axios';
import {ZCommentInfo, ZCommentsInfo, ZPostInfo} from '../types/zodinfoTypes';
import {ICommentInfo, IPostInfo} from '../types/infoTypes';
import Config from 'react-native-config';
import LoadingComponent from '../components/common/LoadingComponent';
import PostComponent from '../components/post/PostComponent';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CommentComponent from '../components/comment/commentComponent';

const Post = (props: PostProps) => {
  const {postId} = props.route.params;
  const [post, setPost] = useState<IPostInfo | null>();
  const [comments, setComments] = useState<ICommentInfo[]>([]);
  const [commentContent, setCommentContent] = useState<string>();
  const navigation = useNavigation<NavigationProps>();
  const {me} = useSelector((state: RootState) => state.user);

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/posts/${postId}`);
      const {post} = res.data;
      const parsedResult = ZPostInfo.safeParse(post);
      if (parsedResult.success) {
        setPost(post);
      } else {
        console.error(parsedResult.error.message);
      }
    } catch (e) {
      console.error(e);
    }
  }, [postId]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/comments/${postId}`);
      const {comments} = res.data;
      const parsedResult = ZCommentsInfo.safeParse(comments);
      if (parsedResult.success) {
        setComments(comments);
      } else {
        console.error(parsedResult.error.message);
      }
    } catch (e) {
      console.error(e);
    }
  }, [postId]);

  const onChangeCommentContent = (text: string) => {
    setCommentContent(text);
  };

  const submitComment = async () => {
    try {
      const res = await axios.post(`${Config.API_URL}/comments`, {
        commentContent,
      });
      const {comment} = res.data;
      const parsedResult = ZCommentInfo.safeParse(comment);
      if (parsedResult.success) {
        setComments([...comments, comment]);
        setCommentContent(undefined);
      } else {
        console.error(parsedResult.error.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const gotoChatting = () => {
    if (!me || !post) {
      return;
    }
    if (post.postWriter.id === me.id) {
      return;
    }
    navigation.navigate('Chatting', {
      otherId: post.postWriter.id,
      otherName: post.postWriter.userName,
    });
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchComments, fetchPost]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigationBarColor: '#000000',
      headerRight: () => {
        if (post?.postWriter.id !== me?.id) {
          return (
            <MaterialCommunityIcons
              name={'comment'}
              color={'#000000'}
              size={30}
              onPress={gotoChatting}
              style={{marginRight: 10}}
            />
          );
        }
      },
    });
  }, [post]);

  return post ? (
    <FlatList
      style={{flex: 1, padding: 30, backgroundColor: '#ffffff'}}
      ListHeaderComponent={
        <View>
          <View>
            <PostComponent post={post} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TextInput
              placeholder=" 함께 산책 하시려면 댓글을 등록해주세요"
              value={commentContent}
              multiline={true}
              onChangeText={text => onChangeCommentContent(text)}
              style={{
                flex: 1,
                padding: 0,
                fontSize: 15,
                borderStyle: 'dashed',
                borderBottomWidth: 0.7,
                borderColor: '#8c8c8c',
                color: '#000000',
                marginRight: 10,
                marginBottom: 30,
              }}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons
                onPress={submitComment}
                name={'chat-plus-outline'}
                size={32}
                color={'#a9a9a9'}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      ListFooterComponent={<View style={{height: 200}} />}
      data={comments}
      renderItem={({item}) => <CommentComponent comment={item} />}
      keyExtractor={(item, index) => `${index}`}
    />
  ) : (
    <LoadingComponent />
  );
};

export default Post;
