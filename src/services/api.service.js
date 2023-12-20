import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  params: {},
});



export const ConnectionAndData = async (body) => {
    try {
      const res = await instance.post("/datavisualization", body);
      toast.info('data fetched')
      return res;
    } catch (error) {
      toast.error(error);
    }
  };