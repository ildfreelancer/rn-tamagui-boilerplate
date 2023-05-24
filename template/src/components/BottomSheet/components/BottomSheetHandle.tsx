import {BottomSheetHandleProps} from '@gorhom/bottom-sheet';
import {FC} from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';
import {Stack} from '@tamagui/core';
import {ScaledSheet} from '@gocodingnow/rn-size-matters';

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>;
}

export const BottomSheetHandle: FC<HandleProps> = ({style}) => {
  return (
    <View style={[styles.header, style]} renderToHardwareTextureAndroid={true}>
      <Stack style={styles.indicator} bg="$gray10Light" />
    </View>
  );
};

const styles = ScaledSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    height: '30@vs',
    paddingTop: '8@vs',
  },
  indicator: {
    width: '30@s',
    height: '3@vs',
    borderRadius: '46@vs',
  },
});
