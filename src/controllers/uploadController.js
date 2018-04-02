import xlstojson from 'xls-to-json-lc'
import xlsxtojson from 'xlsx-to-json-lc'
import multerConfig from '../config/multer'
import { getPathFromRoot, getExtension, processExcelToJson } from '../helpers'
import { EXTENSIONS } from '../config/extensions'
import { errorType } from '../config/errorTypes'

export const postUpload = (req, res) => {
  multerConfig.uploadUtility(req, res, err => {
    let exceltojson

    if (err) {
      res.json(errorType(err).error)
      return
    }

    if (!req.file) {
      res.json(errorType().noFile)
      return
    }

    getExtension(req.file.originalname) === 'xlsx'
      ? exceltojson = xlsxtojson
      : exceltojson = xlstojson

    try {
      processExcelToJson(exceltojson, req, res)
    } catch (e) {
      res.json(errorType().corruptedFile)
    }
  })
}

export const getUpload = (req, res) => {
  res.status(200).sendFile(getPathFromRoot('src', 'index.html'))
}

