const Mock = require("mockjs")
let data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        'nickname|1-2':"Curry"
    }]
})
let MockData = JSON.stringify(data)

module.exports = MockData