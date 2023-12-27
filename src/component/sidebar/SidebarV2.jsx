import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/logo-short.svg";
import logoW from "../../assets/images/logo/logo-short-white.svg";
import TEDLogo from "../../assets/images/logo/TED_LOGO.png";

function SidebarV2() {
  const { pathname: location } = useLocation();
  const HomeIcon = () => {
    return (
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
    )
  }
  const FomoIcon = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 7.5V16.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 6V2H18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17 7L22 2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    )
  }
  const SwapIcon = () => {
    return (<span className="item-ico">
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
    )
  }

  const MinerIcon = () => {
    return (

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
    )
  }

  const ProfitIcon = () => {
    return (
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
    )
  }
  const LinksIcon = () => {
    return (
      <span className="item-ico">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="7"
            cy="14"
            rx="7"
            ry="4"
            className="path-1"
            fill="#1A202C"
          />
          <circle
            cx="7"
            cy="4"
            r="4"
            fill="#22C55E"
            className="path-2"
          />
        </svg>
      </span>
    )
  }
  return (
    <aside className="relative hidden w-[96px] bg-white  dark:bg-darkblack-600 sm:block">
      <div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
        <div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
          <Link to="/">
            {/* <img src={logo} className="block dark:hidden" alt="logo" /> */}
            <img src={TEDLogo} alt="logo" style={{ width: '50px' }} />
          </Link>
        </div>
        <div className="sidebar-body w-full pt-[14px]">
          <div className="flex flex-col items-center">
            <div className="nav-wrapper mb-[36px]">
              <div className="item-wrapper mb-5">
                <ul className="mt-2.5 flex flex-col items-center justify-center">

                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/"
                      className={`${location === "/" ? "nav-active" : ""
                        }`}
                    >
                      <HomeIcon />
                    </Link>
                  </li>

                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/swap"
                      className={`${location === "/swap" ? "nav-active" : ""
                        }`}
                    >
                      <SwapIcon />
                    </Link>
                  </li>

                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/miner"
                      className={`${location === "/miner" ? "nav-active" : ""
                        }`}
                    >
                      <MinerIcon />
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/my-wallet"
                      className={`${location === "/my-wallet" ? "nav-active" : ""
                        }`}
                    >
                      <ProfitIcon />
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/users"
                      className={`${location === "/users" ? "nav-active" : ""}`}
                    >
                      <LinksIcon />

                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link
                      to="/users"
                      className={`${location === "/fomo" ? "nav-active" : ""}`}
                    >
                      <FomoIcon />

                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="upgrade-wrapper">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-success-300">
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
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarV2;
