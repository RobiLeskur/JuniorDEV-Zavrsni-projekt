import { createContext,useContext, useState, ReactNode } from 'react';


type AdminContextType = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};


const AdminContext = createContext<AdminContextType>({
  isAdmin: true,
  toggleAdmin: () => {},
});

const AdminContextProvider = ({ children }: { children: ReactNode }) => {

  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => useContext(AdminContext);


export { AdminContextProvider, useAdmin };
