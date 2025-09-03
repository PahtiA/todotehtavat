import dotenv from 'dotenv';
dotenv.config();

import { expect } from 'chai';
import fetch from 'node-fetch';
import { initializeTestDb, insertTestUser } from '../helper/test.js';

describe("Testing user management", () => {
  const user = { email: "foo2@test.com", password: "password123" }

  before(() => {
    initializeTestDb();
    insertTestUser(user);
  });

  it("should sign up", async () => {
    const newUser = { email: "foo3@test.com", password: "password123" }; 
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: newUser })
    });
    const data = await response.json();
    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys(["id", "email"]);
    expect(data.email).to.equal(newUser.email);
  });

  it("should log in", async () => {
    const response = await fetch("http://localhost:3001/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.include.all.keys(["id", "email", "token"]);
    expect(data.email).to.equal(user.email);
  });
});
