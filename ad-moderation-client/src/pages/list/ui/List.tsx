import { AdListFilters } from "../../../features/ad-list-filters";
import { AdListWidget } from "../../../widgets/ad-list";

export default function List() {
  return (
    <div>
      <AdListFilters />
      <AdListWidget />
    </div>
  );
}
