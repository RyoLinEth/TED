import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json';
import { ethers } from "ethers";

function TotalWidget() {
  const { defaultAccount, TEDAddress } = useContext(MyContext)
  const connectWalletText = "請連接錢包"
  const [tedPrice, setTedPrice] = useState(connectWalletText);
  const [tedAmount, setTedAmount] = useState(connectWalletText);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    // if (TEDUSDLP === null || TEDUSDLP === undefined) return;
    updateEthers()
  }, [defaultAccount])

  useEffect(() => {
    // 初始加载数据
    updateEthers();
    fetchData()

    // 设置定时器，每20秒获取一次数据
    const intervalId = setInterval(() => {
      updateEthers();
      fetchData()
    }, 20000);

    // 组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/bsc/0x0b7089bae53fb69692acbdc098fdfdc1647ad690'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log(jsonData)
      setTedPrice(jsonData.pair.priceUsd)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const updateEthers = async () => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      const tempSigner = tempProvider.getSigner();

      //  合約資料
      const tempContract = new ethers.Contract(TEDAddress, USDTABI, tempSigner)

      const tempDecimal = await tempContract.decimals();
      const tempBalance = await tempContract.balanceOf(defaultAccount);

      const realBalance = ethers.utils.formatUnits(`${tempBalance}`, tempDecimal);
      const fixedDecimalPrice = Number(realBalance).toFixed(4)
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
