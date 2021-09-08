const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
    const modules = {
        js: {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader",
                },
            ],
        },
        scss: {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
    };

    if (env === "production") {
        modules.stylus.use.splice(2, 0, { loader: "postcss-loader" });
    }

    const resolve = {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            App: path.resolve(__dirname, "src/App/"),
            Pages: path.resolve(__dirname, "src/Pages/"),
        },
    };

    return {
        modules,
        resolve,
    };
};
