const dts = require('dts-bundle');
const rimraf = require("rimraf");
const fs = require('fs');

const { createMinifier } = require("dts-minify");
const ts = require("typescript");

const minifier = createMinifier(ts);

dts.bundle({
    name: 'rn-declarative-eva',
    main: 'dist/types/index.d.ts',
});

const typedef = minifier.minify(fs.readFileSync('dist/types/rn-declarative-eva.d.ts').toString());
fs.writeFileSync('dist/types/rn-declarative-eva.d.ts', typedef);

fs.copyFileSync(
    'dist/types/rn-declarative-eva.d.ts',
    'dist/index.d.ts',
);

fs.copyFileSync(
    'dist/modern/index.js',
    'dist/index.modern.js',
);

fs.existsSync("demo") && fs.copyFileSync(
    'dist/index.d.ts',
    'demo/rn-declarative-eva.d.ts',
);

rimraf.sync("dist/types");
rimraf.sync("dist/modern");
