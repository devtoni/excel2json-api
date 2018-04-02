import fs from 'fs'
import axios from 'axios'
import formData from 'form-data'
import startServer from '../app'
import books from './fixtures/books.json'
import { getPathFromRoot } from '../helpers'
import { errorType } from '../config/errorTypes'

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(async done => {
  server.close(done)
})

describe('upload/ route', () => {
  test('GET, It should response with status 200', async () => {
    const { status } = await axios.get('http://localhost:3001/upload')
    expect(status).toBe(200)
  })

  test('GET, It should return a html', async () => {
    const { headers: { 'content-type': contentType } } = await axios.get(
      'http://localhost:3001/upload',
    )
    expect(contentType).toContain('text/html')
  })

  test('POST, It should handle xlsx extensions', async () => {
    const filePath = getPathFromRoot(
      'src',
      '__tests__',
      'examples',
      'books.xlsx',
    )
    const existsFile = fs.existsSync(filePath)
    if (existsFile) {
      const form = new formData()
      form.append('file', fs.createReadStream(filePath))
      const response = await axios.post('http://localhost:3001/upload', form, {
        headers: form.getHeaders(),
      })
      const { data: { result } } = response
      expect(result).toMatchObject(books)
    } else {
      throw new Error('Error filepath')
    }
  })

  test('POST, It should handle xls extensions', async () => {
    const filePath = getPathFromRoot(
      'src',
      '__tests__',
      'examples',
      'qtl-sample.xls',
    )
    const existsFile = fs.existsSync(filePath)
    if (existsFile) {
      const form = new formData()
      form.append('file', fs.createReadStream(filePath))
      const response = await axios.post('http://localhost:3001/upload', form, {
        headers: form.getHeaders(),
      })
      const { data: { result } } = response
      expect(result[0]).toMatchObject({
        age: expect.any(String),
        id: expect.any(String),
        point: expect.any(String),
        strain: expect.any(String),
        sex: expect.any(String),
        age: expect.any(String),
        bodywt: expect.any(String),
        brainwt: expect.any(String),
        medunshob: expect.any(String),
      })
    } else {
      throw new Error('Error filepath')
    }
  })

  test('POST, It should return an error message when file is empty', async () => {
    const { data: { err_desc: errorDescription } } = await axios.post(
      'http://localhost:3001/upload',
    )
    expect(errorDescription).toContain(errorType.noFile.err_desc)
  })

  test('POST, It should return an error message when file extension is not correct', async () => {
    const filePath = getPathFromRoot(
      'src',
      '__tests__',
      'examples',
      'index.html',
    )
    const existsFile = fs.existsSync(filePath)
    if (existsFile) {
      const form = new formData()
      form.append('file', fs.createReadStream(filePath))
      const response = await axios.post('http://localhost:3001/upload', form, {
        headers: form.getHeaders(),
      })
      const { data: { err_desc: errorDescription } } = response
      expect(errorDescription).toContain(errorType.error.err_desc)
    } else {
      throw new Error('Error filepath')
    }
  })

  test('POST, It should return an error message when file is corrupted', async () => {
    const filePath = getPathFromRoot(
      'src',
      '__tests__',
      'examples',
      'corrupted.xls',
    )
    const existsFile = fs.existsSync(filePath)
    if (existsFile) {
      const form = new formData()
      form.append('file', fs.createReadStream(filePath))
      const response = await axios.post('http://localhost:3001/upload', form, {
        headers: form.getHeaders(),
      })
      const { data: { err_desc: errorDescription } } = response
      expect(errorDescription).toContain(errorType.corruptedFile.err_desc)
    } else {
      throw new Error('Error filepath')
    }
  })
})
