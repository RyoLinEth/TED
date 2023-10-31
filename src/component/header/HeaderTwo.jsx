import ProtoTypes from "prop-types";
import logo from "../../assets/images/logo/logo-color.svg";
import logoW from "../../assets/images/logo/logo-white.svg";
import TEDLogo from "../../assets/images/logo/TED_LOGO.png";
import profile from "../../assets/images/avatar/profile-52x52.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ResProfilePopup from "./ResProfilePopup";
import MyContext from "../../DataProvider";

function HeaderTwo({ handleSidebar, isConnectingWallet }) {
  const [activePopup, handleActivePopup] = useState(false);
  const { defaultAccount } = useContext(MyContext);

  const showWalletText = defaultAccount === undefined || defaultAccount === null
    ? "连接钱包"
    : defaultAccount.slice(0, 4) + "..." + defaultAccount.slice(-4);

  const handleWalletConnect = () => {
    isConnectingWallet(true);
  }
  return (
    <div>
      <header className="mobile-wrapper fixed z-20 block w-full md:hidden">
        <div className="flex h-[80px] w-full items-center justify-between bg-white dark:bg-darkblack-600">
          <div className="flex h-full w-full items-center space-x-5">
            <button
              aria-label="none"
              type="button"
              className="drawer-btn rotate-180 transform"
              onClick={handleSidebar}
            >
              <span>
                <svg
                  width="16"
                  height="40"
                  viewBox="0 0 16 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M10 15L6 20.0049L10 25.0098"
                    stroke="#A0AEC0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div>

              {/* 手機板 LOGO */}
              <Link to="/" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img
                  src={TEDLogo}
                  style={{
                    width: '52px'
                  }}
                  className="block dark:hidden" alt="logo" />
                <span style={{
                  fontWeight: 'bold',
                  paddingLeft: '10px'
                }}>
                  TED DApp
                </span>
              </Link>

            </div>
          </div>
          <div className="mr-6">
            <div
              onClick={() => handleWalletConnect()}
              className="flex cursor-pointer"
            >
              <span>
              {showWalletText}
              </span>
            </div>
          </div>
        </div>
      </header>
      <ResProfilePopup isActive={activePopup} />
    </div>
  );
}

HeaderTwo.propTypes = {
  handleSidebar: ProtoTypes.func,
};

export default HeaderTwo;
