//Подключаем dev-dependencies
let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const User = require("../model/User");

let should = chai.should();
chai.use(chaiHttp);

describe("User", () => {
  // beforeEach((done) => {
  //   //Перед каждым тестом чистим базу
  //   User.find({}, (err) => {
  //     done();
  //   });
  // });
  /*
   * Тест для /GET
   */

  describe("/GET book", () => {
    it("он должен ПОЛУЧИТЬ все Пользовотелей", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
    it("он должен ПОЛУЧИТЬ все Пользовотелей", (done) => {
      chai
        .request(server)
        .get("/api/use")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("/POST User", () => {
    it("он должен опубликовать Пользовотеля ", (done) => {
      let user = {
        email: "asd@zxc22.com",
        password: "123456",
      };
      chai
        .request(server)
        .post("/api/register")
        .send(user)
        .end((err, res) => {
          expect(res.body.n, JSON.stringify(req.body).is.equal(1))
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.user.should.have.property("email").eq('asd@zxc22.com');
          res.body.user.should.have.property("name").eq('Azizbek2');
          res.body.user.should.have.property("password").eq('123456');
          done();
        });
    });
  });
  // describe("/GET/:id book", () => {
  //   it("it should GET a book by the given id", (done) => {
  //     let book = new Book({
  //       title: "The Lord of the Rings",
  //       author: "J.R.R. Tolkien",
  //       year: 1954,
  //       pages: 1170,
  //     });
  //     book.save((err, book) => {
  //       chai
  //         .request(server)
  //         .get("/book/" + book.id)
  //         .send(book)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("title");
  //           res.body.should.have.property("author");
  //           res.body.should.have.property("pages");
  //           res.body.should.have.property("year");
  //           res.body.should.have.property("_id").eql(book.id);
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe("/PUT/:id book", () => {
  //   it("it should UPDATE a book given the id", (done) => {
  //     let book = new Book({
  //       title: "The Chronicles of Narnia",
  //       author: "C.S. Lewis",
  //       year: 1948,
  //       pages: 778,
  //     });
  //     book.save((err, book) => {
  //       chai
  //         .request(server)
  //         .put("/book/" + book.id)
  //         .send({
  //           title: "The Chronicles of Narnia",
  //           author: "C.S. Lewis",
  //           year: 1950,
  //           pages: 778,
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("message").eql("Book updated!");
  //           res.body.book.should.have.property("year").eql(1950);
  //           done();
  //         });
  //     });
  //   });
  // });
});
