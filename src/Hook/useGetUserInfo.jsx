import { useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../src/Api/BaseUrl"

const useGetUserInfo = (id, token) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subscribed/subid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.data;
        localStorage.setItem("user-sub", JSON.stringify(response.data));
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [id, token]);

  return [userInfo, loading, error];
};

export default useGetUserInfo;