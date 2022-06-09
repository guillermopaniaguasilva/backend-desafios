class User {
  constructor({ firstName, lastName, books, pets }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(title, author) {
    this.books.push({ title, author });
  }

  getBooksNames() {
    return this.books.filter((book) => book.title);
  }
}

module.exports = User;

const user = new User({
  firstName: 'Guillermo',
  lastName: 'Paniagua',
  books: [
    { title: 'Así habló Zaratustra', author: 'Friedrich Nietzsche' },
    { title: 'El mito de Sísifo', author: 'Albert Camus' },
  ],
  pets: ['León', 'Emma', 'Olivia', 'Isis'],
});

console.log('user', user);

console.log(user.getFullName());

user.addPet('Lady');
console.log('pets', user.pets);

console.log('user.countPets', user.countPets());

user.addBook('El extranjero', 'Albert Camus');
console.log('books', user.books);

console.log('user.getBooksNames', user.getBooksNames());
