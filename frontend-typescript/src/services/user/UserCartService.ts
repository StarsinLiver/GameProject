import ICart from "../../types/ICart";
import ILibrary from "../../types/ILibrary";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";


// 저장함수
const create = (data: ILibrary) => {
  return http.post<ILibrary>("/user/cart-library-update", data, {
    headers : authHeader()
  });
};

const UserCartService = {
  create,

};

export default UserCartService;
