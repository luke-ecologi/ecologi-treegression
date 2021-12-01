import { FC, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { DailyTreeCount } from "../../types/DailyTreeCount";
import { calculateCumulative } from "./TreeCounterChartHelpers";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

interface TreeCounterChartProps {
  treeCounts: DailyTreeCount[];
  cumulative: boolean;
  loading: boolean;
  tickSpacing: string;
  className: string;
}

export const TreeCounterChart: FC<TreeCounterChartProps> = ({
  treeCounts,
  cumulative,
  loading,
  tickSpacing,
}) => {
  const [plotCounts, setPlotCounts] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    if (cumulative) {
      setPlotCounts(
        calculateCumulative(treeCounts).map((count) => ({
          x: new Date(count.timestamp),
          y: count.treeCount,
        }))
      );
    } else {
      setPlotCounts(
        treeCounts.map((treeCounts) => ({
          x: new Date(treeCounts.timestamp),
          y: treeCounts.treeCount,
        }))
      );
    }
  }, [cumulative, treeCounts]);

  return (
    <>
      {loading && (
        <CircularProgress
          size="100px"
          sx={{
            zIndex: 1000,
            margin: "0 auto",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      <ResponsiveLine
        data={[
          {
            id: "treesCounts",
            data: plotCounts,
          },
        ]}
        margin={{
          top: 0,
          right: 0,
          bottom: 75,
          left: 100,
        }}
        enablePoints={false}
        xFormat="time:%d/%m/%Y"
        yFormat={(d) => `${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        xScale={{
          type: "time",
          format: "native",
          useUTC: true,
          precision: "day",
        }}
        tooltip={({ point }) => (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary">
                {point.data.yFormatted}
              </Typography>
              <Typography color="text.secondary">
                {point.data.xFormatted}
              </Typography>
            </CardContent>
          </Card>
        )}
        axisBottom={{
          format: "%Y-%m-%d",
          tickValues: `every 1 ${tickSpacing}`,
          tickRotation: -45,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        enablePointLabel={true}
        useMesh={true}
        axisLeft={{
          format: (d) =>
            `${d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: cumulative
            ? "Trees planted since start of period"
            : "Trees planted per day",
          legendPosition: "middle",
          legendOffset: -75,
        }}
        colors="#336341"
      />
    </>
  );
};
