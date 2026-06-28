import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      let redirectUrl = `${origin}${next}`
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${next}`
      } else if (!isLocalEnv && forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      }
      
      return NextResponse.redirect(redirectUrl)
    }
  }

  let errorUrl = `${origin}/login?error=Could not authenticate user`
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    errorUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=Could not authenticate user`
  }
  return NextResponse.redirect(errorUrl)
}
