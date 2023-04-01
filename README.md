# discord-enable-devtools

Bring your Discord's devtools back to life

## TL;DR

Discord devtools was disabled, [see more](https://www.reddit.com/r/discordapp/comments/sc61n3/cant_inspect_element_anymore/hu4fw5x/).

You can enable it again by adding the following property to your desktop application's `config.json` file:
`"DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true`

## About this project

I made this project just to study some features of [zx](https://github.com/google/zx), as silly as it sounds, I learned a lot. I also did it because I imagine people must be asking themselves "Where is devtools?" I hope one way or another this helps you.


## Quick way, npx + zx (Method 1)

Just run

```sh
npx zx https://raw.githubusercontent.com/BrunoS3D/discord-enable-devtools/main/index.mjs
```

It's ready now just restart discord

## Manually enable (Method 2)

Open config file with vscode (or whatever you use)

Win

```sh
code %appdata%/discord/settings.json
```

Linux

```sh
code ~/.config/discord/settings.json
```

macOS

```sh
code ~/Library/Application Support/discord/settings.json
```

Just add the following property to the config file:

```json
{
  "DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true,
  // ...
}
```

It's ready now just restart discord

