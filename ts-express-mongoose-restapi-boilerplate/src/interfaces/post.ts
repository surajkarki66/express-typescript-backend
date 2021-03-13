import mongoose, { Document, Model } from 'mongoose';

interface IComment extends Document {
    text: string;
    postedBy: mongoose.Schema.Types.ObjectId;
}

export interface IPostDocument extends Document {
    // This contains schema and instance methods
    title: string;
    postedBy: mongoose.Schema.Types.ObjectId;
    comments?: IComment[];
}

export interface IPostModel extends Model<IPostDocument> {
    // Static methods
    getAllPosts: () => Promise<Document>;
}
