export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // 该项需要在数组的最末尾
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
