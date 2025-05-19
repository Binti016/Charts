import GaugeChart from 'react-gauge-chart';
import {useState} from 'react';

const revenueData = {
  January: 100000,
  February: 200000,
  March: 312000,
  April: 400000,
  May: 500000,
  June: 600000,
  July: 700000,
  August: 800000,
  September: 900000,
  October: 1000000,
  November: 5100000,
  December: 10000000,
};

export default function GaugeChartComponent() {
  const [month, setMonth] = useState(null);
  const value = month ? revenueData[month] : 0;
  const maxValue = 10000000;
  const percentage = value / maxValue;

  const getCategory = () => {
    if (!month) return null;
    if (value <= 3000000) return 'Low';
    if (value < 7000000) return 'Medium';
    return 'High';
  };

  const formatValue = (val) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}m`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toString();
  };

  return (
    <div className="w-full flex flex-col items-center py-4 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-8 md:mb-20 text-center">Task 1b: Gauge Chart</h1>

      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 md:gap-8 lg:gap-16 px-4">
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:overflow-visible w-full lg:w-auto justify-center">
          {Object.keys(revenueData).map((m) => (
            <button
              key={m}
              onClick={() => setMonth(m)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium shadow transition-colors whitespace-nowrap ${
                month === m
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center relative order-first lg:order-none my-4 lg:my-0">
          <div className="relative w-[280px] h-[140px] md:w-[320px] md:h-[160px]">
            <GaugeChart
              id="revenue-gauge"
              nrOfLevels={420}
              arcsLength={[0.3, 0.4, 0.3]}
              percent={month ? percentage : 0}
              colors={['#FF3B30', '#F7B801', '#4285F4']}
              arcPadding={0.005}
              arcWidth={0.1}
              textColor="#000"
              needleColor="#464A4F"
              needleBaseColor="#464A4F"
              formatTextValue={() => ''} 
              style={{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:0,
                left:0,
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="text-black text-lg font-bold">
                {month ? formatValue(value) : '0'}
              </div>
            </div>

            <div className="text-slate-400 text-[10px] md:text-xs">
              <div className="absolute left-[1px] top-[95px] md:top-[110px]">10.0k -</div>
              <div className="absolute left-[10px] top-[65px] md:top-[75px]">1.0m -</div>
              <div className="absolute left-[40px] top-[15px] md:left-[50px]">3.0m -</div>
              <div className="absolute left-[120px] top-[-10px] md:left-[135px]">- 5.0m</div>
              <div className="absolute right-[40px] top-[15px] md:right-[50px]">- 7.0m</div>
              <div className="absolute right-[10px] top-[65px] md:top-[75px]">- 9.0m</div>
              <div className="absolute right-[1px] top-[95px] md:top-[110px]">- 10.0m</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start justify-center mt-1 order-last">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 text-xs md:text-sm rounded">
              Status:
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-700">
              {month ? (
                <span>{getCategory()}</span>
              ) : (
                <div>
                  <div className='mt-5'>Select a month to view the</div>
                  <div className='ml-8'>status</div>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}