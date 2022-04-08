const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp)

describe('/api/movieslarni testan otqizyamiz', () => {

    before((done) => {
        chai.request(server)
            .post('/api/register')
            .send({ name: 'Q.Xojimurod', password: '123452' })
            .end((err, res) => {
                token = res.body.token
                done()
            })
    })

    // describe('/GET movies', () => {
    //     it('Get metodi orqali movieslarni tekshirdik', (done) => {
    //         chai.request(server)
    //             .get('/api/movies')
    //             .set('x-access-token', token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 done()
    //             })
    //     })
    // })

    // // post orqali yengi malumot kiritish testi 
    // describe('POST movies', () => {
    //     it('POST metodi orqali  yengi movieslarni kirgizamiz', (done) => {
    //         const movie = {
    //             title: 'Yoldagi yolak',
    //             category: 'Bilmadim',
    //             country: 'Uzbek',
    //             year: 2019,
    //             director_id: '5f0995f0d8588d1688dd253b',
    //             imdb_score: 9
    //         }
    //         chai.request(server)
    //             .post('/api/movies')
    //             .send(movie)
    //             .set('x-access-token', token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('title')
    //                 res.body.should.have.property('category')
    //                 res.body.should.have.property('country')
    //                 res.body.should.have.property('year')
    //                 res.body.should.have.property('director_id')
    //                 res.body.should.have.property('imdb_score')
    //                 movieID = res.body._id
    //                 done()
    //             })
    //     })
    // })

    // // Get Orqali Id ko'rishimiz 
    // describe('GET movies', () => {
    //     it('GET metodi orqali  id qidirvomiz', (done) => {
    //         chai.request(server)
    //             .get(`/api/movies/${movieID}`)
    //             .set('x-access-token', token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('title')
    //                 res.body.should.have.property('category')
    //                 res.body.should.have.property('country')
    //                 res.body.should.have.property('year')
    //                 res.body.should.have.property('director_id')
    //                 res.body.should.have.property('imdb_score')
    //                 res.body.should.have.property('_id').eql(movieID)
    //                 done()
    //             })
    //     })
    // })


})