import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: "White", value: "#ffffff" },
        canvas: { name: "Canvas (neutral-50)", value: "#f6f6f6" },
        dark: { name: "Dark", value: "#1f1f1f" },
      },
    },
    options: {
      storySort: {
        order: ["Foundations", "Atoms", "Molecules", "Organisms"],
      },
    },
    a11y: {
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: { value: "white" },
  },
};

export default preview;
