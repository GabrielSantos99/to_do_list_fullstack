import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function PrivateRoute({ children }) {
    const user = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return navigate("/login");
    }

    return children;
}
