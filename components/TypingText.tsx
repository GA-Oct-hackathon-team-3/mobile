import React, { useState, useEffect } from "react";
import { Animated, Text } from "react-native";

const TypingText = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setText((text) => text + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text, index]);

  return <Text>{text}</Text>;
};

export default TypingText;
