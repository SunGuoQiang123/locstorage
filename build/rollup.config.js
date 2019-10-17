import babel from 'rollup-plugin-babel';

export default {
  input: 'lib/index.js',
  output: {
    format: 'umd',
    file: 'dist/locStorage.js',
    name: 'locStorage'
  },
  plugins: [
    babel({
      runtimeHelpers: true
    })
  ]
};
