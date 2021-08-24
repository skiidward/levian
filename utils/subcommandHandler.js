class SubcommandHandler {
  constructor(client, ...args) {
    this.commands = {};
    this.client = client;
    this.args = args;
  }

  addCommand(name, fn){
    this.commands[name] = fn;
  }

  run(){
    await this.commands[this.args[0]].call(this.client, ...this.args.slice(1));
  }
}

//all i do is codding