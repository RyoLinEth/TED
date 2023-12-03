import { useState } from "react";
import mastar from "../../assets/images/payments/master-mini.svg";

function PaymentFilter({ amount, setPercentage, tokenName }) {
  const [activeFilter, setActiveFilter] = useState(false);
  const handlePercentageChosen = (value) => {
    setActiveFilter(!activeFilter);
    setPercentage(value)
  }
  return (
    <div className="payment-select relative mb-3">
      <button
        aria-label="none"
        onClick={() => setActiveFilter(!activeFilter)}
        type="button"
        className="flex h-[56px] w-full items-center justify-between overflow-hidden rounded-lg border border-bgray-200 px-5 dark:border-darkblack-400"
      >
        <div className="flex items-center space-x-2">
          <span>
            <img src={mastar} alt="master" />
          </span>
          <span className="text-sm font-medium text-bgray-900 dark:text-white">
            {tokenName} 余额
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
            {
              amount === null
                ? "请连接钱包"
                : amount
            }
          </span>
          <span className="text-sm font-medium text-bgray-900">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#A0AEC0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>
      <div
        id="paymentFilter"
        style={{ display: activeFilter ? "block" : "none" }}
        className="absolute right-0 top-full z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500"
      >
        <ul>
          <li
            onClick={() => handlePercentageChosen(25)}
            className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-semibold hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            25%
          </li>
          <li
            onClick={() => handlePercentageChosen(50)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            50%
          </li>
          <li
            onClick={() => handlePercentageChosen(75)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            75%
          </li>
          <li
            onClick={() => handlePercentageChosen(100)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            100%
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentFilter;
