import { useVideoConfig } from 'remotion';

/** True when rendering the 9:16 Reels composition */
export const useVertical = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};
