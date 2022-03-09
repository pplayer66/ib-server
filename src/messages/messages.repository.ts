import { readFile, writeFile } from "fs/promises";

export class MessagesRepository {
  async getMessages() {
    const contents = await readFile("messages.json", "utf8");
    return JSON.parse(contents);
  }

  async findOne(id: string) {
    const messages = await this.getMessages();
    console.log(messages);
    return messages[id];
  }

  async findAll() {
    const messages = await this.getMessages();
    return messages;
  }

  async create(content: string) {
    const messages = await this.getMessages();
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile("messages.json", JSON.stringify(messages));
  }
}
