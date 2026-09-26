interface Window {
  umami?: {
    track: (eventName: string, data?: Record<string, unknown>) => void;
  };
}
