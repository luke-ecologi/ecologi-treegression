import { DailyTreeCount } from "../types/DailyTreeCount";
import treeCounts from "./transformedResponse.json";
import { DateRange } from "../types/DateRange";

const mockDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getTreeCountsMock = async (
  dateRange: DateRange | null
): Promise<DailyTreeCount[]> => {
  await mockDelay(1000);

  if (dateRange) {
    var filteredCounts: DailyTreeCount[] = [];
    treeCounts.forEach((treeCount) => {
      if (
        treeCount.timestamp <= dateRange.maxDate &&
        treeCount.timestamp >= dateRange.minDate
      ) {
        filteredCounts.push(treeCount);
      }
    });
    return filteredCounts;
  } else {
    return treeCounts;
  }
};

export const getTreeCounts = getTreeCountsMock;
