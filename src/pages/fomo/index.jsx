import { useContext, useEffect, useState } from "react";
import AddBalance from "../../component/addBalance/AddBalance";
import MyContext from "../../DataProvider";
import { ethers } from "ethers";
import MinerABI from '../../assets/abi/MinerABI.json'
import USDTABI from '../../assets/abi/USDTABI.json'
import Announcement from "../../pages/announcement";

function Users() {
    const { defaultAccount } = useContext(MyContext);

    return (

        <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
            <Announcement/>
            {/* write your code here */}
            <MyTeam />
        </main>
    );
}

//  礦機合約
function MyTeam({ width, height }) {
    const {
        defaultAccount,
        USDTContractAddress,
        USDContractAddress,
        MinerContractAddress
    } = useContext(MyContext);

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null);

    const [MinerContract, setMinerContract] = useState(null);
    const [usdtContract, setUSDTContract] = useState(null);
    const [sonDatas, setSonDatas] = useState([]);

    const [biggestPowerTime, setBiggestPowerTime] = useState(null);
    const [biggestPowerOwner, setBiggestPowerOwner] = useState(null);
    const [biggestPower, setBiggestPower] = useState(null);
    const [biggestTimeInterval, setBiggestTimeInterval] = useState(null);
    const [lastBuyer, setLastBuyer] = useState(null);
    const [lastBuyTime, setLastBuyTime] = useState(null);

    const [fomo1, setFomo1] = useState(null)
    const [fomo2, setFomo2] = useState(null)

    useEffect(() => {
        if (defaultAccount === null || defaultAccount === undefined) return;
        if (USDTContractAddress === null || USDContractAddress === null || MinerContractAddress === null) return;
        updateEthers()
    }, [defaultAccount])

    useEffect(() => {
        if (MinerContract === null) return;
        if (sonDatas.length !== 0) return;
        fetchSonData(MinerContract, 0);
    }, [MinerContract])

    const updateEthers = async () => {
        try {
            const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(tempProvider);
            const tempSigner = tempProvider.getSigner();
            setSigner(tempSigner);
            //  合約資料
            const tempMinerContract = new ethers.Contract(MinerContractAddress, MinerABI, tempSigner);
            setMinerContract(tempMinerContract);
            const tempUSDTCA = new ethers.Contract(USDTContractAddress, USDTABI, tempSigner);
            setUSDTContract(tempUSDTCA);

            const tempBiggestPowerTime = await tempMinerContract.biggestPowerTime();
            const realBiggestPowerTime = ethers.utils.formatUnits(tempBiggestPowerTime, '0');
            setBiggestPowerTime(realBiggestPowerTime);

            const currentTime = getTimeValue();
            setBiggestTimeInterval(86400 - (currentTime - realBiggestPowerTime))

            const tempBiggestPowerOwner = await tempMinerContract.biggestPowerOwner();
            setBiggestPowerOwner(tempBiggestPowerOwner);
            const tempBiggestPower = await tempMinerContract.biggestPower();
            const realBiggestPower = ethers.utils.formatUnits(tempBiggestPower, '0');
            setBiggestPower(realBiggestPower);

            const tempLastBuyTime = await tempMinerContract.lastJoinTime();
            const realLastBuyTime = ethers.utils.formatUnits(tempLastBuyTime, '0');
            setLastBuyTime(600 - (currentTime - realLastBuyTime));
            const tempLastBuyer = await tempMinerContract.lastJoinAddress();
            setLastBuyer(tempLastBuyer);

            const prizePool1 = await tempMinerContract._prizePool_1()
            const prizePool2 = await tempMinerContract._prizePool_2()

            const fomo1Balance = await tempUSDTCA.balanceOf(prizePool1)
            const real1Balance = ethers.utils.formatUnits(fomo1Balance, '18');
            setFomo1(removeDecimal(real1Balance))
            const fomo2Balance = await tempUSDTCA.balanceOf(prizePool2)
            const real2Balance = ethers.utils.formatUnits(fomo2Balance, '18');
            setFomo2(removeDecimal(real2Balance))
        } catch (err) {
            console.log(err)
        }
    }
    const removeDecimal = (numberString) => {
        const parts = numberString.split(".");
        return parts[0];
    }

    const getTimeValue = () => {
        const time = new Date();
        const timestamp = Math.floor(time.getTime() / 1000);
        console.log(timestamp);
        return timestamp;
    }


    const fetchSonData = async (tempCA, num) => {
        try {
            console.log("Num : " + num)
            const tempSonAddressSet = await tempCA.sonDatas(defaultAccount, num);
            const realSonPower = ethers.utils.formatUnits(`${tempSonAddressSet.sonPower}`, 0);
            const newData = {
                son: tempSonAddressSet.son,
                link: `https://bscscan.com/address/${tempSonAddressSet.son}`,
                power: realSonPower * 2
            }
            setSonDatas(prevSonDatas => [...prevSonDatas, newData]);
            const updatedNum = num + 1;
            await fetchSonData(tempCA, updatedNum)
        } catch (err) {
            console.log("No More Datas with : " + num)
        }
    }
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const omitAddress = (value) => {
        if (value === null || value === undefined) return null;
        const omittedAddress = `${value.slice(0, 4)}...${value.slice(-4)}`
        return omittedAddress;
    }

    return (
        <div>
            <div className="2xl:flex 2xl:space-x-[48px]">
                <section className="2xl:w-[2000px]">
                    <div className="w-full rounded-xl bg-white dark:bg-darkblack-600mb-[48px]">
                        <div className="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-8 pb-12">
                            <h3 className="text-2xl font-semibold text-bgray-900 dark:text-white">
                                最大算力
                            </h3>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        擁有者
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                omitAddress(biggestPowerOwner)
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        倒數
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                formatTime(biggestTimeInterval)
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        最大算力
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                biggestPower * 2
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        獎池USDT
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                fomo2
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="2xl:flex 2xl:space-x-[48px]">
                <section className="2xl:w-[2000px]">
                    <div className="w-full rounded-xl bg-white dark:bg-darkblack-600mb-[48px]">
                        <div className="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-8 pb-12">
                            <h3 className="text-2xl font-semibold text-bgray-900 dark:text-white">
                                10分鐘無單
                            </h3>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        最後購買
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                omitAddress(lastBuyer)
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        倒數
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                formatTime(lastBuyTime)
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
                    <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
                        獎勵池USDT
                    </h3>
                    <div className="mb-4 flex items-center space-x-8">
                        <div
                            className={`relative ${width ? width : "w-[180px]"} ${height && height
                                }`}
                        >
                            {
                                fomo1
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Users;
