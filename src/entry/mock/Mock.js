const Mock = require("mockjs")
let data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        'nickname': '@first @last',
        'score|50-100': 100,
        'tel|13000000000-14000000000':13000000000
    }]
})
let MockData = JSON.stringify(data)

module.exports = MockData