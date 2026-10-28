import type { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencillibrary",

  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },

    {
      type: "dist-custom-elements",
      externalRuntime: false,
    },

    reactOutputTarget({
      outDir:
        "../react-library/src/components/stencil-generated",

      stencilPackageName: "stencil-library",
    }),
  ],
};