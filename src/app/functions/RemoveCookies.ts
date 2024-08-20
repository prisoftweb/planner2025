import { deleteCookie, getCookies } from "cookies-next";

export default function RemoveCookies(){

  const allCookies = getCookies();
  const namesCookies = Object.getOwnPropertyNames(allCookies);
  //console.log('all Coookies => ', namesCookies);

  // deleteCookie('token');
  // deleteCookie('user');
  // deleteCookie('id');
  namesCookies.map((coki) => {
    //console.log('delete coki => ', coki);
    deleteCookie(coki);
  });
}