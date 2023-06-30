import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import mockData from '../mocks/mockData.json';
import {UserInfo, PetInfo, WalkInfo} from '../types/infoTypes';

function PetInfoComponent() {
  const [data, setData] = useState<UserInfo | null>(null);
  const userId = 1; // 유저1 이라고 가정

  useEffect(() => {
    fetchPetInfo();
  }, []);

  const fetchPetInfo = async () => {
    try {
      const userInfo: UserInfo | undefined = mockData.find(
        item => item.userId === userId,
      );
      if (userInfo) {
        setData(userInfo);
      } else {
        console.error('해당 userId의 정보를 찾을 수 없습니다.');
        setData(null);
      }
    } catch (error) {
      console.error('펫 정보를 가져오는 데 실패했습니다.', error);
      setData(null);
    }
  };

  if (!data) {
    return <Text>로딩중입니다.</Text>;
  }

  const {petInfo, walkInfo}: {petInfo: PetInfo; walkInfo: WalkInfo} = data;

  return (
    <View>
      <Text>My Pet</Text>
      <Text>펫 이름: {petInfo.name}</Text>
      <Text>펫 나이: {petInfo.age}</Text>
      <Text>펫 성별: {petInfo.gender}</Text>
      <Text>견종: {petInfo.breed}</Text>
      <Text>
        산책 구역: {walkInfo.area} / 시간: {walkInfo.time}
      </Text>
    </View>
  );
}

export default PetInfoComponent;
