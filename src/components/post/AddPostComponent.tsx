import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {ZFeedback} from '../../types/zodinfoTypes';
import {useNavigation} from '@react-navigation/native';

const AddPostComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigation = useNavigation();

  const writeContent = (text: string) => {
    if (text.length > 50) {
      Alert.alert('글자수는 50자를 초과할 수 없습니다.');
      return;
    }
    setContent(text);
  };

  const submitPost = async () => {
    try {
      const parsedTitle = title.trim();
      const parsedContent = content.trim();
      const res = await axios.post(`${Config.API_URL}/posts/`, {
        parsedTitle,
        parsedContent,
      });
      const {feedback} = res.data;
      const parsedResult = ZFeedback.safeParse(feedback);
      if (parsedResult.success) {
        if (parsedResult.data.result) {
          Alert.alert('게시글이 등록되었습니다.', '게시글 등록 완료', [
            {
              text: '확인',
              onPress: () => {
                navigation.goBack();
              },
              style: 'default',
            },
          ]);
        } else {
          Alert.alert('게시글 등록에 실패하였습니다.');
        }
      } else {
        console.error(parsedResult.error.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TextInput
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
          style={{
            padding: 14,
            fontSize: 16,
            borderStyle: 'solid',
            borderBottomWidth: 0.5,
            borderColor: '#969696',
            borderRadius: 5,
            color: '#6e6e6e',
          }}
        />
      </View>
      <View style={{flex: 8}}>
        <TextInput
          placeholder="내용"
          value={content}
          onChangeText={text => writeContent(text)}
          multiline={true}
          style={{
            padding: 14,
            fontSize: 16,
            borderStyle: 'solid',
            borderBottomWidth: 0.5,
            borderColor: '#969696',
            borderRadius: 5,
            color: '#6e6e6e',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={submitPost}>
          <View
            style={{
              backgroundColor: '#dadada',
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#5d5d5d', fontSize: 16, textAlign: 'center'}}>
              게시글 등록하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPostComponent;
