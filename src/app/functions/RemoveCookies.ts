import { deleteCookie } from "cookies-next";

export default function RemoveCookies(){
  deleteCookie('token');
  deleteCookie('user');
  deleteCookie('id');
}