import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protege rotas /admin/* exceto /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Verifica se tem cookie de sessão
    const adminLogged = request.cookies.get('admin-logged');
    
    if (!adminLogged) {
      // Redireciona para login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};