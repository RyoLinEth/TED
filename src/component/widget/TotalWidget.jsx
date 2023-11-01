import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";

function TotalWidget() {
  const { defaultAccount } = useContext(MyContext)
  const connectWalletText = "請連接錢包"
  const [tedPrice, setTedPrice] = useState(connectWalletText);
  const [tedAmount, setTedAmount] = useState(connectWalletText);

  useEffect(() => {
    const setData = () => {
      setTedPrice("0");
      setTedAmount("0");
    }
    if (defaultAccount === null || defaultAccount === undefined) return;
    setData();
  }, [defaultAccount])

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
