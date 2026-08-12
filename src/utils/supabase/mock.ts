export function createMockClient(isServer = false, cookieStore = null) {
  const checkMockUser = () => {
    if (isServer && cookieStore) {
      return cookieStore.get('mock_user')?.value === 'true'
    } else if (typeof document !== 'undefined') {
      return document.cookie.includes('mock_user=true')
    }
    return false;
  }

  const setMockUser = () => {
    if (typeof document !== 'undefined') {
      document.cookie = "mock_user=true; path=/; max-age=86400";
    } else if (isServer && cookieStore) {
      cookieStore.set('mock_user', 'true', { path: '/', maxAge: 86400 })
    }
  }

  const clearMockUser = () => {
    if (typeof document !== 'undefined') {
      document.cookie = "mock_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    } else if (isServer && cookieStore) {
      cookieStore.delete('mock_user')
    }
  }

  return {
    auth: {
      getUser: async () => ({
        data: { user: checkMockUser() ? { id: 'mock', email: 'test@example.com', user_metadata: { full_name: 'Test User' } } : null },
        error: null
      }),
      signUp: async () => {
        setMockUser()
        return { error: null, data: { user: { id: 'mock' } } }
      },
      signInWithPassword: async () => {
        setMockUser()
        return { error: null, data: { user: { id: 'mock' } } }
      },
      signInWithOAuth: async () => {
        setMockUser()
        return { error: null, data: { provider: 'mock', url: '/dashboard' } }
      },
      signOut: async () => {
        clearMockUser()
        return { error: null }
      },
      resetPasswordForEmail: async () => {
        return { error: null }
      }
    }
  } as any;
}
