
const {getMetaData, updateMetaData} = require('./fileHandling.js');
const validTodoStatusList = ["done", "in progress", "to-do"]


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

module.exports = {generateNewID, isValidStatus}