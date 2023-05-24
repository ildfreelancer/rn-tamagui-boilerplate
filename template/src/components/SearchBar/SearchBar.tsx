import {Icon} from '@components/Icon';
import {ScaledSheet} from '@gocodingnow/rn-size-matters';
import {useTheme} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import {TOptionsBase} from 'i18next';
import {useTranslation} from 'react-i18next';
import {TextInput, TextInputProps} from 'react-native';

type SearchBarProps = TextInputProps & {
  placeholder?: string;
  placeholderTx?: string;
  placeholderTxOptions?: TOptionsBase;
};
export const SearchBar = ({
  placeholder,
  placeholderTx,
  placeholderTxOptions,
  ...rest
}: SearchBarProps) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const placeholderStr = placeholder
    ? placeholder
    : placeholderTx
    ? t(placeholderTx, placeholderTxOptions as any)
    : '';
  return (
    <XStack
      flex={1}
      bg="white"
      br="$s-6"
      h="$s-12"
      ai="center"
      shadowColor="#063336"
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.1}
      shadowRadius={16}
      px="$s-4">
      <Icon name="search-outline" type="Ionicons" size="$s-6" />
      <TextInput
        style={styles.container}
        placeholder={placeholderStr}
        placeholderTextColor={'#D9D9D9'}
        selectionColor={theme.primary.val}
        {...rest}
      />
    </XStack>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '16@s',
  },
});
