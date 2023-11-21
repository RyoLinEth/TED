import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import AddBalance from "../../component/addBalance/AddBalance";
import MyContext from "../../DataProvider";
import MinerABI from "../../assets/abi/MinerABI.json"
import USDTABI from "../../assets/abi/USDTABI.json"

function MyWallet() {
  const { defaultAccount, MinerContractAddress, TEDAddress } = useContext(MyContext);

  const [claimedAmount, setClaimedAmount] = useState(0);
  const [TEDAmount, setTEDAmount] = useState(0);
  const [TEDDecimals, setTEDDecimals] = useState(0);
  const [TEDPerHour, setTEDPerHour] = useState(0);
  const [claimableValue, setClaimableValue] = useState(0);
  const [MinerContract, setMinerContract] = useState(null);

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

  const handleWithdraw = async () => {
    console.log("Withdrawing")
    await MinerContract.claimReward();
  }

  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
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
            action={handleWithdraw}
          />
          <AddBalance
            title="待返傭收益"
            content={claimableValue}
            currency="TED"
            showSvgContent={false}
            showButton={false}
            action={handleWithdraw}
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
