import { useState, useRef, useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, LayoutAnimation } from 'react-native';

const useHandleScroll = () => {
  const [showButton, setShowButton] = useState(true);

  const scrollOffset = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {    
      // Check if the user is scrolling up or down by confronting the new scroll position with your own one
      const currentOffset = event.nativeEvent.contentOffset.y;
      const diff = currentOffset  - scrollOffset.current;
      if(diff > 50){
        setShowButton(false);
      }
      if(diff < -50 && !showButton){
        setShowButton(true);
      }
      scrollOffset.current = currentOffset;
    },
    [showButton]
  );

  return { handleScroll, showButton };
};

export default useHandleScroll;