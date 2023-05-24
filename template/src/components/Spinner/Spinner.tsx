import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

import {Stack, StackProps} from '@tamagui/core';

import pick from 'lodash-es/pick';
type SpinnerProps = StackProps &
  ActivityIndicatorProps & {
    loading?: boolean;
  };
export const Spinner = ({
  loading = true,
  color = '$primary',
  ...rest
}: SpinnerProps) => {
  return loading ? (
    <Stack {...rest}>
      <ActivityIndicator
        color={color || 'black'}
        {...pick(rest, [
          'size',
          'animating',
          'style',
          'color',
          'hidesWhenStopped',
          'onLayout',
        ])}
      />
    </Stack>
  ) : null;
};
