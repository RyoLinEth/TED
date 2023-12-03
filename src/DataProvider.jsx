import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    //  BSC Contracts
    const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDContractAddress = "0x9aF7D79c9910A1Ea169deeDFfC757FAB4D5E7dfD"
    const MinerContractAddress = "0x7f6F6Ad60061D6D265dD8353b952a25af2A272D2"

    const TEDAddress="0x7c9127F628Db9704FcdB097F162a1da2b46626BA"
    const USDSwap="0xDe403151C18C5A945A8eb028035abb7ced0D93A3"
    const TEDUSDTLP = "0x0B7089bae53fb69692ACBDc098FdfDc1647ad690"
    const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"
    // const USDTContractAddress = "0x74C1C4a245A505F95ACB7D8ea4A4Ae63b0197259"
    // const USDContractAddress = "0x033435aC989Ef1f519BDA30033bCc6f9aef06bbF"
    // const MinerContractAddress = "0x7C57FFBb95570e07448767C5181AeffAEeabaC91"

    // const TEDAddress="0x34CF4625eD543C1680f95edC76FC1Ef4aD713C4A"
    // const USDSwap="0xa8f64CAB494A992563eE4D7a733d929876895ba3"
    // const TEDUSDTLP = "0x27D6cD224e43fF3F4B3AdCDE77DFE4Fa40e2391d"
    // const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"

    const uniswapV2Factory = "0xE8e2a5CcD62A8CBBa46dC25c116D3FDD0f007cB2"
    const feeToSetter = "0xC7Fdf9f4CECA17A1507945BB1ca817AbE8aCd694"
    const uniswapV2Router = "0x18d564A2E0854470C5fd0265b55e21e8aDe9Dd8a"

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