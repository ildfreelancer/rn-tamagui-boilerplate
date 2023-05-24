import Routes from '@navigation/routes';
import {RootStackParamList} from '@navigation/types';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.AuthorizedStack}
        component={require('./AuthorizedNavigator').default}
      />
      <Stack.Screen
        name={Routes.Guide}
        component={require('@screens/GuideScreen').default}
      />
    </Stack.Navigator>
  );
};

const exitRoutes = [Routes.AuthorizedStack];
export const canExit = (routeName: string) =>
  exitRoutes.includes(routeName as any);
