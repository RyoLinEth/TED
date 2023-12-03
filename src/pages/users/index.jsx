import { useContext, useEffect, useState } from "react";
import AddBalance from "../../component/addBalance/AddBalance";
import MyContext from "../../DataProvider";
import { ethers } from "ethers";
import MinerABI from '../../assets/abi/MinerABI.json'

function Users() {
  const defaultLink = "https://dapp.tedusd.online/miner?inviter=";
  const { defaultAccount } = useContext(MyContext);

  const [personalLink, setPersonalLink] = useState(null);

  const getPersonalLink = () => {
    setPersonalLink(defaultLink + defaultAccount);
  }

  useEffect(() => {
    getPersonalLink()
  }, [defaultAccount])
  return (

    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-[2000px]">
          <AddBalance
            title="个人邀请链接"
            content={personalLink}
            showMark={true}
            showSvgContent={false}
            showButton={false}
          />
        </section>
      </div>
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
  const [sonDatas, setSonDatas] = useState([]);

  const [level, setLevel] = useState(null);


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

      const tempLevel = await tempMinerContract.checkMyLevel(defaultAccount);
      setLevel(tempLevel);
      console.log(tempLevel)
    } catch (err) {
      console.log(err)
    }
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

  return (
    <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">

      <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          我的团队级别
        </h3>
        <div className="mb-4 flex items-center space-x-8">
          <div
            className={`relative ${width ? width : "w-[180px]"} ${height && height
              }`}
          >
          </div>
          {level}
        </div>
      </div>

      <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          团队矿机
        </h3>
        <div className="mb-4 flex items-center space-x-8">
          <div
            className={`relative ${width ? width : "w-[180px]"} ${height && height
              }`}
          >
          </div>
          <ul>
            {
              sonDatas !== undefined && sonDatas !== null && sonDatas.length !== 0 &&
              sonDatas.map((data, index) => {
                return (
                  <li key={data.son}>
                    <p>{index + 1}.</p>
                    <p>子级别地址:
                      <a href={data.link}>
                        {data.son.slice(0, 4)}...{data.son.slice(-4)}
                      </a>
                    </p>
                    <p>子级别算力: {data.power}</p>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default Users;
