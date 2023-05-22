module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Taehyung Kwon and Anh Chu',
        description: 'Parrotias Electron app'
      },
    },
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Steelzen',
          name: 'parrotias-windows',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
