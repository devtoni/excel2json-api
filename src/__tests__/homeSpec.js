import axios from 'axios'
import startServer from '../app'

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(async done => {
  server.close(done)
})

describe('get home route', () => {
  test('It should response status OK', async () => {
    const { data } = await axios.get('http://localhost:3001')
    expect(data).toContain('It Works!')
  })
})
