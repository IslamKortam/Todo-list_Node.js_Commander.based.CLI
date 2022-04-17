const {Command} = require('commander');
const {addTodoItem, deleteTodoItem, editTodoItem, listTodoItem} = require('./crudOperations')

const program = new Command();
program.name('todo-list').description('todo-list cli application').version('1.0.0');

/** ********************************* Commands **************************************  */
program.command('add')
.description('add commad inserts a new todo-list item')
.requiredOption('-t, --title <string>', 'Title of the todo-list')
.option('-s, --status <string>', 'Status of the todo-list item. It can have one of these values: ["done", "in progress", "to-do"]', 'to-do')
.action(addTodoItem);



program.command('edit')
.description('edit commad edits an existing todo-list item')
.argument('itemId', 'ID of the item to delete')
.option('-t, --title <string>', 'Title of the todo-list')
.option('-s, --status <string>', 'Status of the todo-list item. It can have one of these values: ["done", "in progress", "to-do"]')
.action((id, options) => {editTodoItem(id, options)});



program.command('delete')
.description('delete commad deletes an existing todo-list item')
.argument('itemId', 'ID of the item to delete')
.action(deleteTodoItem);



program.command('list')
.description('list commad lists all todo-list items if no option specefied. If an option spacefied, it lists the items that meets the provided status')
.option('-s, --status <string>', 'Status of the todo-list item. It can have one of these values: ["done", "in progress", "to-do"]')
.option('-i, --id <number>', 'The id of the todo item')
.option('-t, --title <string>', 'Title of the todo-list')
.action((options) => {
    console.log(listTodoItem(options));
});



program.parse();