const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// configura el servidor para utilizar body-parser
app.use(bodyParser.json());
app.use(cors());


// define la ruta principal del servidor
app.get('/', (req, res) => {
    res.send('Hola, desde el servidor Express');
});

app.listen(3001, () => console.log('Server started on port 3001'));

mongoose.connect('mongodb+srv://cironidas:CiroLeon*19@cluster0.kwvwrzg.mongodb.net/OrientaTech');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectado a la base de datos MongoDB!');
});

const AnswerSchema = new mongoose.Schema({
    'Edad': String,
    'Género': String,
    'Código postal': String,
    '¿Qué modalidad de trabajo te gustaría en el mundo laboral?': String,
    'Estudios de acceso al CFGS': String,
    'Motivo por el que quieres estudiar un CFGS': String,
    '¿Te gustaría trabajar para una empresa o emprender por tu cuenta?': String,
    'Sientes interés por el mantenimiento de sistemas, entonos de red, hardware y software': Number,
    '¿Te genera curiosidad aprender sobre el mundo de la ciberseguridad y hacking ético?': Number,
    'He sentido atracción en cómo los programas informáticos incluyen distintos enfoques como el conocimiento de áreas matemáticas, estadística, ciencias…': Number,
    'Siento curiosidad por cómo funcionan los datos y la gestión de procesos que ocurren detrás de un sitio web o aplicación': Number,
    'Pienso que se me daría bien elegir una buena estructura para montar una página web': Number,
    'Sientes curiosidad por cómo está hecha una página web, su estética y diseño me resultan lo más interesante': Number
});

const Answer = mongoose.model('Answer', AnswerSchema);
  
app.post('/api/answers', async (req, res) => {
  const newAnswer = new Answer(req.body); // Cambio aquí
  const savedAnswer = await newAnswer.save();

  res.json(savedAnswer);
});