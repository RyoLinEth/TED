import React, { useContext, useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import Sidebar from "../sidebar";
import Overlay from "../overlay";
import SidebarV2 from "../sidebar/SidebarV2";
import HeaderOne from "../header/HeaderOne";
import HeaderTwo from "../header/HeaderTwo";
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import MyContext from "../../DataProvider";
import swal from "sweetalert";

export const ThemeContext = createContext(null);

function Layout({ bg, overlay, children }) {
  const { defaultAccount, setDefaultAccount } = useContext(MyContext)
  // const [defaultAccount, setDefaultAccount] = useState(null)
  const [correctNetwork, setCorrectNetwork] = useState(null);

  useEffect(() => {
    changingAccount();
  }, [defaultAccount])

  async function changingAccount() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connectWalletHandler()
      })
    }
  }

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(async (result) => {
          await accountChangeHandler(result[0]);
        })
    } else {
      alert('Need to install MetaMask!')
    }
  }

  const accountChangeHandler = async (newAccount) => {
    checkCorrectNetwork();
    setDefaultAccount(newAccount);
  }

  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    // console.log('Connected to chain:' + chainId)

    // const netWorkID = '0x42'
    // const netWorkID = '0x61'
    const netWorkID = '0x38'

    if (chainId !== netWorkID) {
      // setCorrectNetwork(network => network = false)
      setCorrectNetwork(false)
      swal("網路錯誤", "請連接到正確網路", "error")
    } else {
      setCorrectNetwork(true)
    }
  }

  const handleWalletConnect = (value) => {
    console.log("Connecting wallet...")
    connectWalletHandler()
  }


  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "" || localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : ""
  );

  const handleSidebarActive = () => {
    console.log("Handling Sidebar")
    console.log(sidebar)
    if (!sidebar) setSidebar(!sidebar);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`layout-wrapper ${sidebar && "active"
          }  w-full dark:bg-darkblack-600 `}
        style={{
          borderColor: "#2a313c",
        }}
      >
        <div className="relative flex w-full">
          <Sidebar handleActive={() => handleSidebarActive()} />
          {overlay ? overlay : <Overlay />}
          <SidebarV2/>
          <div
            className={`body-wrapper flex-1 overflow-x-hidden ${bg ? bg : "dark:bg-darkblack-500"
              } `}
          >
            {/* PC版 排版 */}
            <HeaderOne
              handleSidebar={() => setSidebar(!sidebar)}
              isConnectingWallet={handleWalletConnect}
            />
            {/* 手機板排版 */}
            <HeaderTwo handleSidebar={() => setSidebar(!sidebar)}
              isConnectingWallet={handleWalletConnect}
            />
            <Outlet />
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;
