import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    // const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDTContractAddress = "0x2BDF6DDbfEc9781aAbee00D7e028D3efcCaD473d"
    const MinerContractAddress = "0xef3025730398bfB3CC864e9d4eE06DDE25c6D2db"

    return (
        <MyContext.Provider value={{
            defaultAccount, setDefaultAccount,
            USDTContractAddress,
            MinerContractAddress
        }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;