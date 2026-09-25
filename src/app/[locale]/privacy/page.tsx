import { Meta } from "@once-ui-system/core";
import { baseURL, privacy } from "@/resources";
import { PrivacyContent } from "@/components/PrivacyContent";

export async function generateMetadata() {
  const meta = Meta.generate({
    title: privacy.title,
    description: privacy.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(privacy.title)}`,
    path: privacy.path,
  });

  return {
    ...meta,
    robots: "noindex, nofollow",
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
