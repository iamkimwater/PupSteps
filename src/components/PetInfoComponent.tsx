import React, {useRef, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import FlipCard from 'react-native-flip-card';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {GENDER} from '../types/enums';
import {PetInfoComponentProps, RootState} from '../types/navigationsTypes';
import {IPetInfo} from '../types/infoTypes';
import LoadingComponent from './common/LoadingComponent';
import usePalette from '../hooks/usePalette';

const PetInfoComponent = (props: PetInfoComponentProps) => {
  // 변하지 않는 데이터
  const windowWidth = Dimensions.get('window').width;
  const flipCardWidth = windowWidth - 100;
  const flipCardHeight = flipCardWidth;
  const gap = 30;
  const offset = 30;
  const {THEME_COLOR} = usePalette();

  // 변하는 글로벌 데이터
  const {me} = useSelector((state: RootState) => state.user);

  // 변하는 로컬 데이터
  const [flipped, setFlipped] = useState(false);

  const flipRefs = useRef([]);

  const onScroll = e => {
    flipRefs.current.forEach(ref => ref.flip(false));
  };

  return me ? (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: THEME_COLOR}}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        decelerationRate="fast"
        horizontal
        onScroll={onScroll}
        pagingEnabled
        snapToInterval={windowWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}>
        {me.petsInfo.map((item: IPetInfo, index) => (
          <View
            key={`page__${item.petName}`}
            style={{marginLeft: 10, marginRight: 10}}>
            <FlipCard
              style={{borderWidth: 0}}
              friction={6}
              perspective={1000}
              flipHorizontal={false}
              flipVertical={true}
              // ref={ref => (flipRefs.current[index] = ref)}
              // onClick={() => {
              //   setFlipped(!flipped);
              // }}
            >
              <View>
                <Image
                  source={{uri: item.petImageUrl}}
                  style={{
                    width: flipCardWidth,
                    height: flipCardHeight,
                    borderRadius: 300,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 22,
                    right: 22,
                    backgroundColor: '#d00000',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 25}}>1</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: flipCardWidth,
                  height: flipCardHeight,
                  borderRadius: 300,
                  backgroundColor: '#f3f3f3',
                  padding: 10,
                }}>
                <Text style={{fontSize: 40, color: '#000000'}}>
                  {item.petName}
                </Text>
                <Text style={{fontSize: 18, color: '#000000'}}>
                  {item.petAge}살{' '}
                  {item.petGender === GENDER.boy ? 'Boy' : 'Girl'}
                </Text>
                <Text style={{fontSize: 16, color: '#000000', marginTop: 15}}>
                  {me.walkInfo.walkArea} / {me.walkInfo.walkTime}
                </Text>
              </View>
            </FlipCard>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  ) : (
    <LoadingComponent />
  );
};

export default PetInfoComponent;
