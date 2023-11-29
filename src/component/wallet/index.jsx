import card1 from "../../assets/images/payments/card-1.svg";
import PaymentFilter from "../forms/PaymentFilter";
import GreenBtn from "../button/AddMony";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json'
import MinerABI from '../../assets/abi/MinerABI.json'
import Popup from "../Popup/Popup";
import { ethers } from 'ethers'

function Wallet() {
  const { defaultAccount, TEDAddress, MinerContractAddress } = useContext(MyContext);

  const [TEDContract, setTEDContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const [TEDAmount, setTEDAmount] = useState(null)
  const [TEDDecimal, setTEDDecimal] = useState(0);

  const [connectingAccount, setConnectingAccount] = useState(null);

  const [amountToSell, setAmountToSell] = useState(null);
  const [minerContract, setMinerContract] = useState(null);
  const [isTEDNotApproved, setIsTEDNotApproved] = useState(null);
  const [TEDAllowance, setTEDAllowance] = useState(0);

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
      setProvider(tempProvider)
      const tempSigner = tempProvider.getSigner();
      //  合約資料
      const tempTEDContract = new ethers.Contract(TEDAddress, USDTABI, tempSigner)
      setTEDContract(tempTEDContract);

      const tempMinerContract = new ethers.Contract(MinerContractAddress, MinerABI, tempSigner);
      setMinerContract(tempMinerContract);

      const tempTEDBalance = await tempTEDContract.balanceOf(defaultAccount);
      const tempTEDDecimal = await tempTEDContract.decimals();
      setTEDDecimal(tempTEDDecimal)

      const realAmount = ethers.utils.formatUnits(`${tempTEDBalance}`, tempTEDDecimal);
      const result = Math.floor(realAmount)
      // Number.isInteger(realAmount) ? realAmount : Number(realAmount).toFixed(4);
      setTEDAmount(result)

      const tempTEDAllowance = await tempTEDContract.allowance(defaultAccount, MinerContractAddress);
      const realTEDAmount = ethers.utils.formatUnits(`${tempTEDAllowance}`, tempTEDDecimal);
      const allowanceResult = Number.isInteger(realTEDAmount)
        ? realTEDAmount
        : Number(realTEDAmount).toFixed(4);
      setTEDAllowance(allowanceResult)

      if (+allowanceResult === 0) setIsTEDNotApproved(true);

    } catch (err) {
      console.log(err)
    }
  }

  const approveTED = async () => {
    setPopup("授權TED", `正在授權 ${amountToSell} TED`);
    const amountToApprove = ethers.utils.parseUnits(`${amountToSell}`, TEDDecimal);
    console.log("Approving USDT")
    const approveResult = await TEDContract.approve(MinerContractAddress, amountToApprove)
    console.log(approveResult)

    provider
      .getTransaction(approveResult.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功授權", `${amountToSell} TED 已成功授權`);
          setIsTEDNotApproved(false);
          const tempTEDAllowance = await TEDContract.allowance(defaultAccount, MinerContractAddress);
          const realTEDAllowance = ethers.utils.formatUnits(`${tempTEDAllowance}`, TEDDecimal);
          const result = Number.isInteger(realTEDAllowance)
            ? realTEDAllowance
            : Number(realTEDAllowance).toFixed(4);
          setTEDAllowance(result)
        })
      })
  }


  const makeSwap = async () => {
    if (isTEDNotApproved) {
      swal("額度不足", "TED授權額度不足", "error");
      return;
    }
    setPopup("賣出 TED", `正在賣出 ${amountToSell} TED`);
    try {
    const amountToApproveAndSell = ethers.utils.parseUnits(`${amountToSell}`, TEDDecimal);
    const swapResult = await minerContract.swapTEDtoUSDT(amountToApproveAndSell)

    provider
      .getTransaction(swapResult.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功兌換", `${amountToSell} USDT 已成功兌換`);
          updateEthers()
        })
      })
    } catch(err) {
      swal("發生錯誤", err.reason, "error");
      setShowPopup(false)
    }
  }

  const handlePercentageChosen = (value) => {
    const numberToSell = (TEDAmount * value / 100).toFixed(4)
    setAmountToSell(numberToSell)
  }

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Check if the input is a valid integer
    if (/^(0|[1-9]\d*)$/.test(value)) {
      setAmountToSell(parseInt(value, 10)); // Parse the input as an integer
    } else {
      // Handle invalid input, e.g., display an error message
      // You can also choose to ignore or clear the input
    }
  };

  const setPopup = (title, content) => {
    setShowPopup(true);
    setPopupTitle(title);
    setPopupContent(content);
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mb-6 w-full rounded-lg bg-white px-[42px] py-5 dark:border dark:border-darkblack-400 dark:bg-darkblack-600 lg:mb-0 lg:w-1/2 2xl:mb-6 2xl:w-full">
      {showPopup && (
        <Popup onClose={closePopup}>
          <h2 className="text-base xl:text-2xl text-bgray-900 dark:text-white font-bold">
            {popupTitle}
          </h2>
          <p>{popupContent}</p>
        </Popup>
      )}
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
          amount={TEDAmount}
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
                defaultValue={amountToSell}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 mb-10">
        {

          (+TEDAllowance < +amountToSell && amountToSell !== null && amountToSell !== 0) &&
          <GreenBtn text="授權TED" className="mt-7" action={approveTED} />
        }

        <GreenBtn text="販售TED" className="mt-7" action={makeSwap} />
      </div>
      {
        amountToSell !== 0 && amountToSell !== null &&
        <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
          所需 TED : {amountToSell}
          <span style={{ paddingLeft: '10px' }}>
            {
              +TEDAllowance >= +amountToSell
                ? "已授權" : "授權額度不足"
            }
          </span>
        </p>
      }
    </div>
  );
}

export default Wallet;
