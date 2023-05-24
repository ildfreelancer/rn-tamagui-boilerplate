import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Config from 'react-native-config';
import {Text, TextInput} from 'react-native';
import {
  setSizeMattersBaseWidth,
  setSizeMattersBaseHeight,
} from '@gocodingnow/rn-size-matters';
import notifee, {EventType} from '@notifee/react-native';
import {Notification} from '@helpers/notifications';

// Setup responsive scale across the devices
setSizeMattersBaseWidth(parseInt(Config.SIZE_MATTERS_BASE_WIDTH, 10));
setSizeMattersBaseHeight(parseInt(Config.SIZE_MATTERS_BASE_HEIGHT, 10));

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

// BUG: this one doesn't work!!
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
    Notification.instance.handleNotificationOnPress(notification);

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
