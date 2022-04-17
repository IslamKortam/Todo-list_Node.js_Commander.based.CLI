const fs = require('fs');

const itemsFilePath = './DB/items.json';
const metaDataFilePath = './DB/metadata.json'

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

module.exports = {updateItems, getItems, getMetaData, updateMetaData}