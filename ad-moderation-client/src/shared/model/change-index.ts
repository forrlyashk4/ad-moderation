type IncrementIndexFn = (index: number, step: number, max: number) => number;

export const incrementIndex: IncrementIndexFn = function (
  index,
  step = 1,
  max
) {
  const nextIndex = index + step;
  return nextIndex > max ? index : max;
};

type DecrementIndexFn = (index: number, step: number, min: number) => number;

export const decrementIndex: DecrementIndexFn = function (
  index,
  step = 1,
  min
) {
  const nextIndex = index - step;
  return nextIndex < min ? index : min;
};
