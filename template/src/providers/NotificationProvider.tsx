import {
  createContext,
  ReactNode,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import notifee, {AuthorizationStatus, EventType} from '@notifee/react-native';
import {LOG} from '@helpers/logger';
import {Platform} from 'react-native';
import {Notification} from '@helpers/notifications';
import {useIsForeground} from '@hooks/useIsForeground';

type TNotificationContext = {
  authorizationStatus?: AuthorizationStatus;
  requestNotificationsPermission(): void;
  setAuthorizationStatus(status: any): void;
};
export const NotificationContext = createContext<TNotificationContext>({
  authorizationStatus: undefined,
  requestNotificationsPermission: () => {
    // do nothing
  },
  setAuthorizationStatus: () => {
    // do nothing
  },
});

export const NotificationProvider = ({children}: {children?: ReactNode}) => {
  const [authorizationStatus, setAuthorizationStatus] =
    useState<AuthorizationStatus>();
  const isForeground = useIsForeground();

  useEffect(() => {}, []);

  useEffect(() => {
    // App launched, remove the badge count
    notifee.setBadgeCount(0).then(() => LOG.info('Badge count removed'));
  }, []);

  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          LOG.info('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          LOG.info('User pressed notification', detail.notification);
          Notification.instance.handleNotificationOnPress(detail.notification);
          break;
      }
    });
  }, []);

  useEffect(() => {}, [authorizationStatus]);

  useEffect(() => {
    if (isForeground) {
      notifee.getNotificationSettings().then(settings => {
        if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
          setAuthorizationStatus(settings.authorizationStatus);
          LOG.info('Notification permissions has been authorized');
        } else {
          LOG.info('Notification permissions has been denied');
        }
      });
    }
  }, [isForeground]);

  const requestNotificationsPermission = useCallback(async () => {
    try {
      const settings = await notifee.requestPermission();

      if (Platform.OS === 'android') {
        Notification.instance.createDefaultChannel();
      }

      setAuthorizationStatus(settings.authorizationStatus);
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        return true;
      }
      LOG.info('User declined permissions');
      return false;
    } catch (err) {
      LOG.error(err);
      return false;
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        requestNotificationsPermission,
        authorizationStatus,
        setAuthorizationStatus,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
