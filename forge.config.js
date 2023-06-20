const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: path.join(__dirname, "src/images/icon.ico"),
        setupExe: "Setup.exe",
        setupMsi: "Setup.msi",
        noMsi: false,
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
      config: {
        icon: path.join(__dirname, "src/images/icon.png"),
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: path.join(__dirname, "src/images/icon.png"),
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        icon: path.join(__dirname, "src/images/icon.png"),
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: path.join(__dirname, "src/images/icon.icons"),
      },
    },
    {
      name: "@electron-forge/maker-wix",
      config: {
        icon: path.join(__dirname, "src/images/icon.ico"),
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
