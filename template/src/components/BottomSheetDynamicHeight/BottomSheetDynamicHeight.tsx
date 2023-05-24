import {
  forwardRef,
  Ref,
  useCallback,
  useMemo,
  ReactNode,
  MutableRefObject,
} from 'react';
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {ScaledSheet} from '@gocodingnow/rn-size-matters';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@components/Toast';
import {useBottomSheetBackHandler} from '@hooks/useBottomSheetBack';
import {BottomSheetHandle} from '@components/BottomSheet';
import {useWindowDimensions} from 'react-native';
import {Optional} from '@helpers/typescript';

type BottomSheetDynamicHeightProps = Optional<
  BottomSheetModalProps,
  'snapPoints'
> & {
  variant?: 'fixed' | 'scroll';
  children: ReactNode | ReactNode[];
  backgroundColor?: string;
  hideHandle?: boolean;
  enablePanDownToClose?: boolean;
  enableOverDrag?: boolean;
  rounded?: number;
};
export const BottomSheetDynamicHeight = forwardRef(
  (
    {
      variant = 'fixed',
      children,
      backgroundColor = 'white',
      hideHandle,
      enablePanDownToClose = true,
      enableOverDrag = true,
      rounded = 24,
      onDismiss,
      onChange,
    }: BottomSheetDynamicHeightProps,
    ref: Ref<BottomSheetModal>,
  ) => {
    const {height} = useWindowDimensions();
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const {handleSheetPositionChange} = useBottomSheetBackHandler(
      ref as MutableRefObject<BottomSheetModal>,
    );
    const handleSheetChanges = useCallback(
      (index: number) => {
        onChange?.(index);
        handleSheetPositionChange(index);
      },
      [handleSheetPositionChange, onChange],
    );

    const _renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
      return (
        <>
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            enableTouchThrough
            {...props}
          />
          <Toast config={toastConfig} />
        </>
      );
    }, []);
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={enablePanDownToClose}
        enableOverDrag={enableOverDrag}
        activeOffsetY={[0, 0]}
        handleComponent={hideHandle ? null : BottomSheetHandle}
        backdropComponent={_renderBackdrop}
        backgroundStyle={{
          backgroundColor: backgroundColor,
          borderTopLeftRadius: rounded,
          borderTopRightRadius: rounded,
        }}
        onDismiss={onDismiss}
        onChange={handleSheetChanges}
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore">
        {variant === 'scroll' ? (
          <BottomSheetScrollView
            style={{maxHeight: height * 0.9}}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onLayout={handleContentLayout}>
            {children}
          </BottomSheetScrollView>
        ) : (
          <BottomSheetView onLayout={handleContentLayout}>
            {children}
          </BottomSheetView>
        )}
      </BottomSheetModal>
    );
  },
);

const styles = ScaledSheet.create({
  content: {
    flexGrow: 1,
  },
});
