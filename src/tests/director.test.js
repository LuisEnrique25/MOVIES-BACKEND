const request = require('supertest');
const app = require("../app");
const { urlencoded } = require('express');

const URL_DIRECTORS = '/directors';

const director = {
    firstName: 'Joel',
    lastName: 'Russo',
    nationality: 'American',
    image: 'imagenUrl',
    birthday: '1900-12-31'
};

const newNameDirector = {
    firstName: 'Joe'
};

let directorId;

//-----------TEST POST------------------
test("Post -> URL_DIRECTORS, should return statusCode 201,and res.body to be defineed and res.body.firstName = director.firstName", async() => {
    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)
    directorId = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
    
});

//-----------TEST GET ALL---------------
test("Get -> URL_DIRECTORS, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await  request(app)
        .get(URL_DIRECTORS)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//-----------TEST GET ONE---------------
test("Get -> 'URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = director.firstName", async() => {
    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

//-----------TEST UPDATE----------------
test("Put -> 'URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = newNameDirector.firstName", async() => {
    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorId}`)
        .send(newNameDirector)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newNameDirector.firstName);
});

//-----------TEST DELETE----------------
test("Delete -> 'URL_DIRECTORS/:id', should return satusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_DIRECTORS}/${directorId}`)
    
    expect(res.statusCode).toBe(204);
});