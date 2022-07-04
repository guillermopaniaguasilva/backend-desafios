const fs = require('fs');

class Container {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getFileContent() {
    try {
      return JSON.parse(
        await fs.promises.readFile(this.filePath, {
          encoding: 'utf-8',
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async save(object) {
    try {
      const currentFileContent = await this.getFileContent();
      const id = currentFileContent.length + 1;
      currentFileContent.push({ id, ...object });
      const newFileContent = JSON.stringify(currentFileContent);
      await fs.promises.writeFile(this.filePath, newFileContent);
      return id;
    } catch (error) {
      throw new Error('An error occurred while saving the object.');
    }
  }

  async getById(id) {
    try {
      const currentFileContent = await this.getFileContent();
      const result = currentFileContent.find((product) => product.id === id);

      if (!result) throw new Error(`Object with id ${id} was not found.`);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.getFileContent();
    } catch (error) {
      throw new Error('An error occurred while fetching the objects.');
    }
  }

  async deleteById(id) {
    try {
      const currentFileContent = await this.getFileContent();
      const newFileContent = JSON.stringify(
        currentFileContent.filter((product) => product.id !== id)
      );
      await fs.promises.writeFile(this.filePath, newFileContent);
    } catch (error) {
      throw new Error('An error occurred while deleting the object.');
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([]));
    } catch (error) {
      throw new Error('An error occurred while deleting all objects.');
    }
  }
}

module.exports = Container;
