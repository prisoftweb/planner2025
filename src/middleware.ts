import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  //const resources = request.cookies.get('resources');
  
  if(!token){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // let r = "Geeks For Geeks ";
  //   console.log((r.match(/Geeks/g))?.length);
  // numero de apariciones de una cadena en otra en caso de usar /

  // const domain = 'http://localhost:3000/';
  // console.log('aquii', request.url);
  // if(request.url !== domain){
  //   console.log(resources);
  //   // console.log('url midd ', request.url);
  //   // console.log(request.url.substring(22))
  //   let url = request.url.substring(22);
  //   if(url.includes('/')){
  //     console.log('url / ', request.url);
  //     //recorrer ciclo con resources y routes
  //   }else{
  //     console.log('url ', request.url);
  //     //recorrer ciclo unicamente con resources
  //   }
  // }
}

export const config = {
  matcher: ['/', '/users/:path*', '/providers/:path*', '/clients/:path*',
    '/catalogs/:path*', '/companies/:path*', '/departments/:path*',
    '/glossary/:path*', '/projects/:path*', '/providers/:path*',
    '/roles/:path*', '/status/:path*'
  ],
}