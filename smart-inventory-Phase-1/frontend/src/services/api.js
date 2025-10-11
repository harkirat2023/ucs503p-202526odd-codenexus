// import axios from "axios";
// const api = axios.create({baseURL: "/api"});

// api.interceptors.request.use((cfg) => {
//   const token = localStorage.getItem("token");
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

// api.interceptors.response.use(
//   (r) => r,
//   (e) => {
//     if (e.response?.status === 401) {
//       localStorage.clear();
//       window.location = "/login";
//     }
//     return Promise.reject(e);
//   }
// );

// export const authAPI = {
//   login: (e, p) => api.post("/auth/login", {email: e, password: p}),
//   register: (u) => api.post("/auth/register", u),
// };

// export const productsAPI = {
//   getAll: (p) => api.get("/products", {params: p}),
//   getById: (id) => api.get(`/products/${id}`),
//   create: (d) => api.post("/products", d),
//   update: (id, d) => api.put(`/products/${id}`, d),
//   delete: (id) => api.delete(`/products/${id}`),
//   lookup: (c) => api.get(`/products/lookup/${c}`),
// };

// export const transactionsAPI = {
//   getAll: () => api.get("/transactions"),
//   create: (d) => api.post("/transactions", d),
// };
import axios from "axios";
const api = axios.create({baseURL: "/api"});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401) {
      localStorage.clear();
      window.location = "/login";
    }
    return Promise.reject(e);
  }
);

export const authAPI = {
  login: (e, p) => api.post("/auth/login", {email: e, password: p}),
  register: (u) => api.post("/auth/register", u),
};

export const productsAPI = {
  getAll: (p) => api.get("/products", {params: p}),
  getById: (id) => api.get(`/products/${id}`),
  create: (d) => api.post("/products", d),
  update: (id, d) => api.put(`/products/${id}`, d),
  delete: (id) => api.delete(`/products/${id}`),
  lookup: (c) => api.get(`/products/lookup/${c}`),
};

export const transactionsAPI = {
  getAll: () => api.get("/transactions"),
  create: (d) => api.post("/transactions", d),
};

