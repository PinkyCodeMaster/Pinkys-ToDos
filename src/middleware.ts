import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from './utils/supabase/server';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Define public routes
const publicPaths = ['/login', '/register', '/public'];

function isPublicPath(pathname: string): boolean {
    return publicPaths.includes(pathname);
}

export async function middleware(request: NextRequest) {
    // Get the response from updating the session
    let supabaseResponse = await updateSession(request);
    const supabase = createClient()

    const { nextUrl } = request;
    const { pathname } = nextUrl;

    // Check if the path is public or if the user is authenticated
    if (isPublicPath(pathname)) {
        return supabaseResponse;
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // Redirect to login if user is not authenticated and trying to access a protected route
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/login';
        return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access to the requested route
    return supabaseResponse;
}

export const config = {
    matcher: [
        // Apply middleware to all paths except those explicitly excluded
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
