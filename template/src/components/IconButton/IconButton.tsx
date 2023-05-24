import {Icon, IconProps} from '@components/Icon';
import {Stack} from '@tamagui/core';
import {Pressable, PressableProps} from 'react-native';

type IconButtonProps = PressableProps & IconProps;
export const IconButton = ({onPress, ...props}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Stack {...(props as any)}>
        <Icon {...props} />
      </Stack>
    </Pressable>
  );
};
