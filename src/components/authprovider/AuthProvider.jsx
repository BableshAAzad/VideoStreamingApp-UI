import { createContext, useEffect, useState } from 'react'
import "./AuthProvider.css"

export let AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  let [progress, setProgress] = useState(0);
  const [responsiveClass, setResponsiveClass] = useState('');

  useEffect(() => {
    const updateResponsiveClass = () => {
      if (window.innerWidth < 337) {
        setResponsiveClass('responsive-margin-337');
      } else if (window.innerWidth < 409) {
        setResponsiveClass('responsive-margin-409');
      } else if (window.innerWidth < 768) {
        setResponsiveClass('responsive-margin-768');
      } else if (window.innerWidth < 1016) {
        setResponsiveClass('responsive-margin-1016');
      } else {
        setResponsiveClass('');
      }
    };

    updateResponsiveClass();

    window.addEventListener('resize', updateResponsiveClass);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateResponsiveClass);
  }, []);

  return (
    <AuthContext.Provider value={{
      progress,
      setProgress
    }}>
      <div className={`sm:pt-[1px] md:pt-[23px] lg:pt-[1px] ${responsiveClass} dark:bg-slate-900`}>
        {children}
      </div>
    </AuthContext.Provider>
  )
}

export default AuthProvider
