import mongoose, { Schema } from 'mongoose';

import { IPostDocument, IPostModel } from '../interfaces/post';

const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [CommentSchema]
});

// Static methods
PostSchema.statics.getAllPosts = async function () {
    return this.find({}).populate('postedBy').populate('comments.postedBy');
};
const PostModel: IPostModel = mongoose.model<IPostDocument, IPostModel>('Post', PostSchema);

export default PostModel;
