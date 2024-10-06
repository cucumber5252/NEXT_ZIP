import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn }) => {
  return isLoggedIn ? (
    Component
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default PrivateRoute;
