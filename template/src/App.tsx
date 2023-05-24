import {toastConfig} from '@components/Toast';
import {storage} from '@helpers/mmkv';
import useAppState from '@hooks/useAppState';
import {useOnlineManager} from '@hooks/useOnlineManager';
import {setI18nConfig} from '@i18n/setup';
import {RootNavigator} from '@navigation/navigators/RootNavigator';
import {initPersistor} from '@services/react-query/init-persistor';
import {queryClient} from '@services/react-query/query-client';
import {focusManager} from '@tanstack/react-query';
import {AppStateStatus, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message';
import {AppProvider} from 'src/AppProvider';

enableScreens();
setI18nConfig();

// inti api service

// Load React Query cache from the async storage
initPersistor(queryClient);

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
  import('react-native-mmkv-flipper-plugin').then(({initializeMMKVFlipper}) => {
    initializeMMKVFlipper({default: storage});
  });
}

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

const App = () => {
  useAppState({
    onChange: (status: AppStateStatus) => {
      onAppStateChange(status);
    },
  });
  useOnlineManager();

  return (
    <AppProvider>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <RootNavigator />
      <Toast config={toastConfig} />
    </AppProvider>
  );
};

export default App;
