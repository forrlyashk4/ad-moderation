import { Input } from "antd";
import { memo } from "react";

import styles from "./AdListFilters.module.css";

export const SearchFilter = memo(function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  return (
    <Input
      className={styles.search}
      value={value === "" ? undefined : value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск по названию"
    />
  );
});
