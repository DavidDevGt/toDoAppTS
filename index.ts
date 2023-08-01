import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

// Interface para representar una tarea
interface Tarea {
  descripcion: string;
}

// Clase que maneja las operaciones de lectura y escritura de tareas en el archivo JSON
class TareasRepository {
  private readonly TAREAS_DB_FILE = 'tareas.json';

  public obtenerTareas(): Tarea[] {
    try {
      const data = fs.readFileSync(this.TAREAS_DB_FILE, 'utf8');
      return JSON.parse(data) as Tarea[];
    } catch (err) {
      console.error('Error al leer las tareas:', err);
      return [];
    }
  }

  public guardarTareas(tareas: Tarea[]): void {
    try {
      fs.writeFileSync(this.TAREAS_DB_FILE, JSON.stringify(tareas, null, 2), 'utf8');
    } catch (err) {
      console.error('Error al guardar las tareas:', err);
    }
  }

  public agregarTarea(descripcion: string): void {
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
app.get('/api/tareas', (req: Request, res: Response) => {
  const tareas = tareasRepository.obtenerTareas();
  res.json(tareas);
});

app.post('/api/tareas', (req: Request, res: Response) => {
  const nuevaTarea = req.body.descripcion;
  tareasRepository.agregarTarea(nuevaTarea);
  res.json({ mensaje: '¡Tarea agregada a la lista!' });
});

// INICIAR SERVER
app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}`);
});
