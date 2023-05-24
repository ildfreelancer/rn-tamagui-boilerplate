import {ReactNode, useRef, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@navigation/utilities';

export const NavigationProvider = ({children}: {children?: ReactNode}) => {
  const routeNameRef = useRef<string>();
  const [_, setNavigationReady] = useState(false);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}
      onReady={() => {
        setNavigationReady(true);
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute?.()?.name;

        if (previousRouteName !== currentRouteName && currentRouteName) {
          // TODO: add analytics here
        }
        routeNameRef.current = currentRouteName;
      }}
      ref={navigationRef}>
      {children}
    </NavigationContainer>
  );
};
