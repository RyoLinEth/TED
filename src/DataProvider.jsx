import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    //  BSC Contracts
    const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDContractAddress = "0x9aF7D79c9910A1Ea169deeDFfC757FAB4D5E7dfD"
    const MinerContractAddress = "0xf0129046e8643319B8832d1ca40384b844F0E370"

    const TEDAddress="0x7c9127F628Db9704FcdB097F162a1da2b46626BA"
    const USDSwap="0xDe403151C18C5A945A8eb028035abb7ced0D93A3"
    const TEDUSDTLP = "0xEE2dF8af7b66Ecb851c25Ff3C824604AB9699610"
    const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"
    // const USDTContractAddress = "0xf8eFcF00eDeB9f5B495a8ed100E695917BB312F8"
    // const USDContractAddress = "0x9aA63B6Fea4859EB5fC723727c29F13EF831fc03"
    // const MinerContractAddress = "0xC0dbaBfA1a6F4Eb98277d71052a5D644028BB5de"

    // const TEDAddress="0xE5e9a207940dd28185F3B928870073523A3fbFcB"
    // const USDSwap="0xa8f64CAB494A992563eE4D7a733d929876895ba3"
    // const TEDUSDTLP = "0x27D6cD224e43fF3F4B3AdCDE77DFE4Fa40e2391d"
    // const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"

    const uniswapV2Factory = "0xE8e2a5CcD62A8CBBa46dC25c116D3FDD0f007cB2"
    const feeToSetter = "0xC7Fdf9f4CECA17A1507945BB1ca817AbE8aCd694"
    const uniswapV2Router = "0xFAaA53529DE6c7c3EaBE59a5076ADd75b5a97693"

    return (
        <MyContext.Provider value={{
            defaultAccount, setDefaultAccount,
            USDTContractAddress,
            USDContractAddress,
            MinerContractAddress,
            TEDAddress,
            USDSwap,
            defaultInviter,
            TEDUSDTLP
        }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;