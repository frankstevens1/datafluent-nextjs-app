"use client";

import React, { useState, useEffect } from "react";

interface ShuffledTextProps {
  text: string;
  duration?: number; // Optional: duration of the effect in milliseconds
  shuffleSpeed?: number; // Optional: speed of shuffling in milliseconds
  tracking?: string; // Optional: custom tracking class (letter spacing)
}

const ShuffledText: React.FC<ShuffledTextProps> = ({
  text,
  duration = 500, // Effect duration: 500ms
  shuffleSpeed = 100, // Shuffling speed: 100ms
  tracking = "tracking-widest", // Default tracking class
}) => {
  const [shuffledText, setShuffledText] = useState(text.split(""));
  const [isGlitching, setIsGlitching] = useState(false);

  // Helper function to shuffle the array of letters, keeping spaces intact
  const shuffleArray = (array: string[]) => {
    const arr = array.slice(); // Copy array
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Function to start the glitch/shuffle effect
  const startGlitchEffect = () => {
    //setIsGlitching(true);

    const interval = setInterval(() => {
      setShuffledText(shuffleArray(shuffledText));
    }, shuffleSpeed); // Shuffle at specified speed

    // Stop glitching after the specified duration and reset to the original text
    setTimeout(() => {
      clearInterval(interval);
      setShuffledText(text.split("")); // Reset to original order
      setIsGlitching(false);
    }, duration);
  };

  // Trigger the effect on load
  useEffect(() => {
    startGlitchEffect();
  }, []); // Empty dependency array to trigger once on mount

  return (
    <span
      onMouseEnter={startGlitchEffect} // Trigger again on hover
      className={`inline-block ${tracking}`} // Apply the custom tracking class
    >
      {shuffledText.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-transform ${
            isGlitching ? "glitch-effect" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default ShuffledText;
