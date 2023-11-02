import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";
import PoolABI from '../../assets/abi/PoolABI.json'
import { ethers } from "ethers";

function TotalWidget() {
  const TEDUSDLP = "0x5bdec4D561D145a0C703A6871a03f73E04e4c1a3";
  const { defaultAccount } = useContext(MyContext)
  const connectWalletText = "請連接錢包"
  const [tedPrice, setTedPrice] = useState(connectWalletText);
  const [tedAmount, setTedAmount] = useState(connectWalletText);
  const [poolContract,setPoolContract] = useState(null);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    // if (TEDUSDLP === null || TEDUSDLP === undefined) return;
    updateEthers()
  }, [defaultAccount, TEDUSDLP])

  useEffect(() => {
    // 初始加载数据
    updateEthers();

    // 设置定时器，每20秒获取一次数据
    const intervalId = setInterval(() => {
      updateEthers();
    }, 20000);

    // 组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);



  const updateEthers = async () => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      const tempSigner = tempProvider.getSigner();

      //  合約資料
      const tempPoolContract = new ethers.Contract(TEDUSDLP, PoolABI, tempSigner)
      setPoolContract(tempPoolContract);

      const price = await tempPoolContract.TEDPrice();
      const realPrice = ethers.utils.formatUnits(`${price}`, 18);
      const fixedDecimal = Number(realPrice).toFixed(5)
      setTedPrice(fixedDecimal)
      const userBalance = await tempPoolContract.UserTEDBalance(defaultAccount);
      const realBalance = ethers.utils.formatUnits(`${userBalance}`, 18);
      const fixedDecimalPrice = Number(realBalance).toFixed(5)
      setTedAmount(fixedDecimalPrice);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="$TED 實時價格"
          amount={tedPrice}
          groth="+ 3.5%"
          id="totalEarn"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="TED 持有量"
          amount={tedAmount}
          groth="+ 3.5%"
          id="totalSpending"
        />
      </div>
    </div>
  );
}

export default TotalWidget;
