import { toast } from "react-toastify";

// export const API_URL = 'http://localhost:3000';
export const API_URL = 'https://rails-wq0k.onrender.com';
export const API_KEY = "";
export const handleToast = ({ msg, type = "success" }) => toast(msg, { position: "top-center", type, autoClose: 5000 });
