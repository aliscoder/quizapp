module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@hooks": "./src/hooks",
            "@components": "./src/components",
            "@helpers": "./src/helpers",
            "@assets": "./src/assets",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@state": "./src/state",
            "@types": "./src/types",
            "@utils": "./src/utils",
          },
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
