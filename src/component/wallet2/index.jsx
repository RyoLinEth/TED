import card1 from "../../assets/images/payments/card-1.svg";
import PaymentFilter from "../forms/PaymentFilter";
import GreenBtn from "../button/AddMony";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json'
import USDSwapABI from '../../assets/abi/USDSwapABI.json'
import { ethers } from 'ethers'
import Popup from "../Popup/Popup";
import swal from "sweetalert";

function Wallet() {
  const { defaultAccount, USDTContractAddress, USDSwap } = useContext(MyContext);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const [USDTAmount, setUSDTAmount] = useState(null);
  const [USDTDecimal, setUSDTDecimal] = useState(0);
  const [USDTAllowance, setUSDTAllowance] = useState(0);

  const [connectingAccount, setConnectingAccount] = useState(null);

  const [amountToSell, setAmountToSell] = useState(null);
  const [isUSDTNotApproved, setIsUSDTNotApproved] = useState(null);

  const [provider, setProvider] = useState(null);
  const [USDTContract, setUSDTContract] = useState(null);
  const [USDSwapContract, setUSDSwapContract] = useState(null);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    if (USDTContractAddress === null || USDTContractAddress === undefined) return;
    if (USDSwap === null || USDSwap === undefined) return;
    updateEthers();
    setConnectingAccount(defaultAccount.slice(0, 4) + "..." + defaultAccount.slice(-4))
  }, [defaultAccount])

  const setPopup = (title, content) => {
    setShowPopup(true);
    setPopupTitle(title);
    setPopupContent(content);
  }

  const updateEthers = async () => {
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      const tempSigner = tempProvider.getSigner();
      //  合約資料
      const tempUSDTContract = new ethers.Contract(USDTContractAddress, USDTABI, tempSigner)
      setUSDTContract(tempUSDTContract);

      const tempUSDTBalance = await tempUSDTContract.balanceOf(defaultAccount);
      const tempUSDTDecimal = await tempUSDTContract.decimals();
      setUSDTDecimal(tempUSDTDecimal);
      const tempUSDTAllowance = await tempUSDTContract.allowance(defaultAccount, USDSwap);
      const realUSDTAmount = ethers.utils.formatUnits(`${tempUSDTAllowance}`, tempUSDTDecimal);
      const allowanceResult = Number.isInteger(realUSDTAmount)
        ? realUSDTAmount
        : Number(realUSDTAmount).toFixed(4);
      setUSDTAllowance(allowanceResult)


      const realAmount = ethers.utils.formatUnits(`${tempUSDTBalance}`, tempUSDTDecimal);
      const result = Number.isInteger(realAmount) ? realAmount : Number(realAmount).toFixed(4);

      setUSDTAmount(result)

      const tempUSDSwapContract = new ethers.Contract(USDSwap, USDSwapABI, tempSigner)
      setUSDSwapContract(tempUSDSwapContract)

      if (+allowanceResult === 0) setIsUSDTNotApproved(true);
    } catch (err) {
      console.log(err)
    }
  }

  const approveUSDT = async () => {
    setPopup("授權USDT", `正在授權 ${amountToSell} USDT`);
    const amountToApprove = ethers.utils.parseUnits(`${amountToSell}`, USDTDecimal);
    console.log("Approving USDT")
    const approveResult = await USDTContract.approve(USDSwap, amountToApprove)
    console.log(approveResult)

    provider
      .getTransaction(approveResult.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功授權", `${amountToSell} USDT 已成功授權`);
          setIsUSDTNotApproved(false);
          const tempUSDTAllowance = await USDTContract.allowance(defaultAccount, USDSwap);
          const realUSDTAllowance = ethers.utils.formatUnits(`${tempUSDTAllowance}`, USDTDecimal);
          const result = Number.isInteger(realUSDTAllowance)
            ? realUSDTAllowance
            : Number(realUSDTAllowance).toFixed(4);
          setUSDTAllowance(result)
        })
      })
  }


  const makeSwap = async () => {
    if(isUSDTNotApproved) {
      swal("額度不足","USDT授權額度不足","error");
      return;
    }
    const amountToApproveAndSell = ethers.utils.parseUnits(`${amountToSell}`, USDTDecimal);
    const swapResult = await USDSwapContract.swapUSD(amountToApproveAndSell)

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
  }
  const handlePercentageChosen = (value) => {
    const numberToSell = (USDTAmount * value / 100).toFixed(4)
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
          USD Swap
        </h3>
        <PaymentFilter
          amount={USDTAmount}
          setPercentage={handlePercentageChosen}
          tokenName={"USDT"}
        />
        <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
          <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
            輸入欲購買的USD數量
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

        <div className="flex space-x-3 mb-10">
          {

            (isUSDTNotApproved && amountToSell !== null && amountToSell !== 0) &&
            <GreenBtn text="授權USDT" className="mt-7" action={approveUSDT} />
          }
          <GreenBtn text="買入USD" className="mt-7" action={makeSwap} />
        </div>
        {
          amountToSell !== 0 && amountToSell !== null &&
          <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
            所需 USDT : {amountToSell}
            <span style={{ paddingLeft: '10px' }}>
              {
                +USDTAllowance >= +amountToSell
                  ? "已授權" : "授權額度不足"
              }
            </span>
          </p>
        }
      </div>
    </div>
  );
}

export default Wallet;
