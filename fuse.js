const { FuseBox, QuantumPlugin } = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src/",
  output: "dist/$name.js",
  sourceMaps: true,
  alias: {
    "@app": "~"
  },
  log: {
    enabled: false
  },
  allowSyntheticDefaultImports: true
});

fuse
  .bundle("vendor")
  .instructions("~ client.tsx")
  .completed(() => console.log("> vendors bundled"))
  .watch();

fuse
  .bundle("app")
  .splitConfig({
    target: "browser"
  })
  .instructions("> client.tsx")
  .hmr()
  .completed(() => console.log("> client bundled"))
  .watch();

fuse
  .bundle("server")
  .splitConfig({
    target: "node"
  })
  .instructions("> [server.tsx]")
  .completed(() => console.log("> server bundled"))
  .completed(proc => proc.start())
  .watch();

fuse.run();
fuse.dev({
  proxy: {
    "/": {
      target: "http://localhost:3000"
    }
  }
});