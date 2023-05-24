import {ReactNode, createContext} from 'react';

import {useNetworkStatus} from '../hooks/useNetworkStatus';

type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable: boolean | null | undefined;
};

export const NetworkStatusContext = createContext<NetworkStatus | null>(null);

export type NetworkStatusProviderProps = {
  children?: ReactNode;
};
export const NetworkStatusProvider = ({
  children,
}: NetworkStatusProviderProps) => {
  const networkStatus = useNetworkStatus();

  return (
    <NetworkStatusContext.Provider value={networkStatus}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
