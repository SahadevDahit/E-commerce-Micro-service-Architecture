import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.cookies.get('token') !== undefined) {
    const token = request.cookies.get('token')?.value;
    
    try {
      const getRole = async () => {
        const response = await fetch(`${process.env.server}/users/v1/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        
        const data = await response.json();
        const role=data?.role;
        console.log(role);
        if(role===null||role===undefined){
            return NextResponse.redirect(new URL('/login', request.url));
        }
      };
     getRole();
    } catch (err: any) {
      console.log(err);
    }

  }else{
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admins/:path*', '/profile/:path*', '/business/:path*', '/orders/:path*', '/carts/:path*']
};
