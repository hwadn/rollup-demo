// import typescript from 'rollup-plugin-typescript2';
// import ttypescript from 'ttypescript'
// import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import { exec } from "child_process";
import typescript from '@rollup/plugin-typescript';

const tscAlias = () => {
    return {
        name: "tsAlias",
        writeBundle: () => {
            return new Promise((resolve, reject) => {
                exec("tsc-alias", function callback(error, stdout, stderr) {
                    if (stderr || error) {
                        reject(stderr || error);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        },
    };
};
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
			alias({
				entries: [
				  { find: '@', replacement: path.resolve(__dirname, 'src') },
				]
			}),
			resolve({ extensions: ['.svg'] }),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
			tscAlias(),
		]
	}
  ];
