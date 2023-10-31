import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    // const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDTContractAddress = "0x2BDF6DDbfEc9781aAbee00D7e028D3efcCaD473d"
    const USDContractAddress = "0x9fb6CbC7e1651237Bc1BD22c2F96BDa6D762673a"
    const MinerContractAddress = "0x7cE0691bBcB213363b074196C7A5c0567E3C9A7B"

    return (
        <MyContext.Provider value={{
            defaultAccount, setDefaultAccount,
            USDTContractAddress,
            USDContractAddress,
            MinerContractAddress
        }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;