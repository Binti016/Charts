import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell} from 'recharts';
import {useState} from 'react';

const data = [
  { product: "ghh", totalValue: 40, totalSales: 15 },
  { product: "dww", totalValue: 30, totalSales: 10 },
  { product: "aaa", totalValue: 10, totalSales: 10 },
  { product: "ooo", totalValue: 17, totalSales: 8 },
  { product: "hgt", totalValue: 40, totalSales: 7 },
  { product: "ytt", totalValue: 26, totalSales: 7 },
  { product: "qyy", totalValue: 18, totalSales: 7 },
  { product: "prp", totalValue: 20, totalSales: 7 },
  { product: "eee", totalValue: 15, totalSales: 7 },
  { product: "rtt", totalValue: 23, totalSales: 4 },
];

const getBarColor = (value) => {
  const max = Math.max(...data.map(item => item.totalValue));
  const min = Math.min(...data.map(item => item.totalValue));
  const ratio = (value - min) / (max - min);

  if (ratio < 0.2) return "#FFE0B2";
  if (ratio < 0.4) return "#FFCC80";
  if (ratio < 0.6) return "#FF9800";
  if (ratio < 0.8) return "#E65100";
  return "#5D1900";
};

const CustomBar = (props) => {
  const {x, y, width, height, fill, payload, index, isActive, onMouseEnter, onMouseLeave} = props;

  const tooltipWidth = 120;
  const tooltipHeight = 60;

  return(
    <g
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      {isActive && (
        <foreignObject
          x={x + width - tooltipWidth + 5}
          y={y - tooltipHeight - 10}
          width={tooltipWidth}
          height={tooltipHeight + 10}
        >
          <div xmlns="http://www.w3.org/1999/xhtml" style={{
            position: "relative",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 6px",
            fontSize: "12px",
            lineHeight: "1.4",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            textAlign: "left",
            pointerEvents: "none",
            width: `${tooltipWidth}px`
          }}>
          <div className='text-slate-500'>
            <div>Product={payload.product}</div>
            <div>TotalSales={payload.totalSales}</div>
            <div>TotalValue={payload.totalValue}</div>
          </div>

            <div style={{
              position: "absolute",
              bottom: -6,
              left: "calc(100% - 18px)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #ccc",
              zIndex: 1
            }}>
            </div>

            <div style={{
              position: "absolute",
              bottom: -5,
              left: "calc(100% - 18px)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid white",
              zIndex: 2
            }}></div>
          </div>
        </foreignObject>
      )}
      <rect x={x} y={y} width={width} height={height} fill={fill} />
    </g>
  );
};

export default function BarChartComponent() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto flex">
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-2 text-center">Task 1a: Bar Chart</h1>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={data}
            margin={{ top: 60, right: 30, left: 40, bottom: 40 }}
            barCategoryGap={5}
          >
            <CartesianGrid vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="product"
              tickLine={false}
              axisLine={false}
              label={{ value: "Product", position: "insideBottom", offset: -25 }}
            />
            <YAxis
              domain={[0, 15]}
              ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              label={{ value: "TotalSales", angle: -90, position: "insideLeft", offset: 5 }}
            />
            <Bar
              dataKey="totalSales"
              shape={(props) =>
                <CustomBar
                  {...props}
                  isActive={hoveredIndex === props.index}
                  onMouseEnter={setHoveredIndex}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.totalValue)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="ml-6 flex flex-col items-center justify-center relative">
        <div className="text-sm mb-1 text-slate-400">TotalValue</div>
          <div className="relative" style={{ height: '420px', width: '50px' }}>
          <div style={{
            height: '100%',
            width: '15px',
            background: 'linear-gradient(to bottom, #5D1900, #E65100, #FF9800, #FFCC80, #FFE0B2)',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
        </div>

          <div style={{
            position: 'absolute',
            left: 22,
            top: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {[40, 35, 30, 25, 20, 15, 10].map((value, index) => (
              <div key={index} style={{ fontSize: '12px', color:'slategray' }}>{value}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
