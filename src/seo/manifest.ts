import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Africa exchange",
    short_name: "AfruE",
    description: "AfruE, you platform to send money quickly over sanctions.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/ico.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
