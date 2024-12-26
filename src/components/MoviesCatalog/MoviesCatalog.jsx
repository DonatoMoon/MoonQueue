import Catalog from "../Catalog/Catalog";
import Pagination from "../Pagination/Pagination";

export default function MoviesCatalog() {
  return (
    <div className={"container"}>
      <Catalog />
      <Pagination />
    </div>
  );
}
