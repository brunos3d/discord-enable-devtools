#!/usr/bin/env zx

const osPaths = {
  // tested os.platform() values
  darwin: `${os.homedir()}/Library/Application Support/discord/settings.json`,
  win32: `${os.homedir()}/AppData/Roaming/discord/settings.json`,
  linux: `${os.homedir()}/.config/discord/settings.json`,
  // https://nodejs.org/api/process.html#process_process_platform
  // not fully tested os.platform() values
  // if one of these is your platform and the script doesn't work, please open an issue
  aix: `${os.homedir()}/.config/discord/settings.json`,
  freebsd: `${os.homedir()}/.config/discord/settings.json`,
  openbsd: `${os.homedir()}/.config/discord/settings.json`,
  sunos: `${os.homedir()}/.config/discord/settings.json`,
  android: `/data/data/com.discord/files/discord/settings.json`, // typical Android path
};

const configFile = osPaths[os.platform()];

try {
  const config = await fs.readJson(configFile);
  config.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
  await fs.writeJson(configFile, config, { spaces: 2 });
  console.log(chalk.black.bgGreen(' DEVTOOLS ENABLED '), configFile);
} catch (error) {
  console.error(chalk.red('Error:'), error);
  console.log(chalk.yellow('Debug Info:'), {
    platform: os.platform(),
  });
  console.log(chalk.red('Could not enable devtools. Make sure Discord is installed or open an issue on GitHub with the error message above.'));
  console.log(chalk.yellow('https://github.com/brunos3d/discord-enable-devtools/issues/new'));
}
