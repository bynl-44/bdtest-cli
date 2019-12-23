const path = require("path");
const emptyDir = require("empty-dir");
const vfs = require("vinyl-fs");
const map = require("map-stream");
const { error, info, success } = require("./util");
const install = require("./install");

const init = programe => {
  const app = "app";
  const cwd = path.join(__dirname, "../kerrigan", app);
  const dest = process.cwd();
  const projectName = path.basename(dest);

  if (!emptyDir.sync(dest)) {
    error("笨蛋，这个文件夹不行，换个空的来");
    process.exit(1);
  }

  info("别乱动，忙着呢...");
  console.log();

  vfs
    .src(["**/*", "!node_modules"], { cwd: cwd, cwdbase: true, dot: true })
    .pipe(map(log))
    .pipe(vfs.dest(dest))
    .on("end", () => {
      // install
      install();
      success(`
      www，成功啦。。。
      
      好了，笨蛋，赶紧来搬砖吧
      
      cd ${dest}
      yarn start

     `);
    });

  function log(file, cb) {
    info(`创建：${file.path.replace(cwd + "/", "")}`);
    cb(null, file);
  }
};

module.exports = init;
