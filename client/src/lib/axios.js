/**
 * axios instance
 * 統一管理 API base URL
 */

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
