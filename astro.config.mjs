// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
    site: "https://w3b5h3ll.github.io",
    integrations: [preact()],
});
