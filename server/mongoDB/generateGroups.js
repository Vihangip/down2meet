const Item = require('./Groups');
const { v4: uuid } = require('uuid');


function generateGroups() {
    const group1 = new Item({
      "id": "1",
      "name": "family",
      "members":[uuid(), uuid(), uuid()]
    });
    const group2 = new Item({
      "id": "2",
      "name": "friends",
      "members":[uuid(), uuid(), uuid()]
    });
    const group3 = new Item({
      "id": "3",
      "name": "work",
      "members":[uuid(), uuid(), uuid()]
    });
    
    group1.save();
    group2.save();
    group3.save();
}

module.exports = generateGroups;