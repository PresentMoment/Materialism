module.exports = {
  presets: ["next/babel"],
  plugins: [
    "babel-plugin-styled-components",
    "babel-plugin-root-import",
    "@babel/transform-async-to-generator",
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        root: ["./"],
        alias: {
          Analytics: "./analytics",
          Components: "./Components",
          Assets: "./public/",
        },
      },
    ],
  ],
}
