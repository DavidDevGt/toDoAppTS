$(document).ready(() => {
  // Función para cargar las tareas desde el servidor y mostrarlas en la lista
  function cargarTareas() {
    $.get('/api/tareas', (data) => {
      const listaTareas = $('#lista-tareas');
      listaTareas.empty();
      data.forEach((tarea, indice) => {
        const completada = tarea.completada ? 'completada' : '';
        listaTareas.append(`<li class="list-group-item ${completada}" data-indice="${indice}">${tarea.descripcion}</li>`);
      });
    });
  }

  // Cargar las tareas al iniciar la página
  cargarTareas();

  // Agregar una nueva tarea
  $('#form-tarea').submit((event) => {
    event.preventDefault();
    const descripcion = $('#descripcion').val();
    $.post('/api/tareas', { descripcion }, () => {
      cargarTareas();
      $('#descripcion').val('');
    });
  });

  // Marcar como completada o eliminar una tarea
  $('#lista-tareas').on('click', 'li', function (event) {
    const indice = $(this).data('indice');
    if (indice !== undefined && indice >= 0) {
      if (event.ctrlKey) {
        // Ctrl + clic para eliminar la tarea
        $.ajax({
          url: `/api/tareas/${indice}`,
          method: 'DELETE',
          success: () => {
            cargarTareas();
          },
        });
      } else {
        // Clic normal para marcar como completada o desmarcar
        $.ajax({
          url: `/api/tareas/${indice}/completada`,
          method: 'PUT',
          success: () => {
            cargarTareas();
          },
        });
      }
    }
  });
});
