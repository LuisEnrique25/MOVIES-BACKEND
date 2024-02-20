require("../models")
const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const URL_MOVIES = '/movies';


const newNameMovie = {
    name : 'Golpe Bajo'
};

const movie = {
    name: 'Golpe Arriba',
    image: 'imagen Url',
    synopsis: 'some description of the movie',
    releaseYear: 200
} ;




//------------TEST POST---------
test("Post -> URL_MOVIES, should return statusCode 201,and res.body to be defineed and res.body.name = movie.name", async()  => {
    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)
    movieId = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name)
});


//------------TEST GET ALL---------
test("Get -> URL_MOVIES, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await request(app)
        .get(URL_MOVIES)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//------------TEST GET ONE---------
test("Get -> 'URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name = movie.name", async() => {
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

//------------TEST UPDATE---------
test("Put -> 'URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name = newNameMovie.name", async() => {
    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send(newNameMovie)

    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(newNameMovie.name);
});



//------TEST POST MOVIES/GENRES------------
test("Post -> 'URL_MOVIES/:id/genres', should return status code 200, res.boy to be defined and res.body.length = 1", async() => {
    const genre = await Genre.create({name:"Drama"});
    
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([genre.id])
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await genre.destroy();
});


//------TEST POST MOVIES/DIRECTORS---------
test("Post -> 'URL_MOVIES/:id/directors`', should return status code 200, res.boy to be defined and res.body.length = 1", async() => {
    const director = await Director.create({
        firstName: 'Joel',
        lastName: 'Russo',
        nationality: 'American',
        image: 'imagenUrl',
        birthday: '1900-12-31'
    });

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([director.id])
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await director.destroy();
});


//------TEST POST MOVIES/ACTORS------------
test("Post -> 'URL_MOVIES/:id/actors', should return status code 200, res.boy to be defined and res.body.length = 1", async() => {
    const actor = await Actor.create(
        {
            firstName: 'Alan',
            lastName: 'Sandler',
            nationality: 'American',
            image: 'imagenUrl',
            birthday: '1900-12-31'
        });
    
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([actor.id])
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await actor.destroy();
});

//------------TEST DELETE---------
test("Delete -> 'URL_ACTORS/:id', should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204);
});