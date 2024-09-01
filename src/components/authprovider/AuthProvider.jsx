import { createContext, useState } from 'react'

export let AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  let [progress, setProgress] = useState(0);
  return (
    <AuthContext.Provider value={{
      progress,
      setProgress
    }}>
      <div>
        {children}
      </div>
    </AuthContext.Provider>
  )
}

export default AuthProvider
