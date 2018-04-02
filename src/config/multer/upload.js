export const upload = (multer, storage) =>
  multer({
    storage,
    fileFilter: (req, file, callback) => {
      if (
        ['xls', 'xlsx'].indexOf(
          file.originalname.split('.')[file.originalname.split('.').length - 1],
        ) === -1
      ) {
        return callback(new Error('Wrong extension type'))
      }
      callback(null, true)
    },
  }).single('file')
