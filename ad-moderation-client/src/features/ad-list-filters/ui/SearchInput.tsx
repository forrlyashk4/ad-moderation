import { Input } from "antd";
import { memo } from "react";

export const SearchFilter = memo(function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  return (
    <Input
      style={{ width: 240 }}
      value={value === "" ? undefined : value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск по названию"
    />
  );
});
