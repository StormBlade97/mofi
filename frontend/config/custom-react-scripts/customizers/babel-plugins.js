module.exports = {
  DECORATORS: {
    get: () => require.resolve('babel-plugin-transform-decorators-legacy'),
  },
  DEEP_ACTION: {
    get: () => require.resolve('babel-plugin-mobx-deep-action'),
  },
};
