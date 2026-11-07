import type { SchemaTypeDefinition } from "sanity";
import { categoryType } from "./category";
import { productType } from "./product";
import { serviceType } from "./service";

export const schemaTypes: SchemaTypeDefinition[] = [
  categoryType,
  productType,
  serviceType,
];
