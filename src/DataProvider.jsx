import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    // const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDTContractAddress = "0x2BDF6DDbfEc9781aAbee00D7e028D3efcCaD473d"
    const USDContractAddress = "0x9fb6CbC7e1651237Bc1BD22c2F96BDa6D762673a"
    const MinerContractAddress = "0x7cE0691bBcB213363b074196C7A5c0567E3C9A7B"

    const FactoryAddress="0xd30a03E6e9C3984abf15c291A7bd56F0ca9480d3"
    const RouterAddress = "0x6cE35f67adB280A48C0d5dfCbc3aB60aE5681fB3"
    const TEDAddress="0xbfd3b440B5e574d0b2e68B8Adc10111eCcD7508D"
    const USDSwap="0xBf78a37baC9c108468E5F44E81D0477f5a81ea7f"

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