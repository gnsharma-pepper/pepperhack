import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSvgPlugin from "vite-plugin-react-svg";

export default defineConfig({
  plugins: [
    react(),
    reactSvgPlugin({
      // Default behavior when importing `.svg` files, possible options are: 'url' and `component`
      defaultExport: "component",

      // Setting this to true will wrap the exported component in React.memo
      memo: true,

      // Add title tag via title property
      // <SvgIcon title="Accessible icon name" /> => <svg><title>Accessible icon name</title><...></svg>
      // <SvgIcon title="Accessible icon name" titleId="iconName" /> => <svg aria-labelledby="iconName><title id="iconName">Accessible icon name</title><...></svg>
      titleProp: true,
    }),
  ],
});
