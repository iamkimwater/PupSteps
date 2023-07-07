import React from 'react';
import AddPostComponent from '../components/post/AddPostComponent';
import {View} from 'react-native';

const AddPost = () => {
  return (
    <View style={{flex: 1, padding: 20}}>
      <AddPostComponent />
    </View>
  );
};

export default AddPost;
