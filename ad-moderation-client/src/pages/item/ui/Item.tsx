import { useParams } from "react-router";
import { AdItemWidget } from "../../../widgets/ad-item";

export default function Item() {
  const { id } = useParams();
  return (
    <>
      <AdItemWidget id={id} />
    </>
  );
}
