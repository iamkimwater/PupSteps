import axios, {AxiosResponse} from 'axios';
import {UserInfo} from '../types/infoTypes';

const mockDataPath = './src/mocks/mockData.json';

export async function getMockData(): Promise<UserInfo[]> {
  try {
    const response: AxiosResponse<UserInfo[]> = await axios.get(mockDataPath);
    return response.data;
  } catch (error) {
    console.error('데이터를 불러오는 중에 오류가 발생했습니다:', error);
    throw new Error('데이터 불러오기 실패');
  }
}

async function fetchMockData() {
  try {
    const data = await getMockData();
    console.log('데이터:', data);
  } catch (error) {
    console.error('데이터를 불러오는 데 실패했습니다:', error);
  }
}

fetchMockData();