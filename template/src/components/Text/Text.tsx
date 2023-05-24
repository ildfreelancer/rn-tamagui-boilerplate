import {Text as TText, TextProps as ITextProps, styled} from '@tamagui/core';
import {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';

export type TextProps = ITextProps & {
  text?: string | number | null;
  tx?: string;
  txOptions?: Record<string, string | number>;
};

export const Text = styled(
  forwardRef((props: TextProps, ref: any) => {
    const {text, tx, txOptions, children, ...rest} = props;
    const {t} = useTranslation();
    const content =
      typeof text === 'number' || text || children
        ? typeof text === 'number' || text
          ? text.toString()
          : children
        : t(tx as never, txOptions || {});
    return (
      <TText ref={ref} color="$blackLight" ff="$body" fos="$sm" {...rest}>
        {content}
      </TText>
    );
  }),
  {
    variants: {} as const,
  },
);
