import ProtoTypes from "prop-types";
import bg from "../../assets/images/bg/upgrade-bg.png";
import logo from "../../assets/images/logo/logo-color.svg";
import logoW from "../../assets/images/logo/logo-white.svg";
import TEDLogo from "../../assets/images/logo/TED_LOGO.png";
import profileImg from "../../assets/images/avatar/profile-xs.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar({ handleActive }) {
  const RightArrow = () => {
    return (
      <span
        className={`transition-all ${activeDashboard ? "-rotate-90" : "rotate-0"
          }`}
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414376 10.5315C0.155618 10.855 0.208059 11.3269 0.531506 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
          />
        </svg>
      </span>
    )
  }
  const ProfitIcon = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4C20 1.79086 18.2091 0 16 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V4Z"
                fill="#1A202C"
                className="path-1"
              />
              <path
                d="M6 9C6 7.34315 4.65685 6 3 6H0V12H3C4.65685 12 6 10.6569 6 9Z"
                fill="#22C55E"
                className="path-2"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            我的收益
          </span>
        </div>
      </div>
    )
  }
  const LinksIcon = () => {
    return (

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="11.7778"
                cy="17.5555"
                rx="7.77778"
                ry="4.44444"
                className="path-1"
                fill="#1A202C"
              />
              <circle
                className="path-2"
                cx="11.7778"
                cy="6.44444"
                r="4.44444"
                fill="#22C55E"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            鏈接
          </span>
        </div>
      </div>
    )
  }

  const MinerIcon = () => {
    return (

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 11C18 15.9706 13.9706 20 9 20C4.02944 20 0 15.9706 0 11C0 6.02944 4.02944 2 9 2C13.9706 2 18 6.02944 18 11Z"
                fill="#1A202C"
                className="path-1"
              />
              <path
                d="M19.8025 8.01277C19.0104 4.08419 15.9158 0.989557 11.9872 0.197453C10.9045 -0.0208635 10 0.89543 10 2V8C10 9.10457 10.8954 10 12 10H18C19.1046 10 20.0209 9.09555 19.8025 8.01277Z"
                fill="#22C55E"
                className="path-2"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            礦機
          </span>
        </div>
      </div>
    )
  }
  
  const SwapIcon2 = () => {
    return (

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                fill="#1A202C"
                className="path-1"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                fill="#22C55E"
                className="path-2"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            USD Swap
          </span>
        </div>
      </div>
    )
  }

  const SwapIcon = () => {
    return (

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                fill="#1A202C"
                className="path-1"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                fill="#22C55E"
                className="path-2"
              />
              <path
                d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                fill="#22C55E"
                className="path-2"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            Swap
          </span>
        </div>
      </div>
    )
  }
  const HomeIcon = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path-1"
                d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z"
                fill="#1A202C"
              />
              <path
                className="path-2"
                d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z"
                fill="#22C55E"
              />
            </svg>
          </span>
          <span className="item-text text-lg font-medium leading-none">
            Home
          </span>
        </div>
      </div>
    )
  }
  const [activeDashboard, setActiveDashboard] = useState(false);
  const { pathname: location } = useLocation();

  return (
    <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">

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
        <button
          aria-label="none"
          type="button"
          onClick={handleActive}
          className="drawer-btn absolute right-0 top-auto"
          title="Ctrl+b"
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
                fill="#22C55E"
              />
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          <div className="item-wrapper mb-5">

            {/* 主選單 */}
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Menu
            </h4>
            <ul className="mt-2.5">
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/" ? "nav-active" : ""
                  } `}
              >
                <Link to="/">
                  <HomeIcon />
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/swap" ? "nav-active" : ""
                  } `}
              >
                <Link to="/swap">
                  <SwapIcon />
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/usdswap" ? "nav-active" : ""
                  } `}
              >
                <Link to="/usdswap">
                  <SwapIcon2 />
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/miner" ? "nav-active" : ""
                  } `}
              >
                <Link to="/miner">
                  <MinerIcon />
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/my-wallet" ? "nav-active" : ""
                  } `}
              >
                <Link to="/my-wallet">
                  <ProfitIcon />
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${location === "/users" ? "nav-active" : ""
                  } `}
              >
                <Link to="/users">
                  <LinksIcon />
                </Link>
              </li>
            </ul>
          </div>

        </div>
        <div className="upgrade-wrapper mb-[26px] h-[172px] w-full pr-[24px]">
          <div
            className="upgrade-banner relative h-full w-full rounded-lg"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div
              style={{ left: `calc(50% - 20px)`, top: `-20px` }}
              className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-white bg-success-300"
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 12.75C14 11.7835 13.1046 11 12 11C10.8954 11 10 11.7835 10 12.75C10 13.7165 10.8954 14.5 12 14.5C13.1046 14.5 14 15.2835 14 16.25C14 17.2165 13.1046 18 12 18C10.8954 18 10 17.2165 10 16.25"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 9.5V11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V19.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63246 11.1026C6.44914 8.65258 8.74197 7 11.3246 7H12.6754C15.258 7 17.5509 8.65258 18.3675 11.1026L19.3675 14.1026C20.6626 17.9878 17.7708 22 13.6754 22H10.3246C6.22921 22 3.33739 17.9878 4.63246 14.1026L5.63246 11.1026Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0859 7L9.91411 7L8.51303 5.39296C7.13959 3.81763 8.74185 1.46298 10.7471 2.10985L11.6748 2.40914C11.8861 2.47728 12.1139 2.47728 12.3252 2.40914L13.2529 2.10985C15.2582 1.46298 16.8604 3.81763 15.487 5.39296L14.0859 7Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <h1 className="mb-2 pt-8 text-center text-xl font-bold text-white">
              TED
            </h1>
            <p className="mb-2 px-7 text-center text-sm leading-5 text-white opacity-[0.5]">
              只漲不跌
            </p>
            <div className="flex justify-center">
              {/* <a href="/miner"> */}
              <Link to="/miner" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div className="flex h-[36px] w-[134px] justify-center rounded-lg bg-success-300 transition duration-300 ease-in-out hover:bg-success-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-semibold text-white">
                      開始挖礦
                    </span>
                    <span>
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33301 4H10.6663"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 6.66667L10.6667 4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 1.33325L10.6667 3.99992"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              {/* </a> */}
            </div>
          </div>
        </div>

        <div className="copy-write-text">
          <p className="text-sm text-[#969BA0]">© 2023 All Rights Reserved</p>
          <p className="text-sm font-medium text-bgray-700">
            <a
              href="https://dapp.tedusd.online/"
              target="_blank"
              className="border-b font-semibold hover:text-blue-600"
            >
              TED
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  handleActive: ProtoTypes.func,
};

export default Sidebar;
