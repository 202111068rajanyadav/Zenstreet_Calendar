import axios from "axios";

export const event = axios.create({
    baseURL: "http://localhost:8888/api/events"
  });



