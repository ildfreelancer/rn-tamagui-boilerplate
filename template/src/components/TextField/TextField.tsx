import {Icon, IconProps} from '../Icon';
import {Text, TextProps} from '@components/Text';
import {ms, s, vs} from '@gocodingnow/rn-size-matters';
import {StackStylePropsBase} from '@tamagui/core';
import {Stack, useTheme} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import {ReactNode, forwardRef} from 'react';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

export type TextFieldProps = TextInputProps & {
  control?: Control<any, any>;
  name: string;
  rules?: RegisterOptions;
  iconLeft?: string;
  iconRight?: string | boolean;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  placeholderTx?: string;
  _iconLeft?: IconProps;
  _iconRight?: IconProps;
  _textFieldContainer?: StackStylePropsBase;
  error?: string;
  _error?: TextProps;
};
export const TextField = forwardRef(
  (
    {
      placeholder,
      placeholderTx,
      leftComponent,
      rightComponent,
      iconLeft,
      iconRight,
      _iconLeft,
      _iconRight,
      onLeftPress,
      onRightPress,
      control,
      name,
      rules,
      _textFieldContainer,
      error,
      _error,
      ...rest
    }: TextFieldProps,
    ref: any,
  ) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const transformedPlaceholder = placeholder
      ? placeholder.toString()
      : t(placeholderTx as never);

    return (
      <Stack>
        <XStack
          space="$s-1"
          px="$s-5.5"
          h={s(50)}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          borderWidth="$s-0.25"
          borderRadius="$s-3"
          {..._textFieldContainer}>
          {(leftComponent || iconLeft) && (
            <Pressable onPress={onLeftPress} style={styles.leftButton}>
              {leftComponent
                ? leftComponent
                : !!iconLeft && (
                    <Icon
                      h={vs(20)}
                      name={iconLeft}
                      size={s(20)}
                      alignItems="center"
                      justifyContent="center"
                      {..._iconLeft}
                    />
                  )}
            </Pressable>
          )}
          <XStack flexWrap="wrap" justifyContent="center" flex={1}>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({field: {onChange, value}}) => (
                <TextInput
                  ref={ref}
                  underlineColorAndroid="transparent"
                  keyboardType={
                    Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
                  }
                  cursorColor={theme.white?.val}
                  selectionColor={theme.white?.val}
                  placeholderTextColor={theme.butterflyBush?.val}
                  placeholder={transformedPlaceholder}
                  value={value}
                  onChangeText={onChange}
                  style={styles.textInput}
                  {...rest}
                />
              )}
            />
          </XStack>

          {(rightComponent || iconRight) && (
            <Pressable onPress={onRightPress} style={styles.leftButton}>
              {rightComponent
                ? rightComponent
                : !!iconRight && (
                    <Icon
                      name={iconRight as string}
                      size="$s-6"
                      {..._iconRight}
                    />
                  )}
            </Pressable>
          )}
        </XStack>
        {error && (
          <Text
            text={error}
            fontSize="$xs"
            lineHeight="$15"
            color="$cardinal"
            mt="$s-1"
            ml="$s-2"
            mb="$s-2"
            {..._error}
          />
        )}
      </Stack>
    );
  },
);

const styles = StyleSheet.create({
  leftButton: {
    justifyContent: 'flex-start',
  },
  rightButton: {
    justifyContent: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginLeft: s(12),
    paddingVertical: vs(8),
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: ms(18, 0.8),
    width: '100%',
  },
});
