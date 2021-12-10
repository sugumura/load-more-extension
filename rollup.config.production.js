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
                { src: 'manifest.js', dest: 'dist/manifest.js' },
                { src: 'src/views', dest: 'dist/views' },
                { src: 'assets', dest: 'dist/assets' }
            ]
        })
    ]
}
