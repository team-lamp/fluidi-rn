import React, { ReactNode, useEffect, useMemo } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";
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
        toValue: 40,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 10,
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
        <>
          <Animated.View
            style={[styles.innerContainer, { height: heightScale }]}
          >
            <TypingAnimation
              style={{ marginLeft: 15, marginTop: 7.2 }}
              dotRadius={3.5}
              dotMargin={6}
              dotColor={colors.contrastText}
            />
          </Animated.View>
        </>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 22,
  },
  innerContainer: {
    width: 60,
    borderRadius: 15,
    backgroundColor: colors.secondaryBackground,
  },
});

export default TypingIndicator;
