import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useNotFound() {
  const navigate = useNavigate();

  const notfound = useCallback(() => {
    navigate("/404");
  }, [navigate]);

  return notfound;
}
