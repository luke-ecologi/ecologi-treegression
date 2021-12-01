import { DailyTreeCount } from "../../types/DailyTreeCount";

export const calculateCumulative = (
  treeCounts: DailyTreeCount[]
): DailyTreeCount[] => {
  var cumulativeTreeCounts: DailyTreeCount[] = [];
  var count = 0;
  treeCounts.forEach((treeCount) => {
    count += treeCount.treeCount;
    cumulativeTreeCounts.push({
      treeCount: count,
      timestamp: treeCount.timestamp,
    });
  });
  return cumulativeTreeCounts;
};
