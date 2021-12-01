import {
  Toolbar,
  Switch,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { DateRange } from "../../../types/DateRange";

interface GraphToolbarProps {
  cumulative: boolean;
  onCumulativeSwitch: () => void;
  onRangeChange: (range: DateRange | null) => void;
  className: string;
}

enum SelectedTreeDates {
  None = "None",
  "7d" = "7d",
  "1m" = "1m",
  "3m" = "3m",
  "6m" = "6m",
  "1y" = "1y",
  custom = "custom",
}

export const GraphToolbar: FC<GraphToolbarProps> = ({
  cumulative,
  onCumulativeSwitch,
  onRangeChange,
}) => {
  const [selectedRange, setSelectedRange] = useState<SelectedTreeDates>(
    SelectedTreeDates.None
  );

  useEffect(() => {
    const maxDate = new Date();
    let minDate = new Date();
    switch (selectedRange) {
      case SelectedTreeDates.None:
        onRangeChange(null);
        return;
      case SelectedTreeDates["7d"]:
        minDate = new Date(minDate.setDate(minDate.getDate() - 7));
        break;
      case SelectedTreeDates["1m"]:
        minDate = new Date(minDate.setMonth(minDate.getMonth() - 1));
        break;
      case SelectedTreeDates["3m"]:
        minDate = new Date(minDate.setMonth(minDate.getMonth() - 3));
        break;
      case SelectedTreeDates["6m"]:
        minDate = new Date(minDate.setMonth(minDate.getMonth() - 6));
        break;
      case SelectedTreeDates["1y"]:
        minDate = new Date(minDate.setMonth(minDate.getMonth() - 12));
        break;
      case SelectedTreeDates.custom:
        alert("Customer filtering hasn't been implemented yet!");
        onRangeChange(null);
        return;
    }
    onRangeChange({ minDate: minDate.getTime(), maxDate: maxDate.getTime() });
  }, [onRangeChange, selectedRange]);

  return (
    <Toolbar>
      <Tooltip title={`Toggle cumulative ${cumulative ? "off" : "on"}`}>
        <Switch checked={cumulative} onChange={onCumulativeSwitch} />
      </Tooltip>
      <ToggleButtonGroup
        size="small"
        value={selectedRange}
        onChange={(event, newRange: SelectedTreeDates) =>
          setSelectedRange(newRange)
        }
        exclusive
      >
        {Object.entries(SelectedTreeDates).map(([key, value]) => (
          <Tooltip
            title={
              value === SelectedTreeDates.None
                ? "Clear date filter"
                : value === SelectedTreeDates.custom
                ? "Custom date range"
                : `Filter to last ${value}`
            }
            key={key}
          >
            <ToggleButton
              value={key}
              selected={key === selectedRange}
              disabled={key === selectedRange}
              color="primary"
            >
              {value}
            </ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Toolbar>
  );
};
