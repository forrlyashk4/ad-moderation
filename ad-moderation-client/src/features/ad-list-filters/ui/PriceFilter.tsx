import { Input } from "antd";
import { memo } from "react";

import styles from "./AdListFilters.module.css";

export const PriceFilter = memo(function PriceFilter({
  minPrice,
  maxPrice,
  onChangeMin,
  onChangeMax,
}: {
  minPrice: string;
  maxPrice: string;
  onChangeMin: (nextStatus: string) => void;
  onChangeMax: (nextStatus: string) => void;
}) {
  return (
    <div>
      <Input
        className={styles.price}
        value={minPrice === "" ? undefined : minPrice}
        placeholder="От ₽"
        onChange={(e) => onChangeMin(e.target.value)}
        maxLength={8}
      />
      <Input
        className={`${styles.priceEnd} ${styles.price}`}
        value={maxPrice === "" ? undefined : maxPrice}
        placeholder="До ₽"
        onChange={(e) => onChangeMax(e.target.value)}
        maxLength={8}
      />
    </div>
  ); // todo: необходимо добавить валидацию введённых чисел, в том числе min < max
});
