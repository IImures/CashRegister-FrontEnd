import {SubCatalogItem} from "./sub-catalog-item";

export interface CatalogItem {
  catalogName: string;
  id: string;
  subCatalogs: SubCatalogItem[];
}
