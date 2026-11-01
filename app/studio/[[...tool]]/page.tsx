import { NextStudio } from "next-sanity/studio";
import { SellSteps } from "@/components/SellSteps";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}