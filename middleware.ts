import { NextResponse } from 'next/server';
import { GetAuthToken } from './app/controllers/security/token';

export async function middleware(req: Request) {
  
     const data = await GetAuthToken()
        if(data && data.message === "ok") {
            // Sinon, continuer
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', req.url));
        }
}

export const config = {
  matcher: [
    '/pages/CompteClient/:path*',
    '/pages/Backoffice/:path*',
    '/details-projet/:path*'
  
  ], // appliquer le middleware à /dashboard et sous-routes
};