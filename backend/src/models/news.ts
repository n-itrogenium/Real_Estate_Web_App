import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let News = new Schema(
    {
        id: {
            type: Number
        },
        caption: {
            type: String
        },
        comments: {
            type: Array
        }
    }
);

export default mongoose.model('News', News, 'news');