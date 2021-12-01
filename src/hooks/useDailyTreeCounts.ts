import { useQuery } from "react-query";
import { getTreeCounts } from "../api-requests/treeCounts";
import { DailyTreeCount } from "../types/DailyTreeCount";
import { DateRange } from "../types/DateRange";

export function useDailyTreeCounts(dateRange: DateRange | null) {
  return useQuery<DailyTreeCount[]>(
    ["treeCounts", dateRange],
    () => getTreeCounts(dateRange),
    {
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );
}
