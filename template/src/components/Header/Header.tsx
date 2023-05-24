import {Icon, IconProps} from '@components/Icon';
import {Text, TextProps} from '@components/Text';
import {useNavigation} from '@react-navigation/native';
import {StackProps} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import {ReactNode} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
  title?: string;
  titleTx?: string;
  titleTxOptions?: Record<string, string | number>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  iconLeft?: string | boolean;
  iconRight?: string | boolean;
  _left?: ViewStyle;
  _iconLeft?: IconProps;
  _iconRight?: IconProps;
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
  _title?: TextProps;
  safeAreaTop?: boolean;
  _header?: StackProps;
};
export const Header = ({
  iconLeft = 'chevron-left',
  iconRight,
  title,
  titleTx,
  titleTxOptions,
  onLeftPress,
  onRightPress,
  leftComponent,
  centerComponent,
  rightComponent,
  _left,
  _iconLeft,
  _iconRight,
  _title,
  _header,
  safeAreaTop = false,
}: HeaderProps) => {
  const navigation = useNavigation();
  const areaInsets = useSafeAreaInsets();
  return (
    <XStack
      mt={safeAreaTop ? areaInsets.top : 0}
      px="$s-4.5"
      py="$vs-2"
      jc="space-between"
      ai="center"
      w="100%"
      {..._header}>
      <Pressable
        onPress={onLeftPress || navigation.goBack}
        style={[styles.leftButton, _left]}>
        {leftComponent
          ? leftComponent
          : !!iconLeft && (
              <Icon
                name={iconLeft}
                type="MaterialIcons"
                size="$s-6"
                {..._iconLeft}
              />
            )}
      </Pressable>
      <XStack fw="wrap" jc="center" flex={1} mx="$s-3">
        {centerComponent ? (
          centerComponent
        ) : (
          <Text
            ta="center"
            tt="capitalize"
            fow="$600"
            text={title}
            tx={titleTx}
            fos="$base"
            numberOfLines={1}
            txOptions={titleTxOptions}
            {..._title}
          />
        )}
      </XStack>

      <Pressable onPress={onRightPress} style={styles.rightButton}>
        {rightComponent
          ? rightComponent
          : !!iconRight && (
              <Icon name={iconRight as string} size="$s-6" {..._iconRight} />
            )}
      </Pressable>
    </XStack>
  );
};

const styles = StyleSheet.create({
  leftButton: {
    width: '10%',
    justifyContent: 'flex-start',
  },
  rightButton: {
    width: '10%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
