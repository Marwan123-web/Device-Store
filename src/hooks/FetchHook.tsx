import axios from "axios";
import { useEffect, useState } from "react";
import { LocalDataI } from "../models/localData.interface";
import urls from "../urls/urls.json";
const FetchHook = (id: string) => {
  const [data, setData] = useState<LocalDataI>();

  useEffect(() => {
    const objectData: any = urls.find((url) => url.id === id);
    if (objectData?.type === "local") {
      setData(objectData);
    } else {
      (async () => {
        const Method = objectData?.method || "GET";
        const URL = objectData?.url || "";
        const DATA = {};
        await axios({
          method: Method,
          url: URL,
          data: DATA,
        })
          .then((res: any) => {
            setData(res);
          })
          .catch((error: any) => {
            console.log("ERROR:", error);
          });
      })();
    }
  }, []);

  return data;
};

export default FetchHook;
