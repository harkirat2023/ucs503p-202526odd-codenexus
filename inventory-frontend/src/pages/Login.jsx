import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import API from "../api/axios";
import {toast} from "react-toastify";
import {motion} from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({username: "", password: ""});
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await API.post("/auth/login", form);
      login(data.token, data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}>
        <div className="login-header">
          <h1>📦 Inventory System</h1>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="login-footer">Default: admin / admin123</p>
      </motion.div>
    </div>
  );
};

export default Login;
