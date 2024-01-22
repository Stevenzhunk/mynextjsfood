'use client';
import { useState, useEffect } from 'react';
export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  //im aCustom Hook to bring profile info
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);
  return { loading, data };
}
