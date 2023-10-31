import profile from "../../assets/images/avatar/profile-52x52.png";
import ProtoTypes from "prop-types";

function Author({ walletConnect, defaultAccount }) {
  const showWalletText = defaultAccount === undefined || defaultAccount === null
    ? "连接钱包"
    : defaultAccount.slice(0, 4) + "..." + defaultAccount.slice(-4);

  return (
    <div
      onClick={() => walletConnect(true)}
      className="flex cursor-pointer space-x-0 lg:space-x-3 z-30"
    >
      {/* <div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300">
        <img className="object-cover" src={profile} alt="avater" />
      </div> */}
      <div className="hidden 2xl:block">
        <div className="flex items-center space-x-2.5">
          <h3 className="text-base font-bold leading-[28px] text-bgray-900 dark:text-white">
            {showWalletText}
          </h3>
        </div>
        {/* <p className="text-sm font-medium leading-[20px] text-bgray-600 dark:text-bgray-50">
          Super Admin
        </p> */}
      </div>
    </div>
  );
}

Author.propTypes = {
  showProfile: ProtoTypes.func,
};

export default Author;
