const { expect } = require('chai');
const User = require('./desafio_1');

describe('User class', function () {
  const user = {
    firstName: 'Guillermo',
    lastName: 'Paniagua',
    books: [
      { title: 'Así habló Zaratustra', author: 'Friedrich Nietzsche' },
      { title: 'El mito de Sísifo', author: 'Albert Camus' },
    ],
    pets: ['León', 'Emma', 'Olivia', 'Isis'],
  };

  beforeEach(function () {
    this.user = new User(user);
  });

  it('should create User object', function () {
    expect(this.user).to.have.keys(['firstName', 'lastName', 'books', 'pets']);
  });

  it('should have a "getFullName" method', function () {
    expect(this.user.getFullName).to.exist;
  });

  it('should have an "addPet" method', function () {
    expect(this.user.addPet).to.exist;
  });

  it('should have a "countPets" method', function () {
    expect(this.user.countPets).to.exist;
  });

  it('should have an "addBook" method', function () {
    expect(this.user.addBook).to.exist;
  });

  it('should have a "getBooksNames" method', function () {
    expect(this.user.getBooksNames).to.exist;
  });

  it('should return full name', function () {
    const expectedFullName = `${user.firstName} ${user.lastName}`;
    const actualFullName = this.user.getFullName();

    expect(actualFullName).to.equal(expectedFullName);
  });

  it('should add a pet', function () {
    const initialPetsCount = this.user.pets.length;

    this.user.addPet('Lady');

    const expectedPetsCount = initialPetsCount + 1;
    const actualPetsCount = this.user.pets.length;

    expect(actualPetsCount).to.equal(expectedPetsCount);
  });

  it('should return pets count', function () {
    const expectedPetsCount = this.user.pets.length;
    const actualPetsCount = this.user.countPets();

    expect(actualPetsCount).to.equal(expectedPetsCount);
  });

  it('should add a book', function () {
    const newBook = { title: 'El extranjero', author: 'Albert Camus' };
    const initialBooksCounts = this.user.books.length;

    this.user.addBook(newBook.title, newBook.author);

    const lastBook = this.user.books.slice(-1)[0];
    const expectedBooksCount = initialBooksCounts + 1;
    const actualBooksCount = this.user.books.length;

    expect(actualBooksCount).to.equal(expectedBooksCount);
    expect(lastBook).to.eql(newBook);
  });

  it('should return books names', function () {
    const expectedBooksNames = user.books.filter((book) => book.title);
    const actualBooksNames = this.user.getBooksNames();

    expect(actualBooksNames).to.eql(expectedBooksNames);
  });
});
