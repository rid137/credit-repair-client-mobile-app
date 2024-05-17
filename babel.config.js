module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          'nativewind/babel',
          'react-native-paper/babel',
          'react-native-reanimated/plugin'
        ],
      },
    },
  };
};
