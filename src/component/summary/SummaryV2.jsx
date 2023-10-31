import { useContext } from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PieChart from "../chart/PieChart";
import GreenBtn from "../button/AddMony";
import MyContext from "../../DataProvider";
import USDTABI from '../../assets/abi/USDTABI.json'

//  礦機合約
function SummaryV2({ width, height }) {
  const { defaultAccount, USDTContractAddress, MinerContractAddress } = useContext(MyContext);

  const [amountToMint, setAmountToMint] = useState(0);
  const [isUSDTNotApproved, setIsUSDTNotApproved] = useState(null);
  const [isUSDNotApproved, setIsUSDNotApproved] = useState(null);

  const [USDTAllowance, setUSDTAllowance] = useState(0);

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null);
  const [USDTContract, setUSDTContract] = useState(null);
  const [USDTDecimal, setUSDTDecimal] = useState(null);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;
    updateEthers()
  }, [defaultAccount])

  useEffect(() => {
    const checkTwoTokens = () => {
      checkUSDTApprovalAgain()
    }
    const checkUSDTApprovalAgain = async () => {
      if (isUSDTNotApproved) return;
      const amountToApprove = ethers.utils.parseEther(`${amountToMint * 10}`, USDTDecimal);
      if (+USDTAllowance >= +amountToApprove) {
        console.log("No Need To Approve More");
      } else {
        setIsUSDTNotApproved(false);
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

      const realAmount = ethers.utils.formatUnits(`${tempUSDTAllowance}`, tempUSDTDecimal);
      const result = Number.isInteger(realAmount) ? realAmount : Number(realAmount).toFixed(4);

      setUSDTAllowance(result)
      if (+result === 0) setIsUSDTNotApproved(true);
    } catch (err) {
      console.log(err)
    }
  }

  const approveUSDT = async () => {
    const amountToApprove = ethers.utils.parseEther(`${amountToMint * 10}`, USDTDecimal);
    console.log(amountToApprove);
    console.log("Approving USDT")
    const approveResult = await USDTContract.approve(MinerContractAddress, amountToApprove)
    console.log(approveResult)
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
  const mintMiner = () => {
    console.log("Minting Miner ... ");

  }

  return (
    <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">
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
          礦機價格
        </h3>
        10 USDT + 10 USD/1台
      </div>
      <div className="flex space-x-3 mb-10">
        {
          isUSDTNotApproved &&
          < GreenBtn text="授權USDT" className="mt-7" action={approveUSDT} />
        }
        {
          isUSDNotApproved &&
          <GreenBtn text="授權USD" className="mt-7" action={approveUSDT} />
        }
      </div>

      <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
        <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
          輸入合成礦機數量
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
      < GreenBtn text="合成" className="mt-7" action={mintMiner} />

      <div>
        <p className="text-xs text-bgray-500 dark:text-white mb-2">
          礦機持有數量
        </p>
        <div className="flex space-x-4 items-end">
          <span className="text-bgray-900 dark:text-white font-bold text-2xl leading-[30px]">
            10
          </span>
          {/* <span className="text-xs font-medium text-success-300">+2,5%</span> */}
        </div>
      </div>
    </div>
  );
}

export default SummaryV2;
