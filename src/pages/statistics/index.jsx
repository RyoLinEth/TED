import ListTab from "../../component/listTab";
import Wallet from "../../component/wallet";
import Calender from "../../component/calender";
import Efficiency from "../../component/revenueFlow/Efficiency";
import SummaryV2 from "../../component/summary/SummaryV2";
import LocationV2 from "../../component/location";
import TaskSummary from "../../component/summary/TaskSummary";
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import MyContext from "../../DataProvider";

function Statistics() {
  const [linkInviter, setLinkInviter] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const inviterFromSessionStorage = sessionStorage.getItem('inviter');

    if (inviterFromSessionStorage !== null) {
      setLinkInviter(inviterFromSessionStorage);
    }

    fetchData(inviterFromSessionStorage);
  }, []);

  const fetchData = (inviterFromSessionStorage) => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const tempInviter = searchParams.get('inviter');

      if (tempInviter !== null && tempInviter !== inviterFromSessionStorage) {
        sessionStorage.setItem('inviter', tempInviter);
        setLinkInviter(tempInviter);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="w-full mb-[24px] xl:flex xl:space-x-[24px]">
            <SummaryV2 height="h-[180px]" inviter={linkInviter} />
          </div>
        </section>
        {/* <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
          <Wallet />
        </section> */}
      </div>
    </main>
  );
}

export default Statistics;
