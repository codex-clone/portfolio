// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable type `any` rule
      "@typescript-eslint/no-unused-vars": "off", // Allow unused variables
      "react-hooks/exhaustive-deps": "warn", // Show warnings for missing dependencies
      "prefer-const": "off", // Allow `let` instead of `const`
      "react/no-unescaped-entities": "off", // Ignore unescaped entities
      "@typescript-eslint/ban-ts-comment": "off", // Allow use of `@ts-ignore`
      "react/display-name": "off", // Disable missing display name rule
    },
  },
];

export default eslintConfig;
