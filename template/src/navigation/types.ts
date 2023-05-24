/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import Routes from '@navigation/routes';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    // rome-ignore lint/suspicious/noEmptyInterface: <explanation>
    interface RootParamList extends RootStackParamList {}
  }
}

type RoutesType<Type> = {
  [Property in keyof Type]: keyof Type;
};

export type AuthStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Profile]: undefined;
};

export type AllRoutesType = RoutesType<RootStackParamList> &
  RoutesType<AuthStackParamList>;

export type RootStackParamList = {
  [Routes.AuthorizedStack]: NavigatorScreenParams<AuthStackParamList>;
  [Routes.Guide]: undefined;
};

// TODO: RootStack type
export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
export type RootNativeStackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;
export type RootNativeStackScreenProps<
  Screen extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type CompositeAllNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<AuthStackParamList>
>;

// // For multiple parent navigators, this secondary type should be nested:
// type CommunityScreenNavigationPropAltMultipleParent = CompositeScreenProps<
//   BottomTabScreenProps<AuthStackParamList, 'Home'>,
//   CompositeScreenProps<
//     NativeStackScreenProps<CommunityScreensStackParamList>,
//     DrawerScreenProps<DrawerParamList> // Nested screen
//   >
// >;
