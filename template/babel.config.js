process.env.TAMAGUI_TARGET = 'native';

module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@libs': './libs',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@helpers': './src/helpers',
          '@state': './src/state',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@hocs': './src/hocs',
          '@config': './src/config',
          '@seeds': './src/seeds',
          '@providers': './src/providers',
          '@typings': './src/typings',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: 'TAMAGUI_TARGET',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
