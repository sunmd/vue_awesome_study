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
        javascriptEnabled: true
      }
    }
  },
  runtimeCompiler: true
};
