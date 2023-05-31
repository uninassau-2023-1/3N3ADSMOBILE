import axios from "axios";

// const baseUrl = "https://sistemaatendimento.onrender.com";
const baseUrl = "http://localhost";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
