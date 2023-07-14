import React from 'react';
import {ICommentInfo} from '../../types/infoTypes';
import {Text, View} from 'react-native';

const CommentComponent = (props: {comment: ICommentInfo}) => {
  const {comment} = props;
  return (
    <View>
      <Text>
        [{comment.commentWriter.userName}] {comment.commentContent}
      </Text>
    </View>
  );
};

export default CommentComponent;
