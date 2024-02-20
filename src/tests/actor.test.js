const request = require('supertest');
const app = require("../app");

const URL_ACTORS = '/actors';

const actor = {
    firstName: 'Alan',
    lastName: 'Sandler',
    nationality: 'American',
    image: 'imagenUrl',
    birthday: '1900-12-31'
};

const newNameActor = {firstName: 'Adam'}

let actorId;

//------TEST POST-----
test("Post -> URL_ACTORS, should return statusCode 201,and res.body to be defineed and res.body.firstName = actor.firstName", async() => {
    const res = await request(app)
        .post(URL_ACTORS)
        .send(actor)

    actorId= res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName)
});

//------TEST GET ALL-----
test("Get -> URL_ACTORS, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await request(app)
        .get(URL_ACTORS)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//------TEST GET ONE-----
test("Get -> 'URL_ACTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = actor.firstName", async() => {
    const res = await request(app)
        .get(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName)
});

//------TEST UPDATE------
test("Put -> 'URL_ACTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = newNameActor.firstName", async() =>{
    const res = await request(app)
        .put(`${URL_ACTORS}/${actorId}`)
        .send(newNameActor)
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(newNameActor.firstName);
});


//------TEST DELETE------
test("Delete -> 'URL_ACTORS/:id', should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_ACTORS}/${actorId}`)
    
    expect(res.statusCode).toBe(204);
});
