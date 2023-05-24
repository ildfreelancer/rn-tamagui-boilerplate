import NetInfo from '@react-native-community/netinfo';
import {useEffect, useMemo, useState} from 'react';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null | undefined
  >(undefined);

  useEffect(() => {
    return NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected != null && state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
  }, []);

  return useMemo(
    () => ({isConnected, isInternetReachable}),
    [isConnected, isInternetReachable],
  );
}
