import { expect } from 'chai'
import { initializeTestDb, getToken } from '../helper/test.js'

describe("Testing basic database functionality", () => {
  let token = null
  const testUser = { email: "foo@foo.com", password: "password123" }

  before(() => {
    initializeTestDb()
    token = getToken(testUser.email)
  })

  it("should get all tasks", async () => {
    const response = await fetch("http://localhost:3001/")
    const data = await response.json()
    expect(response.status).to.equal(200)
    expect(data).to.be.an("array").that.is.not.empty
    expect(data[0]).to.include.all.keys(["id", "description"])
  })

  it("should create a new task", async () => {
    const newTask = { description: "Test task" }
    const response = await fetch("http://localhost:3001/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ task: newTask })
    })
    const data = await response.json()
    expect(response.status).to.equal(201)
    expect(data).to.include.all.keys(["id", "description"])
    expect(data.description).to.equal(newTask.description)
  })
})
