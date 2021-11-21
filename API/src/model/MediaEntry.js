import mongoose from "mongoose";
const { Schema, model } = mongoose

const mediaEntrySchema = new Schema({
    type: String,
    expiresIn: Date,
    extension: String,
    enabled: Boolean
})

mediaEntrySchema.methods.fullName = function() {
    return this._id + this.extension
}

const MediaEntryModel = model('MediaEntry', mediaEntrySchema)

export default MediaEntryModel