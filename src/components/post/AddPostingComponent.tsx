import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

function AddPostingComponent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View>
      <TextInput placeholder="제목" value={title} onChangeText={setTitle} />
      <TextInput placeholder="내용" value={content} onChangeText={setContent} />
      <Button title="게시글 등록하기" />
    </View>
  );
}

export default AddPostingComponent;
