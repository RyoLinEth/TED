import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    //  BSC Contracts
    const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDContractAddress = "0x9aF7D79c9910A1Ea169deeDFfC757FAB4D5E7dfD"
    const MinerContractAddress = "0xD0036FcF2Ce1a0461453e962f28b7019D7434f85"

    const TEDAddress="0x7c9127F628Db9704FcdB097F162a1da2b46626BA"
    const USDSwap="0xDe403151C18C5A945A8eb028035abb7ced0D93A3"
    const TEDUSDTLP = "0x5bdec4D561D145a0C703A6871a03f73E04e4c1a3"
    const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"
    // const USDTContractAddress = "0xf8eFcF00eDeB9f5B495a8ed100E695917BB312F8"
    // const USDContractAddress = "0x9aA63B6Fea4859EB5fC723727c29F13EF831fc03"
    // const MinerContractAddress = "0x144670397D7484580E9231CA54f8d5C9CBba2745"

    // const TEDAddress="0xE5e9a207940dd28185F3B928870073523A3fbFcB"
    // const USDSwap="0xa8f64CAB494A992563eE4D7a733d929876895ba3"
    // const TEDUSDTLP = "0x27D6cD224e43fF3F4B3AdCDE77DFE4Fa40e2391d"
    // const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"

    const uniswapV2Factory = "0xeb0C6c9035ad78AA3BA0C4b2aAA81D4823355A3a"
    const feeToSetter = "0x1037c753917CA59F341F228EB2F76050662F61a7"
    const uniswapV2Router = "0xeb0C6c9035ad78AA3BA0C4b2aAA81D4823355A3a"

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