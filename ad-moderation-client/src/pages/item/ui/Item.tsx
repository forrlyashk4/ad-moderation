import { useParams } from "react-router";
import { AdItemDetails } from "../../../widgets/ad-item";

export default function Item() {
  const { id } = useParams();
  return (
    <div>
      <AdItemDetails id={id} />
    </div>
  );
}
