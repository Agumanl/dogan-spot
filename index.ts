import type { SchemaTypeDefinition } from "sanity";
import { categoryType } from "./category";
import { productType } from "./product";

export const schemaTypes: SchemaTypeDefinition[] = [categoryType, productType];
