import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import React from "react";
import { JsxElement } from "typescript";

type Props = {
  value?: string;
  values: string[];
  onChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void);
  label: string;
  name: string;
  renderValue?: (value?: string) => React.ReactNode;
  className?: string;
}

export const Select:React.FC<Props> = ({
  value, 
  values, 
  onChange, 
  label, 
  name,
  renderValue = (v) => v,
  className = "w-40",
}) => {
  return (
    <FormControl className={className}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <MuiSelect
        labelId={`select-label-${label}`}
        id={`select-${label}`}
        name={name}
        value={value}
        renderValue={renderValue}
        label={label}
        onChange={onChange}
      >
        {values.map(v => (
          <MenuItem key={v} value={v}>{renderValue(v)}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}