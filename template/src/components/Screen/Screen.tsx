import {Header} from '../Header';
import {YStack, YStackProps} from '@tamagui/stacks';
import {ReactNode, createContext, useContext} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {StatusBar} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreenContext = createContext({
  variant: 'fixed',
});
type ScreenProps = YStackProps & {
  variant?: 'fixed' | 'scroll';
  barStyle?: 'light-content' | 'dark-content';
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
};
export const Screen = ({
  variant = 'fixed',
  barStyle = 'dark-content',
  children,
  safeAreaTop = true,
  safeAreaBottom = false,
  ...rest
}: ScreenProps) => {
  const areaInsets = useSafeAreaInsets();
  return (
    <ScreenContext.Provider value={{variant}}>
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      <YStack
        flex={1}
        pt={safeAreaTop ? areaInsets.top : 0}
        pb={safeAreaBottom ? areaInsets.bottom : 0}
        {...rest}>
        {children}
      </YStack>
    </ScreenContext.Provider>
  );
};

type ScreenContainerProps = KeyboardAvoidingViewProps &
  KeyboardAwareScrollViewProps & {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
  };
const ScreenContainer = ({style, children, ...rest}: ScreenContainerProps) => {
  const {variant} = useContext(ScreenContext);
  return variant === 'fixed' ? (
    <KeyboardAvoidingView
      style={StyleSheet.flatten([styles.container, style])}
      {...rest}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAwareScrollView
      style={StyleSheet.flatten([styles.container, style])}
      showsVerticalScrollIndicator={false}
      {...rest}>
      {children}
    </KeyboardAwareScrollView>
  );
};

type ScreenBodyProps = YStackProps & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};
const ScreenBody = ({children, ...rest}: ScreenBodyProps) => {
  return <YStack {...rest}>{children}</YStack>;
};

Screen.Header = Header;
Screen.Container = ScreenContainer;
Screen.Body = ScreenBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: '100%',
  },
});
