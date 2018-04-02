import { getExtension } from '../../helpers'
import { errorType } from '../errorTypes'

export const upload = (multer, storage) =>
  multer({
    storage,
    fileFilter: (req, file, callback) => {
      if (getExtension(file.originalname)) return callback(null, true)
      callback(errorType.error)
    },
  }).single('file')
