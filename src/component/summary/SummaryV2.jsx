import { useContext } from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PieChart from "../chart/PieChart";
import GreenBtn from "../button/AddMony";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json'
import MinerABI from '../../assets/abi/MinerABI.json'
import LoadingAnimation from "../animation/LoadingAnimation";
import Popup from "../Popup/Popup";

//  礦機合約
function SummaryV2({ width, height }) {
  const {
    defaultAccount,
    USDTContractAddress,
    USDContractAddress,
    MinerContractAddress
  } = useContext(MyContext);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const [amountToMint, setAmountToMint] = useState(0);
  const [isUSDTNotApproved, setIsUSDTNotApproved] = useState(null);
  const [isUSDNotApproved, setIsUSDNotApproved] = useState(null);

  const [USDTAllowance, setUSDTAllowance] = useState(0);
  const [USDAllowance, setUSDAllowance] = useState(0);

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null);
  const [USDTContract, setUSDTContract] = useState(null);
  const [USDTDecimal, setUSDTDecimal] = useState(null);

  const [USDContract, setUSDContract] = useState(null);
  const [USDDecimal, setUSDDecimal] = useState(null);

  const [MinerContract, setMinerContract] = useState(null);
  const [MinerAmount, setMinerAmount] = useState(0);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    if (USDTContractAddress === null || USDContractAddress === null || MinerContractAddress === null) return;
    updateEthers()
  }, [defaultAccount])

  useEffect(() => {
    if (amountToMint === 0) return;
    const checkTwoTokens = async () => {
      console.log("Checking Allowance")
      await checkUSDTApprovalAgain()
      await checkUSDApprovalAgain()
    }

    const checkUSDApprovalAgain = async () => {
      const amountToApprove = amountToMint * 10;
      console.log("USDAllowance : " + USDAllowance)
      if (+USDAllowance >= +amountToApprove) {
        console.log("No Need To Approve USD More");
        setIsUSDNotApproved(false);
      } else {
        setIsUSDNotApproved(true);
      }
    }

    const checkUSDTApprovalAgain = async () => {
      const amountToApprove = amountToMint * 10;
      console.log("USDTAllowance : " + USDTAllowance)
      if (+USDTAllowance >= +amountToApprove) {
        console.log("No Need To Approve USDT More");
        setIsUSDTNotApproved(false);
      } else {
        setIsUSDTNotApproved(true);
      }
    }

    checkTwoTokens()
  }, [amountToMint])

  const updateEthers = async () => {
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      const tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);

      //  合約資料
      const tempUSDTContract = new ethers.Contract(USDTContractAddress, USDTABI, tempSigner)
      setUSDTContract(tempUSDTContract);
      const tempUSDTAllowance = await tempUSDTContract.allowance(defaultAccount, MinerContractAddress);
      const tempUSDTDecimal = await tempUSDTContract.decimals();
      setUSDTDecimal(tempUSDTDecimal);

      const realUSDTAmount = ethers.utils.formatUnits(`${tempUSDTAllowance}`, tempUSDTDecimal);
      const result = Number.isInteger(realUSDTAmount)
        ? realUSDTAmount
        : Number(realUSDTAmount).toFixed(4);
      setUSDTAllowance(result)


      const tempUSDContract = new ethers.Contract(USDContractAddress, USDTABI, tempSigner)
      setUSDContract(tempUSDContract);
      const tempUSDAllowance = await tempUSDContract.allowance(defaultAccount, MinerContractAddress);
      const tempUSDDecimal = await tempUSDContract.decimals();
      setUSDDecimal(tempUSDDecimal);

      const realUSDAmount = ethers.utils.formatUnits(`${tempUSDAllowance}`, tempUSDDecimal);
      const result2 = Number.isInteger(realUSDAmount)
        ? realUSDAmount
        : Number(realUSDAmount).toFixed(4);
      setUSDAllowance(result2)

      const tempMinerContract = new ethers.Contract(MinerContractAddress, MinerABI, tempSigner);
      setMinerContract(tempMinerContract);
      const tempMinerAmount = await tempMinerContract.personalMinerAmount(defaultAccount)
      const realMinerPower = ethers.utils.formatUnits(`${tempMinerAmount}`, 0);
      setMinerAmount(realMinerPower)

      if (+result === 0) setIsUSDTNotApproved(true);
      if (+result2 === 0) setIsUSDNotApproved(true);
    } catch (err) {
      console.log(err)
    }
  }

  const setPopup = (title, content) => {
    setShowPopup(true);
    setPopupTitle(title);
    setPopupContent(content);
  }
  const approveUSDT = async () => {
    setPopup("授權USDT", `正在授權 ${amountToMint} USDT`);
    const amountToApprove = ethers.utils.parseUnits(`${amountToMint}`, USDTDecimal);
    console.log("Approving USDT")
    const approveResult = await USDTContract.approve(MinerContractAddress, amountToApprove)
    console.log(approveResult)

    provider
      .getTransaction(approveResult.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功授權", `${amountToMint} USDT 已成功授權`);
          setIsUSDTNotApproved(false);
          const tempUSDTAllowance = await USDTContract.allowance(defaultAccount, MinerContractAddress);
          const realUSDTAllowance = ethers.utils.formatUnits(`${tempUSDTAllowance}`, USDTDecimal);
          const result = Number.isInteger(realUSDTAllowance)
            ? realUSDTAllowance
            : Number(realUSDTAllowance).toFixed(4);
          setUSDTAllowance(result)
        })
      })
  }

  const approveUSD = async () => {
    setPopup("授權USD", `正在授權 ${amountToMint} USD`);
    const amountToApprove = ethers.utils.parseUnits(`${amountToMint}`, USDDecimal);
    console.log(amountToApprove);
    console.log("Approving USD")
    const approveResult = await USDContract.approve(MinerContractAddress, amountToApprove)
    console.log(approveResult)

    provider
      .getTransaction(approveResult.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功授權", `${amountToMint} USD 已成功授權`);
          setIsUSDNotApproved(false);
          const tempUSDAllowance = await USDContract.allowance(defaultAccount, MinerContractAddress);
          const realUSDAllowance = ethers.utils.formatUnits(`${tempUSDAllowance}`, USDDecimal);
          const result = Number.isInteger(realUSDAllowance)
            ? realUSDAllowance
            : Number(realUSDAllowance).toFixed(4);
          setUSDAllowance(result)
        })
      })
  }

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Check if the input is a valid integer
    if (/^(0|[1-9]\d*)$/.test(value)) {
      setAmountToMint(parseInt(value, 10)); // Parse the input as an integer
    } else {
      // Handle invalid input, e.g., display an error message
      // You can also choose to ignore or clear the input
    }
  };
  const mintMiner = async () => {
    if (isUSDNotApproved && isUSDTNotApproved) {
      alert("USD 和 USDT 授權額度不足");
      return;
    } else if (isUSDNotApproved) {
      alert("USD 授權額度不足");
      return;
    } else if (isUSDTNotApproved) {
      alert("USDT 授權額度不足");
      return;
    }


    setPopup("添加算力", `正在添加 ${amountToMint} 算力`);
    console.log("Minting Miner ... ");
    const result = await MinerContract.mint(amountToMint)
    console.log(result)
    provider
      .getTransaction(result.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("算力添加成功", `已成功添加 ${amountToMint}算力`);
          const newMiners = MinerContract.personalMinerAmount(defaultAccount);
          const realMinerPower = ethers.utils.formatUnits(`${newMiners}`, 0);
          setMinerAmount(realMinerPower)
        })
      })
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">
      {showPopup && (
        <Popup onClose={closePopup}>
          <h2 className="text-base xl:text-2xl text-bgray-900 dark:text-white font-bold">
            {popupTitle}
          </h2>
          <p>{popupContent}</p>
        </Popup>
      )}
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          礦機使用情形
        </h3>
        <div className="mb-4 flex items-center space-x-8">
          <div
            className={`relative ${width ? width : "w-[180px]"} ${height && height
              }`}
          >
            <PieChart />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-base xl:text-2xl text-bgray-900 dark:text-white font-bold">
          礦機合成
        </h2>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-base xl:text-xl text-bgray-900 dark:text-white font-bold">
          最低可購算力: 10算力
        </h3>
        <br />
        <br />
        10 USDT + 10 USD
      </div>
      <div className="flex space-x-3 mb-10">
        {
          (isUSDTNotApproved && amountToMint !== 0) &&
          < GreenBtn text="授權USDT" className="mt-7" action={approveUSDT} />
        }
        {
          (isUSDNotApproved && amountToMint !== 0) &&
          <GreenBtn text="授權USD" className="mt-7" action={approveUSD} />
        }
      </div>

      <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
        <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
          輸入合成算力數量
        </p>
        <div className="flex h-[35px] w-full items-center justify-between">
          <span className="text-2xl font-bold text-bgray-900 dark:text-white">
            {/* $ */}
          </span>
          <label className="w-full">
            <input
              type="number"
              className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
              defaultValue={amountToMint}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
        所需 USDT : {amountToMint}
        <span style={{ paddingLeft: '10px' }}>
          {
            +USDTAllowance >= +amountToMint * 10
              ? "已授權" : "授權額度不足"
          }
        </span>
        <br />
        所需 USD : {amountToMint}
        <span style={{ paddingLeft: '10px' }}>
          {
            +USDAllowance >= +amountToMint * 10
              ? "已授權" : "授權額度不足"
          }
        </span>
        <br />
      </p>
      < GreenBtn text="合成" className="mt-7" action={mintMiner} />

      <div>
        <p className="text-xs text-bgray-500 dark:text-white mb-2">
          持有算力
        </p>
        <div className="flex space-x-4 items-end">
          <span className="text-bgray-900 dark:text-white font-bold text-2xl leading-[30px]">
            {MinerAmount}
          </span>
          {/* <span className="text-xs font-medium text-success-300">+2,5%</span> */}
        </div>
      </div>
    </div>
  );
}

export default SummaryV2;
