import {SubCatalogItem} from "./sub-catalog-item";

export interface ProductResponse {
  id: string,
  name: string,
  subCatalog: SubCatalogItem,
}
