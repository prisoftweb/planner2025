import { deleteCookie, getCookies } from "cookies-next";

export default function RemoveCookies(){

  const allCookies = getCookies();
  const namesCookies = Object.getOwnPropertyNames(allCookies);

  // deleteCookie('token');
  // deleteCookie('user');
  // deleteCookie('id');
  namesCookies.map((coki) => {
    deleteCookie(coki);
  });
}