import React, { useEffect, useMemo } from "react";
import { StyleSheet, Animated } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";
import { useUpdateLayoutEffect } from "../hooks/useUpdateLayoutEffect";
import { colors } from "../constants/styleGuide";

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator = ({ isTyping }: TypingIndicatorProps) => {
  const { yCoords, heightScale, marginScale } = useMemo(
    () => ({
      yCoords: new Animated.Value(200),
      heightScale: new Animated.Value(0),
      marginScale: new Animated.Value(0),
    }),
    []
  );

  const slideIn = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideOut = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isTyping) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isTyping]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginBottom: marginScale,
        },
      ]}
    >
      {isTyping ? (
        <TypingAnimation
          style={{ marginLeft: 6, marginTop: 7.2 }}
          dotRadius={4}
          dotMargin={5.5}
          dotColor={colors.contrastText}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    width: 45,
    borderRadius: 15,
    backgroundColor: colors.brand,
  },
});

export default TypingIndicator;
