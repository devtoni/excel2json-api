import path from 'path'
import del from 'del'
import { EXTENSIONS } from './config/extensions';

export const getPathFromRoot = (...args) => path.resolve(process.env.PWD,...args)

export const cleanFolder = function(folderPath) {
  del.sync([`${folderPath}/**`, `!${folderPath}`])
}

export const getExtension = file => {
  const extensionFile = file.split('.').pop()
  return EXTENSIONS.filter(ext => extensionFile === ext).toString()
}

export const processExcelToJson = (extensionMethod, req, res) => {
  extensionMethod(
    {
      input: req.file.path,
      output: null,
      lowerCaseHeaders: true,
    },
    (err, result) => {
      if (err) {
        return res.json(errorType(err).noProcessed)
      }
      res.json({ result })
    },
  )
}