import { useState } from "react";
import TransparentBtn from "../button/TransparentBtn";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from "sweetalert";

function AddBalance({ title, content, currency, showSvgContent, showButton, action, showMark }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    swal("复制成功", "专属链接复制成功", "success");
  }

  const SvgContent = () => {
    console.log("HI")
    return (
      <div className="flex gap-4">
        <span className="flex">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 5.83325L10.8333 12.4999L7.5 9.16659L2.5 14.1666M10.8333 5.83325H17.5H10.8333ZM17.5 5.83325V12.4999V5.83325Z"
              stroke="#00C566"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl bg-white dark:bg-darkblack-600 px-7 py-11 mb-[48px]">
      <div className="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-8 pb-12">
        <h3 className="text-2xl font-semibold text-bgray-900 dark:text-white">
          {title}
        </h3>
        <h2 className="text-xl font-bold font-poppins text-bgray-900 dark:text-white mb-2" style={{
          wordBreak: 'break-all'
        }}>
          {currency == "USDT" && "$"}{content}
          <span className="text-base font-medium uppercase text-bgray-500"
            style={{ marginLeft: '20px' }}>
            {currency}
          </span>
        </h2>
        {showSvgContent && <SvgContent />}
      </div>
      {
        showButton &&
        <div className="flex justify-center -mt-6" onClick={action}>
          <TransparentBtn title="领取TED" />
        </div>
      }
      {showMark &&
        <CopyToClipboard
          text={content}
          onCopy={() => setCopied(true)}
        >
          <div
            onClick={handleCopyLink}
            className="flex justify-center -mt-6"
          >
            <TransparentBtn title="复制链接" />
          </div>
        </CopyToClipboard>
      }
    </div>
  );
}

export default AddBalance;
