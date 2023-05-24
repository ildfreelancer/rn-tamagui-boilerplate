import {vs} from '@gocodingnow/rn-size-matters';
import Toast, {ToastPosition} from 'react-native-toast-message';
import i18n from 'i18next';

type ToastOption = {
  type: 'success' | 'warning' | 'error';
  position?: ToastPosition;
  text1?: string;
  text2?: string;
  titleTx?: string;
  messageTx?: string;
  title?: string;
  message?: string;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  props?: Record<string, string | number>;
  titleTxOptions?: Record<string, string | number>;
  messageTxOptions?: Record<string, string | number>;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
};
export function show(config: ToastOption) {
  Toast.show({
    text1:
      config.title ??
      (config.titleTx
        ? i18n.t(config.titleTx, config.titleTxOptions)
        : undefined),
    text2:
      config.message ??
      (config.messageTx
        ? i18n.t(config.messageTx, config.messageTxOptions)
        : undefined),
    visibilityTime: 3000,
    autoHide: true,
    topOffset: vs(48),
    ...config,
  });
}

export const toast = {
  show,
};
