import {SubCatalogItem} from "./sub-catalog-item";

export interface CatalogItem {
  id: string;
  catalogName: string;
  subCatalogs: SubCatalogItem[];
}
