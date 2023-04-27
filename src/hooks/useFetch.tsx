import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../urls/urls.json";

const useFetch = ({
  id,
  url,
  method,
  body,
  params,
}: {
  id?: string;
  url?: string;
  method?: string;
  body?: any;
  params?: any;
}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const objectData: any = urls.find((url: any) => url.id === id);
    if (objectData?.type === "local") {
      setData(objectData);
    } else {
      (async () => {
        try {
          setLoading(true);
          const response: any = await axios({
            method: method || "GET",
            url: url,
            ...(method !== "GET" && { data: body }),
            params: params,
          });

          setData(response.data);
        } catch (err: any) {
          setError(err);
          console.log("ERROR:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
