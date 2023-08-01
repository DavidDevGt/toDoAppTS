"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// Clase que maneja las operaciones de lectura y escritura de tareas en el archivo JSON
class TareasRepository {
    constructor() {
        this.TAREAS_DB_FILE = 'tareas.json';
    }
    obtenerTareas() {
        try {
            const data = fs.readFileSync(this.TAREAS_DB_FILE, 'utf8');
            return JSON.parse(data);
        }
        catch (err) {
            console.error('Error al leer las tareas:', err);
            return [];
        }
    }
    guardarTareas(tareas) {
        try {
            fs.writeFileSync(this.TAREAS_DB_FILE, JSON.stringify(tareas, null, 2), 'utf8');
        }
        catch (err) {
            console.error('Error al guardar las tareas:', err);
        }
    }
    agregarTarea(descripcion) {
        const tareas = this.obtenerTareas();
        tareas.push({ descripcion });
        this.guardarTareas(tareas);
    }
}
// Crear una instancia de TareasRepository
const tareasRepository = new TareasRepository();
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// API
app.get('/api/tareas', (req, res) => {
    const tareas = tareasRepository.obtenerTareas();
    res.json(tareas);
});
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body.descripcion;
    tareasRepository.agregarTarea(nuevaTarea);
    res.json({ mensaje: '¡Tarea agregada a la lista!' });
});
// INICIAR SERVER
app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}`);
});
