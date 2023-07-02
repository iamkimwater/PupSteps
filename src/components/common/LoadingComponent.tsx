import {ActivityIndicator, View} from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={30} color={'#000000'} />
    </View>
  );
};

export default LoadingComponent;
