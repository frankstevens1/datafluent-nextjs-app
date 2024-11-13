import { useState, useEffect } from 'react';

type Location = {
  latitude: number;
  longitude: number;
};

export function useUserLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("Location permission denied");
          setLocation(null); // Default to null if permission is denied
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable");
          break;
        case error.TIMEOUT:
          setError("Location request timed out");
          break;
        default:
          setError("An unknown error occurred");
      }
      setLocation(null); // End loading state on any error
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
}
