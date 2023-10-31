import Wallet from "../../component/wallet";
import TeamChat from "../../component/teamChat";
import HistoryTable from "../../component/listTab/HistoryTable";

function History() {
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-[48px] xl:pb-[48px] dark:bg-darkblack-700">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <HistoryTable />
        </section>
        <section className="2xl:w-[400px] w-full flex flex-col lg:flex-row 2xl:space-x-0 2xl:flex-col lg:space-x-6 space-x-0">
          <Wallet />
          <TeamChat />
        </section>
      </div>
      {/* write your code here */}
    </main>
  );
}

export default History;
