$(document).ready(() => {
  $.get('/api/tareas', (data) => {
    const listaTareas = $('#lista-tareas');
    listaTareas.empty();
    data.forEach((tarea) => {
      listaTareas.append(`<li class="list-group-item">${tarea.descripcion}</li>`);
    });
  });

  $('#form-tarea').submit((event) => {
    event.preventDefault();
    const descripcion = $('#descripcion').val();
    $.post('/api/tareas', { descripcion }, (data) => {

        $('#lista-tareas').append(`<li class="list-group-item">${descripcion}</li>`);
      $('#descripcion').val('');

      $.get('/api/tareas', (data) => {
        const listaTareas = $('#lista-tareas');
        listaTareas.empty();
        data.forEach((tarea) => {
          listaTareas.append(`<li class="list-group-item">${tarea.descripcion}</li>`);
        });
      });
    });
  });
});
