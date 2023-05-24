import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from '@tanstack/react-query';
import {Platform} from 'react-native';
import {useEffect} from 'react';

export function useOnlineManager() {
  useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      const unsubscribe = NetInfo.addEventListener(state => {
        onlineManager.setOnline(
          state.isConnected !== null &&
            state.isConnected &&
            Boolean(state.isInternetReachable),
        );
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);
}
