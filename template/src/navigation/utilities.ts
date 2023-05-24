import Routes from '@navigation/routes';
import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (
  name: keyof RootStackParamList,
  params?: any,
  key?: string,
) => {
  if (navigationRef.current?.isReady()) {
    if (key) {
      navigationRef.current?.navigate({key, name, params});
      return;
    }
    navigationRef.current?.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  } else {
    navigateAndReset([{name: Routes.AuthStack}], 0);
  }
};

export const navigateAndReset = (
  routes: {name: string; params?: any}[],
  index: number,
) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
};

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
}

export function getCurrentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}

export const push = (name: string, params?: any) => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

export const replace = (name: string, params?: any) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

export const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

export const pop = (count?: number) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

const defaultExport = {
  navigate,
  push,
  replace,
  pop,
  popToTop,
  navigationRef,
  navigateAndSimpleReset,
  navigateAndReset,
  getCurrentRouteName,
};

export default defaultExport;
