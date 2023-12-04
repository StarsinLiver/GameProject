import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

const updatePoint = (userId: number, point: number) => {
  return http.put(`/user/update-user-point/${userId}/${point}`, null, {
    headers: authHeader(),
  });
};

const UserService = {
  updatePoint,
};

export default UserService;
