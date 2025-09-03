import { expect } from "chai";
import fetch from "node-fetch";
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";

describe("Testing basic database functionality", () => {
  let token = null;
  const testUser = { email: "foo@foo.com", password: "password123" };

  before(() => {
    initializeTestDb();
    insertTestUser(testUser);
    token = getToken(testUser.email);
  });

  it("should get all tasks", async () => {
    const response = await fetch("http://localhost:3001/");
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
  });

  it("should create a new task", async () => {
    const newTask = { description: "Test task" };
    const response = await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys(["id", "description"]);
  });

  it("should delete a task", async () => {
    const taskResponse = await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ task: { description: "Task to delete" } }),
    });
    const taskData = await taskResponse.json();

    const deleteResponse = await fetch(`http://localhost:3001/delete/${taskData.id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const deleteData = await deleteResponse.json();
    expect(deleteResponse.status).to.equal(200);
    expect(deleteData.id).to.equal(taskData.id);
  });

  it("should not create a new task without description", async () => {
    const response = await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ task: {} }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400);
    expect(data).to.have.property("error");
  });
});
