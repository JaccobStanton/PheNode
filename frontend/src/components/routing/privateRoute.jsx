import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  if (keycloak.authenticated) {
    return children;
  } else {
    navigate("/login");
    return null;
  }
}

export default PrivateRoute;
