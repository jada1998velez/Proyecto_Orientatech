import mongoose from 'mongoose'


export class MongoDB {
  dbName = 'OrientaTech';
  uri = 'mongodb+srv://cironidas:CiroLeon*19@cluster0.kwvwrzg.mongodb.net/' + this.dbName;
  respuestaSchema = new mongoose.Schema({}, {strict: false});
  db = null;

    createSchema() {
        this.respuestaSchema = new mongoose.Schema({ }, { strict: false }); 
    }

    connectDB() {
        mongoose.connect(this.uri, {useUnifiedTopology: true, useNewUrlParser: true});
        mongoose.Promise = global.Promise;
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    }

    getModel() {
        return mongoose.model('Respuesta', this.respuestaSchema, 'respuestas');
    }
}


