import {s} from '@gocodingnow/rn-size-matters';
import {Button as TButton, ButtonProps as IButtonProps} from '@tamagui/button';
import {styled} from '@tamagui/core';
import {TOptionsBase} from 'i18next';
import {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';

export type ButtonProps = IButtonProps & {
  label?: string;
  labelTx?: string;
  loadingTx?: string;
  labelTxOptions?: TOptionsBase;
  loadingTxOptions?: TOptionsBase;
  loading?: boolean;
  loadingText?: string;
};
export const Button = styled(
  forwardRef(
    (
      {
        label,
        labelTx,
        labelTxOptions,
        children,
        disabled,
        loading,
        loadingTx,
        loadingText,
        loadingTxOptions,
        ...rest
      }: ButtonProps,
      ref,
    ) => {
      const {t} = useTranslation();
      const loadingString = loadingText
        ? loadingText
        : loadingTx
        ? t(loadingTx as string, loadingTxOptions as any)
        : undefined;

      return (
        <TButton
          ref={ref}
          pressStyle={styles.btnPress}
          textProps={{lineHeight: 24}}
          disabled={disabled}
          ai="center"
          jc="center"
          {...rest}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            children ??
            (loading && loadingString
              ? loadingString
              : label || labelTx
              ? t(labelTx as string, labelTxOptions as any)
              : undefined)
          )}
        </TButton>
      );
    },
  ),
  {
    name: 'CustomButton',
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
          disabled: true,
        },
      },
      variant: {
        solid: {
          bg: '$primary',
          height: s(56),
          color: 'white',
          fontFamily: '$body',
          fontWeight: '600',
          fontSize: '$base',
          textProps: {lineHeight: '$24'},
          br: '$vs-4',
        },
        outline: {
          br: '$vs-4',
          bg: 'transparent',
          height: s(56),
          color: 'white',
          fontFamily: '$body',
          fontWeight: '600',
          fontSize: '$base',
          textProps: {lineHeight: '$24'},
        },
        clear: {
          py: 0,
          unstyled: true,
        },
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  } as const,
);

const styles = StyleSheet.create({
  btnPress: {
    opacity: 0.9,
  },
});
