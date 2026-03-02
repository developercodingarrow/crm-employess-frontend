"use client";

// Simple function to play notification sound
export const playNotificationSound = () => {
  try {
    const audio = new Audio("/sound/notification_sound.mp3");
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      console.log("Could not play sound:", error);
    });
    return audio; // Return so we can stop it if needed
  } catch (error) {
    console.log("Error playing sound:", error);
  }
};

// Simple function to stop sound
export const stopSound = (audio) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};
