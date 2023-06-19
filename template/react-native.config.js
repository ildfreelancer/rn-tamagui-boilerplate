module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-flipper': {
      platforms: {
        ios: {
          configurations: ['Debug'],
        },
      },
    },
  },
  assets: ['./src/assets/fonts'],
};
