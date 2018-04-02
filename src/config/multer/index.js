import multer from 'multer'
import { storage } from './storage'
import { upload } from './upload'

const storageUtility = storage(multer)
const uploadUtility = upload(multer, storageUtility)

export default { uploadUtility }

