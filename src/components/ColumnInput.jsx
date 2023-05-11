import { memo } from "react";
import DropdownInput from "./DropdownInput";

const ColumnInputs = ({ columns, studentId, handleInputChange, options }) => {
  return columns.map((column, index) => (
    <td key={index} className="border px-4 py-2">
      <DropdownInput
        value={column}
        onChange={(value) => handleInputChange(value, studentId, index)}
        options={options}
      />
    </td>
  ));
};

export default memo(ColumnInputs);