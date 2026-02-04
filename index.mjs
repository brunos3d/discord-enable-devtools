#!/usr/bin/env zx

const osPaths = {
  // tested os.platform() values
  darwin: `${os.homedir()}/Library/Application Support/discord/settings.json`,
  win32: `${os.homedir()}/AppData/Roaming/discord/settings.json`,
  linux: {
    standard: `${os.homedir()}/.config/discord/settings.json`,
    flatpak: `${os.homedir()}/.var/app/com.discordapp.Discord/config/discord/settings.json`,
    snap: `${os.homedir()}/snap/discord/current/.config/discord/settings.json`,
  },
  // https://nodejs.org/api/process.html#process_process_platform
  // not fully tested os.platform() values
  // if one of these is your platform and the script doesn't work, please open an issue
  aix: `${os.homedir()}/.config/discord/settings.json`,
  freebsd: `${os.homedir()}/.config/discord/settings.json`,
  openbsd: `${os.homedir()}/.config/discord/settings.json`,
  sunos: `${os.homedir()}/.config/discord/settings.json`,
  android: `/data/data/com.discord/files/discord/settings.json`, // typical Android path
};

// Helper function to resolve the config file path
async function resolveConfigPath(pathOrPaths) {
  // If it's a string, return it directly
  if (typeof pathOrPaths === "string") {
    return pathOrPaths;
  }

  // If it's an object, check which path exists
  if (typeof pathOrPaths === "object" && pathOrPaths !== null) {
    for (const [key, path] of Object.entries(pathOrPaths)) {
      try {
        await fs.access(path);
        console.log(chalk.blue("Found Discord installation:"), key);
        return path;
      } catch {
        // Path doesn't exist, continue to next
      }
    }
    // If no path exists, return the first one (standard) as fallback
    return Object.values(pathOrPaths)[0];
  }

  return null;
}

const platformPaths = osPaths[os.platform()];

if (!platformPaths) {
  console.error(chalk.red("Error: Unsupported platform"), os.platform());
  console.log(
    chalk.yellow(
      "Please open an issue on GitHub with your platform information.",
    ),
  );
  console.log(
    chalk.yellow(
      "https://github.com/brunos3d/discord-enable-devtools/issues/new",
    ),
  );
  process.exit(1);
}

const configFile = await resolveConfigPath(platformPaths);

if (!configFile) {
  console.error(chalk.red("Error: Could not resolve config file path"));
  process.exit(1);
}

try {
  const config = await fs.readJson(configFile);
  config.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
  await fs.writeJson(configFile, config, { spaces: 2 });
  console.log(chalk.black.bgGreen(" DEVTOOLS ENABLED "), configFile);
} catch (error) {
  console.error(chalk.red("Error:"), error);
  console.log(chalk.yellow("Debug Info:"), {
    platform: os.platform(),
    configFile,
  });
  console.log(
    chalk.red(
      "Could not enable devtools. Make sure Discord is installed or open an issue on GitHub with the error message above.",
    ),
  );
  console.log(
    chalk.yellow(
      "https://github.com/brunos3d/discord-enable-devtools/issues/new",
    ),
  );
}
