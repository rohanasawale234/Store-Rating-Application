import api from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const submitRating = (data) =>
  api.post("/ratings", data, authHeader());

export const updateRating = (storeId, data) =>
  api.put(`/ratings/${storeId}`, data, authHeader());

export const getUserRating = (storeId) =>
  api.get(`/ratings/${storeId}`, authHeader());
