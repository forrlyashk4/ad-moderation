import { Input } from "antd";
import { memo } from "react";

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
        style={{ width: 90 }}
        value={minPrice === "" ? undefined : minPrice}
        placeholder="От ₽"
        onChange={(e) => onChangeMin(e.target.value)}
        maxLength={6}
      />
      <Input
        style={{ width: 90, marginLeft: 12 }}
        value={maxPrice === "" ? undefined : maxPrice}
        placeholder="До ₽"
        onChange={(e) => onChangeMax(e.target.value)}
        maxLength={6}
      />
    </div>
  ); // todo: необходимо добавить валидацию введённых чисел, в том числе min < max
});
