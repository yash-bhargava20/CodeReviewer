import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { googleLogin } from "../store/Slice/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(googleLogin(token))
        .unwrap()
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, searchParams]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
