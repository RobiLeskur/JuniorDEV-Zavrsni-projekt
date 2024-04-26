import React, { createContext, useState, ReactNode } from 'react';


type AdminContextType = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};


const AdminContext = createContext<AdminContextType>({
  isAdmin: true,
  toggleAdmin: () => {},
});

export default AdminContext;