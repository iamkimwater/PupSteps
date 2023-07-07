import React, {useEffect, useState} from 'react';
import {PostProps} from '../types/navigationsTypes';
import axios from 'axios';
import {ZCommentInfo, ZCommentsInfo, ZPostInfo} from '../types/zodinfoTypes';
import {ICommentInfo, IPostInfo} from '../types/infoTypes';
import Config from 'react-native-config';
import LoadingComponent from '../components/common/LoadingComponent';
import PostComponent from '../components/post/PostComponent';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import CommentsComponent from '../components/comment/CommentsComponent';

const Post = (props: PostProps) => {
  const {postId} = props.route.params;
  const [post, setPost] = useState<IPostInfo | null>();
  const [comments, setComments] = useState<ICommentInfo[]>([]);
  const [commentContent, setCommentContent] = useState<string>();

  const fetchPost = async () => {
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
  };

  const fetchComments = async () => {
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
  };

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

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  return post ? (
    <View style={{padding: 30}}>
      <PostComponent post={post} />
      <TextInput
        placeholder="댓글을 입력해주세요."
        value={commentContent}
        multiline={true}
        onChangeText={text => onChangeCommentContent(text)}
        style={{
          padding: 10,
          fontSize: 16,
          borderStyle: 'solid',
          borderWidth: 0.5,
          borderColor: '#b9b9b9',
          borderRadius: 6,
          color: '#6e6e6e',
          marginTop: 30,
        }}
      />
      <TouchableOpacity onPress={submitComment}>
        <View
          style={{
            backgroundColor: '#a4a4a4',
            height: 30,
            marginTop: 10,
            marginBottom: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#ffffff'}}>댓글 등록</Text>
        </View>
      </TouchableOpacity>
      <CommentsComponent comments={comments} />
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default Post;
