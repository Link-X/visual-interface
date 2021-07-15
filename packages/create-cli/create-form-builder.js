const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const slog = require("single-line-log").stdout;
const ora = require("ora");
const cmd = require("commander");
const pathComm = require("path");

function ProgressBar(description, bar_length) {
  this.description = description || "Progress";
  this.length = bar_length || 25;

  this.render = function (opts) {
    const percent = (opts.completed / opts.total).toFixed(4);
    const cell_num = Math.floor(percent * this.length);

    let cell = "";
    for (var i = 0; i < cell_num; i++) {
      cell += "█";
    }

    let empty = "";
    for (let i = 0; i < this.length - cell_num; i++) {
      empty += "░";
    }

    const cmdText = this.description + ": " + (100 * percent).toFixed(2) + "% " + cell + empty + " " + opts.completed + "/" + opts.total + "\n";

    slog(cmdText);
  };
}

module.exports = () => {
  async function step1() {
    return await inquirer.prompt([
      {
        type: "list",
        message: "请选择需要创建的项目",
        name: "createType",
        choices: ["可视化界面", "JSON自定义表单组件"],
        default: "可视化界面",
      },
    ]);
  }

  async function createVisualInterface() {
    return await inquirer.prompt({
      type: "input",
      message: "设置项目名称",
      name: "name",
      default: "my-project",
    });
  }
  async function createFiles() {
    try {
      const { name } = await createVisualInterface();
      const spinner = ora("正在创建项目...\n");
      spinner.start();
      const pb = new ProgressBar("进度", 50);
      const projectPath = process.cwd();
      pb.render({ completed: 10, total: 200 });
      console.log(chalk.green("生成code\n"));
      fs.copySync(pathComm.join(__dirname, "/code"), projectPath);
      pb.render({ completed: 100, total: 200 });
      console.log(chalk.green("create package.json\n"));
      await fs.writeFileSync(
        pathComm.join(projectPath, "/package.json"),
        JSON.stringify(
          {
            name,
            version: "0.0.1",
            scripts: {
              design: "cross-env NODE_ENV=dev port=9088 bfcli design",
              build: "cross-env NODE_ENV=production bfcli build",
            },
            dependencies: {},
            devDependencies: {
              "visual-interface-poject": "*0.3.5",
            },
          },
          undefined,
          2
        )
      );
      pb.render({ completed: 200, total: 200 });
      console.log(chalk.green("创建成功,请执行npm install\n"));
      spinner.stop();
    } catch (err) {
      console.error(err);
    }
  }

  async function step2() {
    const { createType } = await step1();
    if (createType === "可视化界面") {
      await createFiles();
    } else {
      console.log(chalk.yellow('该模式正在加入中...'))
    }
  }

  function getVersion ()  {
    const packageJson = JSON.parse(fs.readFileSync(pathComm.join(__dirname, './package.json')))
    return packageJson.version
  }
  const v = getVersion()


  cmd.version(v, '-v, --version')
    .option('init', '生成自定义表单项目')
    .parse(process.argv);

  cmd
    .command("init")
    .description("初始化项目")
    .action(async (args) => {
      step2();
    });

  cmd.parse(process.argv);
};
