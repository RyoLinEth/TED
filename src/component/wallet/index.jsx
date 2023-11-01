import card1 from "../../assets/images/payments/card-1.svg";
import PaymentFilter from "../forms/PaymentFilter";
import GreenBtn from "../button/AddMony";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json'
import { ethers } from 'ethers'

function Wallet() {
  const { defaultAccount, TEDAddress } = useContext(MyContext);

  // const [USDTContract, setUSDTContract] = useState(null);
  const [USDTAmount, setUSDTAmount] = useState(null)

  const [connectingAccount, setConnectingAccount] = useState(null);

  const [amountToSell, setAmountToSell] = useState(null);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    
    if (TEDAddress === null || TEDAddress === undefined) return;
    console.log(2)
    updateEthers();
    setConnectingAccount(defaultAccount.slice(0, 4) + "..." + defaultAccount.slice(-4))
  }, [defaultAccount])

  const updateEthers = async () => {
    console.log("Updating Ethers")
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      const tempSigner = tempProvider.getSigner();
      //  合約資料
      const tempUSDTContract = new ethers.Contract(TEDAddress, USDTABI, tempSigner)
      // setUSDTContract(tempUSDTContract);

      const tempUSDTBalance = await tempUSDTContract.balanceOf(defaultAccount);
      const tempUSDTDecimal = await tempUSDTContract.decimals();

      const realAmount = ethers.utils.formatUnits(`${tempUSDTBalance}`, tempUSDTDecimal);
      const result = Number.isInteger(realAmount) ? realAmount : Number(realAmount).toFixed(4);

      setUSDTAmount(result)
    } catch (err) {
      console.log(err)
    }
  }

  const makeSwap = () => {
    console.log("Making Swap ...")
    swal("功能完善中","TED Swap功能 11/2 - 11/3 開放","error")
  }
  const handlePercentageChosen = (value) => {
    const numberToSell = (USDTAmount * value / 100).toFixed(4)
    setAmountToSell(numberToSell)
  }

  return (
    <div className="mb-6 w-full rounded-lg bg-white px-[42px] py-5 dark:border dark:border-darkblack-400 dark:bg-darkblack-600 lg:mb-0 lg:w-1/2 2xl:mb-6 2xl:w-full">
      <div className="my-wallet mb-8 w-full">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-bgray-900 dark:text-white">
            我的錢包
            <span style={{ paddingLeft: '20px' }}>
              {
                connectingAccount
              }
            </span>
          </h3>
        </div>

        <div className="flex justify-center">
          <div className="card-slider relative w-[280px] md:w-[340px]">
            <div className="w-full">
              <img src={card1} alt="card" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-4 text-lg font-bold text-bgray-900 dark:text-white">
          TED Swap
        </h3>
        <PaymentFilter
          amount={USDTAmount}
          setPercentage={handlePercentageChosen}
          tokenName={"TED"}
        />
        <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
          <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
            輸入欲販售的TED數量
          </p>
          <div className="flex h-[35px] w-full items-center justify-between">
            <span className="text-2xl font-bold text-bgray-900 dark:text-white">
              {/* $ */}
            </span>
            <label className="w-full">
              <input
                type="text"
                className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                value={amountToSell}
              />
            </label>
          </div>
        </div>
        <GreenBtn text="Make Swap" className="mt-7" action={makeSwap} />
      </div>
    </div>
  );
}

export default Wallet;
