import config from '../tamagui.config';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {combineProviders} from '@helpers/combine-providers';
import {NavigationProvider} from '@providers/NavigationProvider';
import {NetworkStatusProvider} from '@providers/NetworkStatusProvider';
import {NotificationProvider} from '@providers/NotificationProvider';
import {queryClient} from '@services/react-query/query-client';
import {TamaguiProvider} from '@tamagui/core';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactNode, Suspense} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Providers with preset props
const ROOT_VIEW = {flex: 1};
const GestureHandlerProvider = (props: {children?: ReactNode}) => (
  <GestureHandlerRootView style={ROOT_VIEW} {...props} />
);

const RTQueryClientProvider = (props: {children?: ReactNode}) => (
  <QueryClientProvider client={queryClient} {...props} />
);

const ThemeProvider = (props: {children?: ReactNode}) => (
  <TamaguiProvider config={config} {...props} />
);

export const AppProvider = ({children}: {children?: ReactNode}) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      GestureHandlerProvider,
      SafeAreaProvider,
      ThemeProvider,
      Suspense,
      RTQueryClientProvider,
      NetworkStatusProvider,
      NavigationProvider,
      NotificationProvider,
      BottomSheetModalProvider,
    ],
    children,
  );
