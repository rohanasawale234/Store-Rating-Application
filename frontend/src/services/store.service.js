import api from "./api";

export const getStores = () => {
  const token = localStorage.getItem("token");

  return api.get("/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
