// Проблема отсутствующего catch и проглоченной ошибки

const fs = require('mz/fs');

fs.readFile(__filename)
  .then( function(res) {
    return fs.readFile(__filename);
  })
  .then( function(res2) {
    // если где-то ошибка - она будет поймана в catch
    throw new Error("WOPS");
  });

// ВЫВЕДЕТ ПРЕДУПРЕЖДЕНИЕ! ОШИБКА ПРОГЛОЧЕНА

// отслеживаем unhandled ошибки (нет catch на этом event loop)
// https://iojs.org/api/process.html#process_event_rejectionhandled
const unhandledRejections = [];

process.on('unhandledRejection',  function(err, p) {

  // можно дать больше свободы "кривому" (3rd-party) коду:
  // выводить не сейчас, а через 1 сек, если не rejectionHandled
  // для этого держим список unhandledRejections
  // также список позволяет оценить общее количество проблем и утечек
  unhandledRejections.push(p);
  console.log("UNHANDLED", err.message, err.stack, "total: " + unhandledRejections.length);
});

process.on('rejectionHandled',  function(p) {
  const index = unhandledRejections.indexOf(p);
  unhandledRejections.splice(index, 1);
});
