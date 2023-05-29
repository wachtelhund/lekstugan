// import jwt from 'jsonwebtoken'
// import request from 'supertest'
// import User from '../../models/user'
// import app from '../../app'
import { jest } from '@jest/globals'

jest.useFakeTimers()

jest.mock('jsonwebtoken')
jest.mock('../../models/user')

// const { jest } = await import('@jest/globals')
const jwt = await import('jsonwebtoken')
const { request } = await import('supertest')
const app = await import('../../app')
const User = await import('../../models/user')

describe('login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns a token when user credentials are correct', async () => {
    const mockUser = {
      email: 'test@test.com',
      permissionLevel: 1,
      _id: '12345'
    }
    User.isCorrectPassword.mockResolvedValue(mockUser)
    jwt.sign.mockReturnValue('valid-token')

    const res = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password'
    })

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ access_token: 'valid-token' })
  })

  it('returns an error when user credentials are incorrect', async () => {
    User.isCorrectPassword.mockResolvedValue(null)

    const res = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password'
    })

    expect(res.status).toBe(401)
    expect(res.body).toEqual({ error: 'Invalid login.' })
  })

  // Add similar tests for the superuser case
})
