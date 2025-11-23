import { useState } from "react";
import api from "@/libs/api";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.access_token);

      return data;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}
