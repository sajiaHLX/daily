module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      // options
      unitToConvert:'px',
      viewportWidth: 320,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList:['recommend','bg','bg1'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 10,
      mediaQuery: false,
      exclude: [],
    }

  }
}
