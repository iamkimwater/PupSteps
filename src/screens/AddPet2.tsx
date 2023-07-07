import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import {AddPet2Props, NavigationProps} from '../types/navigationsTypes';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import userSlice from '../redux/reducers/user';
import {useNavigation} from '@react-navigation/native';

const AddPet2 = (props: AddPet2Props) => {
  // 받은 데이터
  const {petName, petAge, petGender, petBreed} = props.route.params;
  // 로컬 데이터
  const [uri, setUri] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData>();
  const windowWidth = Dimensions.get('window').width;

  // 함수
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const takePhoto = async () => {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      if (result.didCancel) {
        return;
      }
      if (result.errorCode === 'camera_unavailable') {
        Alert.alert('카메라를 사용할 수 없습니다.');
        return;
      }
      if (result.errorCode === 'permission') {
        Alert.alert('카메라에 대한 사용 권한이 없습니다.');
        return;
      }
      if (result.errorMessage) {
        Alert.alert('관리자에게 문의하세요.');
        // 센트리: 에러가 나는 부분의 모든 로그를 모아서 센트리 서버로 보내면 개발자가 에러를 보고 앱을 고칠 수 있음
        console.error(result.errorMessage);
        return;
      }
      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setUri(result.assets[0].uri);
        setFormData(makeFormData(result));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const makeFormData = (result: ImagePickerResponse) => {
    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      const formData = new FormData();
      const imageFile = {
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        uri:
          Platform.OS === 'android'
            ? result.assets[0].uri
            : result.assets[0].uri.replace('file://', ''),
      };
      formData.append('image', imageFile);
      return formData;
    }
  };

  const submitPetInfo = () => {
    if (!formData) {
      Alert.alert('펫의 사진을 촬영해주세요.');
      return;
    }
    dispatch(
      userSlice.actions.addPetInfo({
        petName,
        petAge,
        petGender,
        petBreed,
        formData,
      }),
    );
    navigation.navigate('Home');
  };

  // 리턴
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 3, padding: 30}}>
        {uri ? (
          <View>
            <Image
              source={{uri}}
              width={windowWidth - 60}
              height={windowWidth - 60}
            />
            <TouchableOpacity onPress={submitPetInfo}>
              <View
                style={{
                  backgroundColor: '#000000',
                  height: 50,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 50,
                  marginBottom: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: '#ffffff'}}>
                  펫 등록 완료하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              borderStyle: 'dotted',
              borderWidth: 1,
              width: windowWidth - 60,
              height: windowWidth - 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'camera'}
              size={100}
              color={'#424242'}
            />
            <Text style={{fontSize: 16}}>펫의 사진을 찍어주세요.</Text>
          </View>
        )}
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={takePhoto}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#424242',
              width: 70,
              height: 70,
              borderRadius: 100,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddPet2;

// <View>
//     <TouchableOpacity onPress={selectPhoto}>
//         <View>
//             <Text>사진 선택</Text>
//         </View>
//     </TouchableOpacity>
// </View>
