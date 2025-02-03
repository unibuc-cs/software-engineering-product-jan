const request = require('supertest');
const app = require('../server.js'); // adjust the path as needed

describe('GET user tasks', () => {
  test('should return user tasks', async () => {
    const response = await request(app).get('/api/activities/PJsK82pHVPWLkTExiHqcUA64q4n2');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    const task = response.body[0];
    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("title");
    expect(task).toHaveProperty("done");

    expect(typeof task.id).toBe("string");
    expect(typeof task.title).toBe("string");
  });
});

describe('DELETE user task', () => {
    test('should delete user task', async () => {
      const response = await request(app).delete('/api/activities/886FqeObAbwrNbRaQF4K');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Activity deleted");
    });
});

describe('Add user friend', () => {
    test('cannot add a friend twice', async () => {
      const requestBody = {
        user_id: 'LJlm7QBIB9DFtdgqD5zJ',
      };
      const response = await request(app).post('/api/friends/PJsK82pHVPWLkTExiHqcUA64q4n2').send(requestBody);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual("User is already your friend");
    });

    test('add a friend', async () => {
        const requestBody = {
          user_id: 'PxmP2Xo70qvNg0Q26Bdz',
        };
        const response = await request(app).post('/api/friends/PJsK82pHVPWLkTExiHqcUA64q4n2').send(requestBody);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Friend added");
      });
});