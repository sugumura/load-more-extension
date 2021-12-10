import strip from '@rollup/plugin-strip';

export default {
    input: {
        background: 'src/js/background.js',
        content: 'src/js/content.js',
        options: 'src/js/options.js'
    },
    output: [
        {
            dir: 'dist/js',
            format: 'cjs'
        }
    ],
    plugins: [
        strip({})
    ]
}
