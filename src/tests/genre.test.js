const request = require("supertest");
const app = require("../app");

const URL_GENRES = '/genres';
const genre = {
    name: 'Comedy'
};
const newName = {
    name: "Terror"
}
let genreId;

//------TEST POST-----
test("Post -> URL_GENRES, should return statusCode 201,and res.body to be defineed and res.body.name = genre.name", async() => {

    const res = await request(app)
        .post(URL_GENRES)
        .send(genre)
    
    genreId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

//------TEST GET ALL -----
test("Get -> URL_GENRES, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await request(app)
        .get(URL_GENRES)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

//----------GET ONE-----------
test("Get -> 'URL_GENRES/:id', should return statusCode 200, res.body to be defined and res.body.name = genre.name", async() => {
    const res = await request(app)
        .get(`${URL_GENRES}/${genreId}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

//--------------TEST PUT -> UPDATE -----------
test("Put -> 'URL_GENRES/:id', should return statusCode 200, res.body to be defined and res.body.name = newName.name", async() => {
    const res = await request(app)
        .put(`${URL_GENRES}/${genreId}`)
        .send(newName)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(newName.name);
});


//----------TEST DELETE-----------------
test("Delete -> 'URL_GENRE/:id', should return satusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_GENRES}/${genreId}`)
    
    expect(res.statusCode).toBe(204);
});