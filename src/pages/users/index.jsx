import { useContext, useEffect, useState } from "react";
import AddBalance from "../../component/addBalance/AddBalance";
import MyContext from "../../DataProvider";

function Users() {
  const defaultLink = "https://dapp.tedusd.online/?inviter=";
  const { defaultAccount } = useContext(MyContext);

  const [personalLink, setPersonalLink] = useState(null);
  
  const getPersonalLink = () => {
    setPersonalLink(defaultLink + defaultAccount);
  }

  useEffect(() => {
    getPersonalLink()
  }, [defaultAccount])
  return (

    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-[2000px]">
          <AddBalance
            title="個人邀請鏈接"
            content={personalLink}
            showMark={true}
            showSvgContent={false}
            showButton={false}
          />
        </section>
      </div>
    </main>
  );
}

export default Users;
