import typescript from 'rollup-plugin-typescript2'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    output: {
      format: 'cjs',
      file: 'dist/index.js',
    },
  },
  {
    input: 'src/template-replace/replace.ts',
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    output: {
      format: 'cjs',
      file: 'dist/lib/template-replace.js',
    },
  },
]

export default config
