import { Command, flags } from "@oclif/command";
import cli from "cli-ux";

const download = require("download-git-repo");
const path = require("path");
const { promisify } = require("util");
const ora = require("ora");
const fs = require("fs-extra");
class UmiProZ extends Command {
  static description =
    "Umi pro version template including ts, scss, eslint, stylelint, pettier and demos for hooks and dva";

  static examples = [`$ umi-pro-z`];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  async run() {
    const isConfirmedToDelFiles = await cli.confirm(
      "Umi pro project will start downloading, the folder need to be empty are you sure to download?"
    );
    if (!isConfirmedToDelFiles) {
      return;
    }
    function isDirEmpty(dirname: any) {
      return fs.promises.readdir(dirname).then((files: any) => {
        return files.length === 0;
      });
    }
    const isEmpty = await isDirEmpty(process.cwd());
    console.log("cwd       : " + process.cwd(), isEmpty);

    if (!isEmpty) {
      this.error("Folder need to be empty");
      return null;
    }
    const asyncDownload = await promisify(download);
    const spinner = ora("umi pro app downloading").start();

    try {
      await asyncDownload(
        "https://github.com:RihuaChen/umi-pro#master",
        path.join(".", "/"),
        {
          clone: true,
        }
      );
      spinner.succeed("Download umi pro version template success!");
    } catch (e) {
      console.error(e);
    }
  }
}

export = UmiProZ;
