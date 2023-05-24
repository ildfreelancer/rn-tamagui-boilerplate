import Routes from '@navigation/routes';
import {AuthStackParamList} from '@navigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator<AuthStackParamList>();

const renderTabIcon =
  (route: RouteProp<AuthStackParamList, keyof AuthStackParamList>) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    let iconName;

    if (route.name === Routes.Home) {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === Routes.Profile) {
      iconName = focused ? 'person' : 'person-outline';
    }
    // You can return any component that you like here!
    return <Ionicons name={iconName as any} size={size} color={color} />;
  };

const AuthorizedNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: renderTabIcon(route),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <BottomTab.Screen
        name={Routes.Home}
        options={{
          tabBarLabel: 'Home',
        }}
        component={require('@screens/HomeScreen').default}
      />
      <BottomTab.Screen
        name={Routes.Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
        component={require('@screens/ProfileScreen').default}
      />
    </BottomTab.Navigator>
  );
};

export default AuthorizedNavigator;
