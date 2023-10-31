import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
  const [defaultAccount, setDefaultAccount] = useState(null);

  return (
    <MyContext.Provider value={{ defaultAccount, setDefaultAccount }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;