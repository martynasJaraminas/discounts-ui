import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const CoreAnimation = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000000000
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{ 
        ...props.style,
        transform: [{ translateY: 0 }],
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default CoreAnimation;