import {Text} from '../Text';
import {s} from '@gocodingnow/rn-size-matters';
import {Stack} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import {useEffect, useMemo} from 'react';
import {Pressable} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ToastDefault, {ToastConfigParams} from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ToastWarningProps {
  internalState: ToastConfigParams<any>;
  type: 'success' | 'error' | 'warning';
}

export const Toast = ({
  internalState: {text1, text2, isVisible},
  type,
}: ToastWarningProps) => {
  const progress = useSharedValue(0);

  const color = useMemo(() => {
    if (type === 'error') {
      return 'red';
    }
    if (type === 'warning') {
      return 'yellow';
    }
    return 'green';
  }, [type]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      height: 3,
      width: `${progress.value}%`,
      flexGrow: 1,
      backgroundColor: color,
    };
  });

  useEffect(() => {
    if (isVisible) {
      progress.value = 100;
      progress.value = withTiming(0, {
        duration: 2500,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [isVisible, progress]);

  return (
    <Stack w="100%">
      <XStack
        mx="$s-4"
        p="$s-4"
        bg="white"
        borderRadius="$s-2"
        alignItems="center">
        <Stack flex={1} justifyContent="center">
          {!!text1 && (
            <Text fontSize="$xl" text={text1} numberOfLines={4} color="black" />
          )}
          {!!text2 && <Text text={text2} numberOfLines={4} color="black" />}
        </Stack>
        <Stack position="absolute" top="$s-1" right="$s-1">
          <Pressable onPress={() => ToastDefault.hide()}>
            <Stack p="$s-0.5">
              <MaterialIcons name="close" color="white" size={s(20)} />
            </Stack>
          </Pressable>
        </Stack>
      </XStack>
      <Stack bg="#F1F2F4" height={3} width="100%">
        <Animated.View style={progressStyle} />
      </Stack>
    </Stack>
  );
};

export const toastConfig = {
  success: (internalState: ToastConfigParams<any>) => (
    <Toast type="success" internalState={internalState} />
  ),
  error: (internalState: ToastConfigParams<any>) => (
    <Toast type="error" internalState={internalState} />
  ),
  warning: (internalState: ToastConfigParams<any>) => (
    <Toast type="warning" internalState={internalState} />
  ),
};
