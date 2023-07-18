import {io, Socket} from 'socket.io-client';
import Config from 'react-native-config';

// 전역 데이터
let socket: Socket | null = null;

// 오염된 함수
const useSocket = (): [Socket | null, () => Socket, () => void] => {
  const connect = () => {
    if (!socket) {
      socket = io(`${Config.API_URL}/chatting`, {
        transports: ['websocket'],
      });
    }
    return socket;
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };

  return [socket, connect, disconnect];
};

export default useSocket;
