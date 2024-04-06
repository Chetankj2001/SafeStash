import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = "http://localhost:3000";
import { getUsername } from "../helper/helper.js";
import useStore from "../store/store.js";

export async function loadUser(username) {
  console.log({ username });
  return await axios.get(`api/user/${username}`);
}

//COSTOM HOOK !
export default function useFetch() {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    state: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username } = useStore.getState().auth;

        const { data, status } = await loadUser(
          username ? username : getUsername()
        );

        setData((prev) => ({ ...prev, isLoading: true }));

        if (status === 200) {
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (err) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: err }));
      }
    };
    fetchData();
  }, []);

  return [getData, setData];
}
