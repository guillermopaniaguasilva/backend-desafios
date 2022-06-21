const fs = require('fs');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const { expect } = chai;
const Container = require('./index');

describe('Container class features', function () {
  const filePath = './productos.txt';

  beforeEach(async function () {
    this.container = new Container(filePath);
    const products = [
      {
        title: 'Guitarra',
        price: 250000,
        thumbnail:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
      },
      {
        title: 'Bajo',
        price: 250000,
        thumbnail:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
      },
      {
        title: 'Batería',
        price: 250000,
        thumbnail:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
      },
    ];
    await fs.promises.writeFile(filePath, JSON.stringify(products));
  });

  afterEach(async function () {
    await fs.promises.unlink(filePath);
  });

  it('should create a Container object', function () {
    expect(this.container).to.have.keys('filePath');
  });

  it('should create a file', function () {
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).to.be.true;
  });

  it('should have a "save" method', function () {
    expect(this.container.save).to.exist;
  });

  it('should have a "getById" method', function () {
    expect(this.container.getById).to.exist;
  });

  it('should have a "getAll" method', function () {
    expect(this.container.getAll).to.exist;
  });

  it('should have a "deleteById" method', function () {
    expect(this.container.deleteById).to.exist;
  });

  it('should have a "deleteAll" method', function () {
    expect(this.container.deleteAll).to.exist;
  });

  it('should save an object to the file', async function () {
    const initialContent = await this.container.getFileContent();
    const expectedId = initialContent.length + 1;
    const product = {
      id: expectedId,
      title: 'Guitarra Fender',
      price: 250000,
      thumbnail:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
    };
    const id = await this.container.save(product);

    const afterSaveContent = await this.container.getFileContent();

    expect(afterSaveContent.length).to.be.above(initialContent.length);
    expect(afterSaveContent[afterSaveContent.length - 1]).to.eql(product);
    expect(id).to.equal(expectedId);
  });

  it('should return a product by id', async function () {
    const [product] = await this.container.getFileContent();
    const { id } = product;

    const fetchedProduct = await this.container.getById(id);

    expect(fetchedProduct).to.eql(product);
  });

  it('should retrieve all objects in file', async function () {
    const expectedObjects = await this.container.getFileContent();

    const actualObjects = await this.container.getAll();

    expect(actualObjects).to.eql(expectedObjects);
  });

  it('should delete all objects from file', async function () {
    await this.container.deleteAll();

    const afterDeleteContent = await this.container.getFileContent();

    expect(afterDeleteContent.length).to.equal(0);
  });

  it('should delete an object by id', async function () {
    const initialContent = await this.container.getFileContent();
    const { id } = initialContent[0];

    await this.container.deleteById(id);

    const afterDeleteContent = await this.container.getFileContent();

    expect(afterDeleteContent.length).to.be.below(initialContent.length);
  });

  it('should throw error when it searches an object with non existant id', function () {
    const invalidId = 123456;
    expect(this.container.getById(invalidId)).to.be.eventually.equal(
      `Object with id ${invalidId} was not found.`
    );
  });
});
