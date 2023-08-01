import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

// API
app.get('/api/tareas', (req: Request, res: Response) => {
    const tareas = obtenerTareas();
    res.json(tareas);
});

app.post('/api/tareas', (req: Request, res: Response) => {
    const nuevaTarea = req.body.descripcion;
    agregarTarea(nuevaTarea);
    res.json({ mensaje: '¡Tarea agregada a la lista!' });
});

// usando el localStorage
function obtenerTareas() {
    const tareasJson = localStorage.getItem('tareas');
    return tareasJson ? JSON.parse(tareasJson) : [];
}

function agregarTarea(descripcion: string) {
    const tareas = obtenerTareas();
    tareas.push({ descripcion });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// INICIAR SERVER
app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}`);
});