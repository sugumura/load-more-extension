import strip from '@rollup/plugin-strip';
import copy from "rollup-plugin-copy";
import del from 'rollup-plugin-delete'

export default {
    input: {
        background: 'src/js/background.js',
        content: 'src/js/content.js',
        options: 'src/js/options.js'
    },
    output: [
        {
            dir: 'dist/js',
            format: 'esm'
        }
    ],
    plugins: [
        del({ targets: 'dist/*' }),
        strip({}),
        copy({
            targets: [
                { src: 'manifest.json', dest: 'dist' },
                { src: 'src/views', dest: 'dist' },
                { src: 'assets', dest: 'dist' }
            ]
        })
    ]
}
