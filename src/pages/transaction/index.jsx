import Wallet from "../../component/wallet";
import Announcement from "../../pages/announcement";

function Transaction() {
  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div>
        <Announcement />
        <Wallet />
      </div>
    </main>
  );
}

export default Transaction;
