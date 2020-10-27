const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/antd"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(__dirname, "./src/styles/variables.less"),
  themeVariables: ["@primary-color"],
  indexFileName: "index.html",
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [] // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          console.log(req.path);
          console.log(process.env.MOCK);
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            console.log(name);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
          return null;
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin]
  },
  runtimeCompiler: true
};
