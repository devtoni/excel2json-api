import path from 'path'


export const storage = multer =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.env.PWD,'uploads'))
    },
    filename: (req, { fieldname, originalname }, cb) => {
      cb(null, `${fieldname}-${Date.now()}.${originalname.split('.').pop()}`)
    },
  })
