import copy from 'rollup-plugin-copy'
import del from "rollup-plugin-delete";

export default [
    {
        input: 'src/js/background.js',
        output: [
            {
                dir: 'dist/js',
                format: 'iife'
            }
        ],
        plugins: [
            del({ targets: 'dist/*', runOnce: true }),
            copy({
                targets: [
                    { src: 'manifest.json', dest: 'dist' },
                    { src: 'src/views', dest: 'dist' },
                    { src: 'assets', dest: 'dist' }
                ]
            })
        ]
    },
    {
        input: 'src/js/options.js',
        output: [
            {
                dir: 'dist/js',
                format: 'esm'
            }
        ],
        plugins: []
    },
    {
        input: 'src/js/content.js',
        output: [
            {
                dir: 'dist/js',
                format: 'iife'
            }
        ],
        plugins: []
    },

]
