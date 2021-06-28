import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import adminRouter from './routes/admin.routes';
import realEstateRouter from './routes/real-estate.routes';
import msgRouter from './routes/msg.routes';
import offerRouter from './routes/offer.routes';

const app = express();

app.use(cors());
//app.use(bodyParser.json()); //podaci se razmenjuju u JSON formatu

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Connected to MongoDB')
});

const router = express.Router(); //ruter prihvata http zahteve
router.use('/users', userRouter); //rutu za korisnike obrađuje ruter za korisnike
router.use('/admin', adminRouter);
router.use('/realestate', realEstateRouter);
router.use('/msg', msgRouter);
router.use('/offer', offerRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

