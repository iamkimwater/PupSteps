import {FlatList} from 'react-native';
import {ICommentInfo} from '../../types/infoTypes';
import CommentComponent from './commentComponent';

const CommentsComponent = (props: {comments: ICommentInfo[]}) => {
  const {comments} = props;

  return (
    <FlatList
      data={comments}
      renderItem={({item}) => <CommentComponent comment={item} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

export default CommentsComponent;
