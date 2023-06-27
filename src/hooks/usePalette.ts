import {useColorScheme} from 'react-native';
import {IPalette} from '../types/hooksTypes';

function usePalette(): IPalette {
  if (useColorScheme() === 'light') {
    return {
      THEME: 'LIGHT',
      THEME_COLOR: '#ffffff',
      MAIN_COLOR_1: 'rgba(143,54,239,0.75)',
      MAIN_COLOR_2: '#ff50e0',
      MAIN_COLOR_3: '#ffc531',
      MAIN_COLOR_4: '#331e70',
      MAIN_COLOR_5: '#ff0000',
      GREY_COLOR_1: '#222222',
      GREY_COLOR_2: '#777777',
      GREY_COLOR_3: '#494949',
      INFO_COLOR_1: '#ee2727',
      INFO_COLOR_2: '#3463ff',
    };
  } else {
    return {
      THEME: 'DARK',
      THEME_COLOR: '#ffffff',
      MAIN_COLOR_1: 'rgba(143,54,239,0.75)',
      MAIN_COLOR_2: '#ff50e0',
      MAIN_COLOR_3: '#ffc531',
      MAIN_COLOR_4: '#331e70',
      MAIN_COLOR_5: '#ff0000',
      GREY_COLOR_1: '#222222',
      GREY_COLOR_2: '#777777',
      GREY_COLOR_3: '#494949',
      INFO_COLOR_1: '#ee2727',
      INFO_COLOR_2: '#3463ff',
    };
  }
}

export default usePalette;
