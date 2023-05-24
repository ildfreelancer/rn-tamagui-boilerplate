import {Text} from '@components/Text';
import {Stack} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import {Pressable} from 'react-native';

type LinkItemProps = {
  labelTx: string;
  usageTx: string;
  onPress: () => void;
};
const LinkItem = ({labelTx, usageTx, onPress}: LinkItemProps) => (
  <Pressable onPress={onPress}>
    <XStack mt="$vs-5">
      <Stack w="30%">
        <Text tx={labelTx} fontSize="$xs" fontWeight="500" />
      </Stack>
      <Stack flex={1} flexWrap="wrap" flexDirection="row" ml="$s-3">
        <Text tx={usageTx} fontSize="$xs" fontWeight="500" />
      </Stack>
    </XStack>
  </Pressable>
);

export default LinkItem;
