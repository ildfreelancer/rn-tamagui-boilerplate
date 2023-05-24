import icons from './icons';
import {Stack} from '@tamagui/core';
import {styled, useTheme} from '@tamagui/core';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import {forwardRef} from 'react';
export type IconName = keyof typeof icons;

export type IconProps = {
  name: string;
  color?: string;
  stroke?: string;
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  type?: string;
};
export const Icon = styled(
  forwardRef((props: any, ref) => {
    const {name, fill, stroke, color, type, style} = props;
    const theme = useTheme();
    const IconSVG = (icons as any)?.[name];
    const cloned = {} as {
      color?: string;
      fill?: string;
      stroke?: string;
      size?: number;
      width?: number;
      height?: number;
    };
    if (fill) {
      cloned.fill = (theme as any)?.[fill]?.val ?? fill;
    }
    if (color) {
      cloned.color = (theme as any)?.[color]?.val ?? color;
    }
    if (stroke) {
      cloned.stroke = stroke;
    }
    if (style && style[0].width === style[0].height) {
      cloned.size = style[0].height;
    }
    if (style?.[0].width) {
      cloned.width = style[0].width;
    }
    if (style?.[0].height) {
      cloned.height = style[0].height;
    }

    let IconComponent;
    if (name && IconSVG) {
      IconComponent = IconSVG;
    } else {
      switch (type) {
        case 'AntDesign': {
          IconComponent =
            require('react-native-vector-icons/AntDesign').default;
          break;
        }
        case 'MaterialCommunityIcons': {
          IconComponent =
            require('react-native-vector-icons/MaterialCommunityIcons').default;
          break;
        }
        case 'MaterialIcons': {
          IconComponent =
            require('react-native-vector-icons/MaterialIcons').default;
          break;
        }
        case 'SimpleLineIcons': {
          IconComponent =
            require('react-native-vector-icons/SimpleLineIcons').default;
          break;
        }
        case 'Ionicons': {
          IconComponent = require('react-native-vector-icons/Ionicons').default;
          break;
        }
        case 'Octicons': {
          IconComponent = require('react-native-vector-icons/Octicons').default;
          break;
        }
        default: {
          IconComponent =
            require('react-native-vector-icons/FontAwesome').default;
          break;
        }
      }
    }

    return (
      <Stack ref={ref} {...omit(cloned, ['color', 'fill', 'stroke'])}>
        <IconComponent
          name={name}
          {...style}
          {...pick(cloned, ['color', 'fill', 'stroke', 'size'])}
        />
      </Stack>
    );
  }),
  {
    variants: {
      size: {
        '...size': (size, {tokens}) => {
          return {
            width: tokens.size[size] ?? size,
            height: tokens.size[size] ?? size,
          };
        },
      },
    } as const,
  },
);
