import notifee, {
  AndroidImportance,
  Notification as INotification,
  NotificationAndroid,
  NotificationIOS,
} from '@notifee/react-native';
import RootNavigation from '@navigation/utilities';
import Routes from '@navigation/routes';

export class Notification {
  private static _instance: Notification;
  private notifications: any[];
  private defaultChannelId: string;

  constructor() {
    this.notifications = [];
    this.defaultChannelId = 'default';
  }

  public static get instance(): Notification {
    if (!Notification._instance) {
      Notification._instance = new Notification();
    }

    return Notification._instance;
  }

  add(notification: any) {
    this.notifications.push(notification);
  }

  shift() {
    return this.notifications.shift();
  }

  async createDefaultChannel() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Relook Channel',
      importance: AndroidImportance.HIGH,
    });
    this.defaultChannelId = channelId;
  }

  async displayRemoteNotification(message: any) {
    const data = {};
    const ios: NotificationIOS = {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
      },
    };
    const android: NotificationAndroid = {
      channelId: this.defaultChannelId,
      pressAction: {
        id: 'default',
      },
    };
    if (message.data) {
      for (const [key, value] of Object.entries(message.data)) {
        if (key === 'fcm_options') {
          ios.attachments = [{url: (value as any).image}];
        }
        if (key === 'notification') {
          android.largeIcon = (value as any).imageUrl;
        }
        data[key] = JSON.stringify(value);
      }
    }
    const notification: INotification = {
      ...message.notification,
      data,
      ios,
      android,
    };
    await notifee.displayNotification(notification);
    await notifee.incrementBadgeCount();
  }

  async handleNotificationOnPress(notification?: any | null) {
    const data = notification?.data;
    let message;
    const {payload} = data || {};
    try {
      message = payload ? JSON.parse(payload) : null;
      if (typeof message !== 'object') {
        message = JSON.parse(message);
      }
    } catch (err) {
      message = {};
    }

    // const currentRouteName = RootNavigation.getCurrentRouteName();
    if (message?.notification_type === 'review') {
      //  message.notification_data?.id;
    } else {
      RootNavigation.navigateAndReset([{name: Routes.AuthorizedStack}], 0);
    }

    await notifee.decrementBadgeCount();
  }
}
