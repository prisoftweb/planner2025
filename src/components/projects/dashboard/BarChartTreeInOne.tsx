//import { cx } from "@/lib/utils"
//import { BarChart, TooltipProps } from "@/components/BarChart";
import { BarChart } from "@tremor/react";
import { CustomTooltipProps } from "@tremor/react";
import { CurrencyFormatter } from "@/app/functions/Globals";

// interface Issue {
//     status: "completed" | "in progress" | "on hold";
//     value: number;
//     percentage: number;
// }

// interface DataEntry {
//     date: string;
//     issues: Issue[];
// }

export interface DataProjectsByType {
  project: string;
  issues: Issue[];
}

export interface Issue {
  status: "PROVEEDOR" | "MANO DE OBRA" | "OTROS"
  value: number
  percentage: number
}

const valueFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
};

const Tooltip = ({ payload, active, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  console.log('payload => ', payload);

  console.log('payload de payload => ', payload[0].payload);
  const title = payload[0].payload.project;
  const st = payload[0].dataKey;
  console.log('st => ', st);
  const data = payload.map((item:any) => ({
      //status: item.category as Issue["status"],
      status: item.dataKey,
      //value: item.value,
      value: CurrencyFormatter({
        currency: 'MXN',
        value: item.value,
      }),
      // percentage: (
      //     (item.value /
      //         (item.payload.completed +
      //             item.payload["in progress"] +
      //             item.payload["on hold"])) *
      //     100
      // ).toFixed(2),
      percentage: (
          (item.value /
              ((item.payload.PROVEEDOR || 0) +
                  (item.payload["MANO DE OBRA"] || 0) +
                  (item.payload["OTROS"] || 0))) *
          100
      ).toFixed(2),
  }));

  return (
    <>
      <div className="w-72 rounded-md border border-gray-500/10  bg-blue-500 px-4 py-1.5 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
        <p className="flex items-center justify-between">
          <span className="text-gray-50 dark:text-gray-50">
            Proyecto
          </span>
          {/* <span className="font-medium text-gray-50 dark:text-gray-50">{label}</span> */}
          <span className="font-medium text-gray-50 dark:text-gray-50">{title}</span>
        </p>
      </div>
      <div className="mt-1 w-72 space-y-1 rounded-md border border-gray-500/10  bg-white px-4 py-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
        {data.map((item: any, index:number) => (
          <div key={index} className="flex items-center space-x-2.5">
            <span
                // className={cx(
                //     status[item.status],
                //     "size-2.5 shrink-0 rounded-sm"
                // )}
                aria-hidden={true}
            />
            <div className="flex w-full justify-between">
              <span className=" text-gray-700 dark:text-gray-300">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
                  ({item.percentage}&#37;)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export function BarChartTreeInOne({data}:{data: DataProjectsByType[]}) {
  // Transform data into a format suitable for BarChart
  const formattedArray = data.map((entry) => {
    return {
        project: entry.project,
        ...entry.issues.reduce(
            (acc, issue) => {
                acc[issue.status] = issue.value;
                return acc;
            },
            {} as { [key in Issue["status"]]?: number }
        ),
    };
  });
  
  return (
    <div>
      <BarChart
        className="hidden h-72 sm:block"
        data={formattedArray}
        //index="project"
        index='status'
        categories={["PROVEEDOR", "MANO DE OBRA", "OTROS"]}
        //type="stacked"
        colors={["blue", "cyan", "violet"]}
        valueFormatter={valueFormatter}
        yAxisWidth={76}
        showLegend={false}
        customTooltip={Tooltip}
        stack
      />
      <BarChart
        className="h-80 sm:hidden"
        data={formattedArray}
        // index="project"
        index='status'
        categories={["PROVEEDOR", "MANO DE OBRA", "OTROS"]}
        //type="stacked"
        colors={["blue", "cyan", "violet"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        customTooltip={Tooltip}
        stack
        yAxisWidth={76}
      />
    </div>
  );
}