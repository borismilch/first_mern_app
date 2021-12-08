import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, uid) => {
    setToken(jwtToken)
    setUserId(uid)

    localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userId:uid }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, ready }
}
