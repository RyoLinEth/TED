import { useState } from "react";
import AddBalance from "../../component/addBalance/AddBalance";

function MyWallet() {
  const [withdrawableAmount, setWithdrawableAmount] = useState(1);
  const [claimedAmount, setClaimedAmount] = useState(0);

  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-[424px]">
          <AddBalance
            title="可領取 TED"
            content={withdrawableAmount}
            currency="TED"
            showSvgContent={true}
            showButton={true}
          />
          
          <AddBalance
            title="已領取 TED"
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
