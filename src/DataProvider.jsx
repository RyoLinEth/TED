import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    // const USDTContractAddress = "0xfF0FecDAD7993a18bB39942Bfe55547E93a3E9fF"
    const USDContractAddress = "0x9aF7D79c9910A1Ea169deeDFfC757FAB4D5E7dfD"
    const MinerContractAddress = "0x9c1674F8a3CbD6229217e05E357F58d46F881d80"

    const TEDAddress="0x7c9127F628Db9704FcdB097F162a1da2b46626BA"
    const USDSwap="0xa8f64CAB494A992563eE4D7a733d929876895ba3"
    const TEDUSDTLP = "0x8A2056ad4fdfb4E02aCfB7BB74FCAbbE571048ED"

    return (
        <MyContext.Provider value={{
            defaultAccount, setDefaultAccount,
            USDTContractAddress,
            USDContractAddress,
            MinerContractAddress,
            TEDAddress,
            USDSwap
        }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;