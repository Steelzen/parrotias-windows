module.exports = {
    publishers: [
        {
          name: '@electron-forge/publisher-s3',
          platforms: ['win'],
          config: {
            bucket: 'my-bucket',
            folder: 'my/key/prefix'
          }
        }
    ]
}