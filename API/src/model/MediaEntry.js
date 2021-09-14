import mongoose from "mongoose";
const { Schema, model } = mongoose

const mediaEntrySchema = new Schema({
    type: String,
    expiresIn: Date,
    enabled: Boolean
})

const MediaEntryModel = model('MediaEntry', mediaEntrySchema)

export default MediaEntryModel