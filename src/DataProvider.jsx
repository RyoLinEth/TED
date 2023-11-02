import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const DataProvider = ({ children }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    //  BSC Contracts
    const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"
    const USDContractAddress = "0x9aF7D79c9910A1Ea169deeDFfC757FAB4D5E7dfD"
    const MinerContractAddress = "0xDCFeA9B80081aCBfF692784FcC08433Fd96D88C0"

    const TEDAddress="0x7c9127F628Db9704FcdB097F162a1da2b46626BA"
    const USDSwap="0xDe403151C18C5A945A8eb028035abb7ced0D93A3"
    const TEDUSDTLP = "0x5bdec4D561D145a0C703A6871a03f73E04e4c1a3"
    const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"
    // const USDTContractAddress = "0x7f180D50f382Ae5549b6d144f0Bdc7a87111EF72"
    // const USDContractAddress = "0x5b12326bba4a6902Af6B9822AE059D71045FCaf0"
    // const MinerContractAddress = "0xd4a8b8238C3A761977FC285a93aB145fc4ce2F11"

    // const TEDAddress="0xb6AceBDDE92e9409a9B12eb09B89C175201d51f2"
    // const USDSwap="0xa8f64CAB494A992563eE4D7a733d929876895ba3"
    // const TEDUSDTLP = "0x27D6cD224e43fF3F4B3AdCDE77DFE4Fa40e2391d"
    // const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e"

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