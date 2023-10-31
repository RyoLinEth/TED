import ProtoTypes from "prop-types";
import PieChart from "../chart/PieChart";
import MonthFilter from "../forms/MonthFilter";

function Efficiency({ width, height }) {
  return (
    <div className="hidden flex-1 xl:block">
      <div className="rounded-lg bg-white dark:bg-darkblack-600">
        <div className="flex items-center justify-between border-b border-bgray-300 px-[20px] py-[12px] dark:border-darkblack-400">
          <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
            Efficiency
          </h3>
          {/* <MonthFilter options={["January", "February", "March"]} /> */}
        </div>
        <div className="px-[20px] py-[12px]">
          <div className="mb-4 flex items-center space-x-8">
            <div
              className={`relative ${width ? width : "w-[180px]"} ${height && height
                }`}
            >
              <PieChart />
              <div
                className="absolute z-0 h-[34px] w-[34px] rounded-full bg-[#EDF2F7]"
                style={{ left: "calc(50% - 17px)", top: "calc(50% - 17px)" }}
              >
              </div>
            </div>
          </div>
          <div className="status">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-2.5 w-2.5 rounded-full bg-success-300"></div>
                <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                  Mined
                </span>
              </div>
              <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
                0%
              </p>
            </div>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-2.5 w-2.5 rounded-full bg-warning-300"></div>
                <span className="text-sm font-medium text-bgray-600 dark:text-white">
                  Rest
                </span>
              </div>
              <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
                100%
              </p>
            </div>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-2.5 w-2.5 rounded-full bg-bgray-200"></div>
                <span className="text-sm font-medium text-bgray-600 dark:text-white">
                  Total
                </span>
              </div>
              <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
                100%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Efficiency.propTypes = {
  width: ProtoTypes.string,
  height: ProtoTypes.string,
};

export default Efficiency;
