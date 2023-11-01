import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    // const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDTContractAddress = "0xfF0FecDAD7993a18bB39942Bfe55547E93a3E9fF"
    const USDContractAddress = "0xfC4Ee1E9c495c7360dD8C47d3828a25c244454c6"
    const MinerContractAddress = "0xB48B90C502438A0CC9141D76d769ea8B53838a85"

    const FactoryAddress="0xd30a03E6e9C3984abf15c291A7bd56F0ca9480d3"
    const RouterAddress = "0x6cE35f67adB280A48C0d5dfCbc3aB60aE5681fB3"
    const TEDAddress="0x93b2271Eae0371736600a608DBBFcEa023aAD338"
    const USDSwap="0xBf78a37baC9c108468E5F44E81D0477f5a81ea7f"
    const TEDUSDTLP = "0xb15D61898Ef65C0878f07F2815f81d81B664FC8c"

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