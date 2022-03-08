#!/usr/bin/env zx

const osPaths = {
  darwin: `${os.homedir()}/Library/Application Support/discord/settings.json`,
  win32: `${os.homedir()}/AppData/discord/settings.json`,
  linux: `${os.homedir()}/.config/discord/settings.json`,
};

const configFile = osPaths[os.platform()];
const config = await fs.readJson(configFile);
config.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
await fs.writeJson(configFile, config, { spaces: 2 });

console.log(chalk.black.bgGreen(' DEVTOOLS ENABLED '), configFile);
