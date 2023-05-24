import {QueryClient} from '@tanstack/react-query';
import DeviceInfo from 'react-native-device-info';
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {asyncStorage} from '@helpers/mmkv';

const asyncStoragePersistor = createAsyncStoragePersister({
  storage: asyncStorage,
});

export function initPersistor(queryClient: QueryClient) {
  persistQueryClient({
    queryClient,
    persister: asyncStoragePersistor,
    buster: DeviceInfo.getVersion(),
  });
}
