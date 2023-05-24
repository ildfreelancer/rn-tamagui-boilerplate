import {forwardRef, MutableRefObject, Ref, useCallback} from 'react';
import {BottomSheetModal, BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {BottomSheetBackdrop} from './components/BottomSheetBackdrop';
import {BottomSheetHandle} from './components/BottomSheetHandle';
import {useBottomSheetBackHandler} from '@hooks/useBottomSheetBack';

export const BottomSheet = forwardRef(
  (
    {children, onChange, ...props}: BottomSheetModalProps,
    ref: Ref<BottomSheetModal>,
  ) => {
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
    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetHandle}
        enablePanDownToClose
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        {...props}
        onChange={handleSheetChanges}>
        {children}
      </BottomSheetModal>
    );
  },
);
