import mongoose from 'mongoose';

export class MongoDB {
  constructor() {
    this.dbName = 'OrientaTech';
    this.uri = `mongodb+srv://cironidas:CiroLeon*19@cluster0.kwvwrzg.mongodb.net/${this.dbName}`;
    this.respuestaSchema = new mongoose.Schema({}, { strict: false });
    this.db = null;
  }

  connectDB() {
    mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    this.db.once('open', () => {
      console.log('Conexión exitosa a MongoDB');
    });
  }

  getModel() {
    return mongoose.models.Respuesta || mongoose.model('Respuesta', this.respuestaSchema, 'answers');
  }
}
