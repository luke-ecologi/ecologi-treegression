import { useCallback, useMemo, useState } from "react";
import { useDailyTreeCounts } from "../../hooks/useDailyTreeCounts";
import { TreeCounterChart } from "../charts/TreeCounterChart";
import { GraphToolbar } from "./GraphToolbar";
import { DateRange } from "../../types/DateRange";

import "./InteractiveTreeGraph.scss";

export const InteractiveTreeGraph = () => {
  const [cumulative, setCumulative] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const handleRangeChange = useCallback(
    (range: DateRange | null) => {
      setDateRange(range);
    },
    [setDateRange]
  );

  const getTickSpacing = useMemo(() => {
    if (dateRange) {
      const weeks = Math.round(
        (dateRange?.maxDate - dateRange?.minDate) / (7 * 24 * 60 * 60 * 1000)
      );
      if (weeks <= 2) {
        return "day";
      } else if (weeks <= 16) {
        return "week";
      } else {
        return "month";
      }
    } else {
      return "month";
    }
  }, [dateRange]);

  const {
    data: treeCounts,
    isLoading,
    isFetching,
  } = useDailyTreeCounts(dateRange);

  return (
    <div className="graph-container">
      <GraphToolbar
        cumulative={cumulative}
        onCumulativeSwitch={() => setCumulative((prev) => !prev)}
        onRangeChange={handleRangeChange}
        className="graph-toolbar"
      />
      <TreeCounterChart
        treeCounts={treeCounts || []}
        cumulative={cumulative}
        loading={isLoading || isFetching}
        tickSpacing={getTickSpacing}
        className="tree-chart"
      />
    </div>
  );
};
