const fs = require('fs');


const {Command} = require('commander');
const program = new Command();

program.name('todo-list').description('todo-list cli application').version('1.0.0');
const itemsFilePath = './DB/items.json';
const metaDataFilePath = './DB/metadata.json'

const validTodoStatusList = ["done", "in progress", "to-do"]


/** ********************************* File Handling **************************************  */
const updateItems = (newList) => {
    const newListStringfied = JSON.stringify(newList, null, 4);
    fs.writeFileSync(itemsFilePath, newListStringfied);
}

const getItems = () => {
    const itemsStringfied = fs.readFileSync(itemsFilePath, 'utf-8');
    const items = JSON.parse(itemsStringfied);
    return items;
}



const getMetaData = () =>{
    const metadataStr = fs.readFileSync(metaDataFilePath, 'utf-8');
    const metadata = JSON.parse(metadataStr);
    return metadata;
}

const updateMetaData = (metadata) =>{
    const metadataStringfied = JSON.stringify(metadata, null, 4);
    fs.writeFileSync(metaDataFilePath, metadataStringfied);
}

/** ********************************* helper Methods **************************************  */
const generateNewID = () => {
    const metadata = getMetaData();
    metadata.currentID += 1;
    const newID = metadata.currentID;
    updateMetaData(metadata);
    return newID;
}

const isValidStatus = (status) => {
    status = status.toLowerCase();
    return validTodoStatusList.includes(status);
}


/** ********************************* Actions **************************************  */
const addTodoItem = (options) => {
    if(!isValidStatus(options.status)){
        throw RangeError("Not a valid status")
    }
    
    const item = { id: generateNewID(), ...options};
    item.status = item.status.toLowerCase()
    const items = getItems();
    items.push(item);
    updateItems(items);
}


const deleteTodoItem = (id) => {
    if(isNaN(id)){
        throw TypeError('Expected a Number found NaN');
    }
    id = +id;
    let items = getItems();

    items = items.filter((item) => item.id !== id);
    updateItems(items);
}

const editTodoItem = (id, options) => {
    if(isNaN(id)){
        throw TypeError('Expected the id to be a Number found NaN')
    }
    if(options.status){
        if(!isValidStatus(options.status)){
            //Status found but not valid
            throw RangeError("Not a valid status");
        }
        options.status = options.status.toLowerCase();
    }

    id = +id;

    const items = getItems();
    const itemIndex = items.findIndex((item) => item.id === id);
    if(itemIndex === -1){
        throw RangeError('No such item');
    }

    for(const optionKey in options){
        items[itemIndex][optionKey] = options[optionKey];
    }
    updateItems(items);
}

const listTodoItem = (options) => {
    if(options.status){
        if(!isValidStatus(options.status)){
            throw RangeError('Not a valid Status');
        }
        options.status = options.status.toLowerCase();
    }
    if(options.id){
        if(isNaN(options.id)){
            throw TypeError('Expected id to be a Number, found a NaN');
        }
        options.id = +options.id;
    }

    let items = getItems();
    items = items.filter((item) => {
        let isValidItem = true;
        for(const optionKey in options){
            isValidItem = isValidItem && (item[optionKey] === options[optionKey]);
        }
        return isValidItem;
    });

    console.log(items);
}





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
.action(listTodoItem);


program.parse();




