import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BREED, GENDER} from '../types/enums';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types/navigationsTypes';

const AddPet1 = () => {
  const navigation = useNavigation<NavigationProps>();
  const [petName, setPetName] = useState<string>();
  const [petAge, setPetAge] = useState<string>();
  const [petGender, setPetGender] = useState<GENDER>(GENDER.boy);
  const [petBreed, setPetBreed] = useState<BREED>(BREED.JINDO);
  // const [walkArea, setWalkArea] = useState<string>();
  // const [walkTime, setWalkTime] = useState<string>();

  const onChangePetName = (text: string) => {
    setPetName(text);
  };

  const onChangePetAge = (text: string) => {
    setPetAge(text);
  };

  const onChangePetGender = (text: GENDER) => {
    setPetGender(text);
  };

  const onChangePetBreed = (text: BREED) => {
    setPetBreed(text);
  };

  // const onChangeWalkArea = (text: string) => {
  //   setWalkArea(text);
  // };
  //
  // const onChangeWalkTime = (text: string) => {
  //   setWalkTime(text);
  // };

  const gotoAddPet2 = () => {
    if (!petName || !petAge) {
      Alert.alert('펫 정보 미입력', '펫의 이름과 나이를 입력해주세요.');
      return;
    }
    navigation.navigate('AddPet2', {
      petName,
      petAge: parseInt(petAge),
      petGender,
      petBreed,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        backgroundColor: '#ffffff',
      }}>
      <Text
        style={{
          fontSize: 30,
          color: '#000000',
          marginBottom: 20,
          fontWeight: 'bold',
        }}>
        마이펫 등록하기
      </Text>
      <TextInput
        placeholder="펫의 이름을 적어주세요."
        value={petName}
        onChangeText={text => onChangePetName(text)}
        style={{
          padding: 20,
          fontSize: 16,
          borderStyle: 'solid',
          borderWidth: 0.5,
          borderColor: '#b9b9b9',
          borderRadius: 6,
          color: '#6e6e6e',
          marginBottom: 7,
        }}
      />
      <TextInput
        placeholder="펫의 나이를 알려주세요."
        value={petAge}
        onChangeText={text => onChangePetAge(text)}
        keyboardType={'numeric'}
        style={{
          padding: 20,
          fontSize: 16,
          borderStyle: 'solid',
          borderWidth: 0.5,
          borderColor: '#b9b9b9',
          borderRadius: 6,
          color: '#6e6e6e',
          marginBottom: 7,
        }}
      />
      <Picker
        selectedValue={petGender}
        onValueChange={itemValue => onChangePetGender(itemValue)}>
        <Picker.Item label="수컷" value={GENDER.boy} />
        <Picker.Item label="암컷" value={GENDER.girl} />
      </Picker>
      <Picker
        selectedValue={petBreed}
        onValueChange={itemValue => onChangePetBreed(itemValue)}>
        <Picker.Item label="진돗개" value={BREED.JINDO} />
        <Picker.Item label="불독" value={BREED.BULDOG} />
        <Picker.Item label="셰퍼드" value={BREED.SHEPHERD} />
      </Picker>
      {/*  <TextInput*/}
      {/*    placeholder="산책 구역을 적어주세요."*/}
      {/*    value={walkArea}*/}
      {/*    onChangeText={text => onChangeWalkArea(text)}*/}
      {/*    style={{*/}
      {/*      padding: 20,*/}
      {/*      fontSize: 16,*/}
      {/*      borderStyle: 'solid',*/}
      {/*      borderWidth: 0.5,*/}
      {/*      borderColor: '#b9b9b9',*/}
      {/*      borderRadius: 6,*/}
      {/*      color: '#6e6e6e',*/}
      {/*      marginBottom: 7,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <TextInput*/}
      {/*    placeholder="산책 시간을 적어주세요."*/}
      {/*    value={walkTime}*/}
      {/*    onChangeText={text => onChangeWalkTime(text)}*/}
      {/*    style={{*/}
      {/*      padding: 20,*/}
      {/*      fontSize: 16,*/}
      {/*      borderStyle: 'solid',*/}
      {/*      borderWidth: 0.5,*/}
      {/*      borderColor: '#b9b9b9',*/}
      {/*      borderRadius: 6,*/}
      {/*      color: '#6e6e6e',*/}
      {/*      marginBottom: 7,*/}
      {/*    }}*/}
      {/*  />*/}
      <TouchableOpacity onPress={gotoAddPet2}>
        <View
          style={{
            backgroundColor: '#000000',
            height: 50,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 20,
            marginBottom: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#ffffff'}}>펫 사진 찍기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet1;
