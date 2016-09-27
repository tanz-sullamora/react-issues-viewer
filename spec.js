// тестируем все файлы внутри директорий в app, исключая те, что лежат непосредственно в app (index.js, store.js)
var testsContext = require.context('./app', true, /\/.+\/.*\.js$/);
testsContext.keys().forEach(testsContext);

module.exports = testsContext;
