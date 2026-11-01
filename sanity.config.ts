"use client";

/**
 * Bu yapılandırma, /studio rotasında çalışan gömülü Sanity Studio içindir.
 * Studio tarayıcıda çalıştığı için dosyanın başında "use client" bulunur.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Doğan Spot Yönetim Paneli",
  // app/studio/[[...tool]] rotasıyla aynı olmalı
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});
