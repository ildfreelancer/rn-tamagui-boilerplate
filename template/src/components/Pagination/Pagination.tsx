import {s} from '@gocodingnow/rn-size-matters';
import {StackProps} from '@tamagui/core';
import {Stack} from '@tamagui/core';
import {XStack} from '@tamagui/stacks';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
type PaginationProps = StackProps & {
  isRotate?: boolean;
  data: any[];
  animValue: Animated.SharedValue<number>;
};

const AnimatedStack = Animated.createAnimatedComponent(Stack);
type PaginationItemProps = {
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
};
const width = 24;
const PaginationItem = (props: PaginationItemProps) => {
  const {animValue, index, length, isRotate} = props;
  const animatedWidth = useAnimatedStyle(() => {
    let dotWidth = withTiming(
      Math.round(animValue.value) === index ? width : 6,
    );
    if (index === 0 && Math.round(animValue.value) > length - 1) {
      dotWidth = width;
    }
    return {
      width: dotWidth,
    };
  });

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];
    const active = Math.round(animValue.value) === index;
    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width - 6, 0, width + 6];
    }
    return {
      backgroundColor: active ? '#25B858' : '#BFBFBF',
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <AnimatedStack
      bg="#BFBFBF"
      borderRadius="$s-1"
      width={6}
      height={6}
      overflow="hidden"
      style={[
        animatedWidth,
        {
          transform: [
            {
              rotateZ: isRotate ? '90deg' : '0deg',
            },
          ],
        },
      ]}>
      <AnimatedStack h="100%" borderRadius={s(15)} style={[animStyle]} />
    </AnimatedStack>
  );
};

export const Pagination = ({
  data,
  animValue,
  isRotate,
  ...rest
}: PaginationProps) => {
  return (
    <XStack space="$s-2" justifyContent="center" alignSelf="center" {...rest}>
      {data.map((_, index) => (
        <PaginationItem
          animValue={animValue}
          index={index}
          key={index}
          isRotate={isRotate}
          length={data.length}
        />
      ))}
    </XStack>
  );
};
