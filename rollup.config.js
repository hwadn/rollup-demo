import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript'

export default [
	{
		input: 'src/index.ts',
		output: [
			{
			file: 'dist/bundle-b1.js',
			format: 'cjs'
			},
			{
			file: 'dist/bundle-b2.js',
			format: 'es'
			}
		],
		plugins: [
			typescript({
				typescript: ttypescript,
				tsconfig: './tsconfig.json',
				tsconfigOverride: {
					compilerOptions: {
					  plugins: [
						{ "transform": "typescript-transform-paths" },
						{ "transform": "typescript-transform-paths", "afterDeclarations": true }
					  ]
					}
				}
			})
		]
	}
  ];
