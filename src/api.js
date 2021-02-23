  
import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:3000/",
});

export const api = {
  getData: () => base.get("flights.json").then((r) => r.data.result),
};