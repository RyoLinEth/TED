import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import AddBalance from "../../component/addBalance/AddBalance";
import MyContext from "../../DataProvider";
import MinerABI from "../../assets/abi/MinerABI.json"
import USDTABI from "../../assets/abi/USDTABI.json"
import Popup from "../../component/Popup/Popup";
import swal from "sweetalert";

function MyWallet() {
  const { defaultAccount, MinerContractAddress, TEDAddress } = useContext(MyContext);

  
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const [claimedAmount, setClaimedAmount] = useState(0);
  const [TEDAmount, setTEDAmount] = useState(0);
  const [TEDDecimals, setTEDDecimals] = useState(0);
  const [TEDPerHour, setTEDPerHour] = useState(0);
  const [claimableValue, setClaimableValue] = useState(0);
  const [MinerContract, setMinerContract] = useState(null);
  const [provider, setProvider] = useState(0);

  useEffect(() => {
    if (defaultAccount === null || defaultAccount === undefined) return;

    if (TEDAddress === null || TEDAddress === undefined) return;
    console.log(2)
    updateEthers();
  }, [defaultAccount])

  const updateEthers = async () => {
    console.log("Updating Ethers")
    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      const tempSigner = tempProvider.getSigner();
      //  合約資料
      const tempTEDContract = new ethers.Contract(TEDAddress, USDTABI, tempSigner)
      // setTEDContract(tempTEDContract);

      const tempTEDBalance = await tempTEDContract.balanceOf(defaultAccount);
      const tempTEDDecimal = await tempTEDContract.decimals();
      setTEDDecimals(tempTEDDecimal);

      const realAmount = ethers.utils.formatUnits(`${tempTEDBalance}`, tempTEDDecimal);
      const result = Number.isInteger(realAmount) ? realAmount : Number(realAmount).toFixed(4);

      setTEDAmount(result)

      const tempMinerContract = new ethers.Contract(MinerContractAddress, MinerABI, tempSigner);
      setMinerContract(tempMinerContract);

      const tempPowerPerHour = await tempMinerContract.powerPerHour(defaultAccount);
      const realPowerPerHour = ethers.utils.formatUnits(`${tempPowerPerHour}`,tempTEDDecimal);
      const powerResult = Number.isInteger(realPowerPerHour)
      ? realPowerPerHour
      : Number(realPowerPerHour).toFixed(4);

      setTEDPerHour(powerResult)

      const tempClaimableValue = await tempMinerContract.claimableTEDAmount(defaultAccount);
      const realClaimableValue = ethers.utils.formatUnits(`${tempClaimableValue}`,tempTEDDecimal);
      const valueResult = Number.isInteger(realClaimableValue)
      ? realClaimableValue / 2
      : Number(realClaimableValue / 2).toFixed(4);

      console.log(valueResult)
      setClaimableValue(valueResult)

      const tempClaimedValue = await tempMinerContract.TEDClaimed(defaultAccount);
      const realClaimedValue = ethers.utils.formatUnits(`${tempClaimedValue}`,tempTEDDecimal);
      const claimedResult = Number.isInteger(realClaimedValue)
      ? realClaimedValue / 2
      : Number(realClaimedValue / 2).toFixed(4);

      console.log(claimedResult)
      setClaimedAmount(claimedResult)
    } catch (err) {
      console.log(err)
    }
  }
  
  const setPopup = (title, content) => {
    setShowPopup(true);
    setPopupTitle(title);
    setPopupContent(content);
  }

  const handleWithdraw = async () => {
    
    setPopup("領取TED","正在領取TED...")
    try {
    console.log("Withdrawing")
    const result = await MinerContract.claimReward();

    provider
      .getTransaction(result.hash)
      .then((tx) => {
        // 監聽交易上鍊事件
        tx.wait().then(async (receipt) => {
          //  授權成功
          console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
          setPopup("成功提領", `${claimableValue} TED 已成功提領`);
          setIsUSDTNotApproved(false);
          const tempUSDTAllowance = await USDTContract.allowance(defaultAccount, MinerContractAddress);
          const realUSDTAllowance = ethers.utils.formatUnits(`${tempUSDTAllowance}`, USDTDecimal);
          const result = Number.isInteger(realUSDTAllowance)
            ? realUSDTAllowance
            : Number(realUSDTAllowance).toFixed(4);
          // setUSDTAllowance(result)
        })
      })
    } catch (err) {
      swal("Error", err.reason, "error");
      setShowPopup(false)
    }
  }
  const closePopup = () => {
    setShowPopup(false);
  };



  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      {showPopup && (
        <Popup onClose={closePopup}>
          <h2 className="text-base xl:text-2xl text-bgray-900 dark:text-white font-bold">
            {popupTitle}
          </h2>
          <p>{popupContent}</p>
        </Popup>
      )}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-[424px]">
          <AddBalance
            title="礦機每小時收益"
            content={TEDPerHour}
            currency="USDT"
            showSvgContent={false}
            showButton={false}
          />
        </section>
        <section className="2xl:w-[424px]">
          <AddBalance
            title="可領取收益"
            content={claimableValue}
            currency="TED"
            showSvgContent={true}
            showButton={true}
            showMark={false}
            action={handleWithdraw}
          />
          <AddBalance
            title="待返傭收益"
            content={claimableValue}
            currency="TED"
            showSvgContent={false}
            showButton={false}
          />
        </section>
        <section className="2xl:w-[424px]">
          <AddBalance
            title="已領取 TED 收益"
            content={claimedAmount}
            currency="TED"
            showSvgContent={false}
            showButton={false}
          />
          <AddBalance
            title="已返傭 TED"
            content={claimedAmount}
            currency="TED"
            showSvgContent={false}
            showButton={false}
          />
          {/* <Wallet /> */}
        </section>
      </div>
    </main>
  );
}

export default MyWallet;
