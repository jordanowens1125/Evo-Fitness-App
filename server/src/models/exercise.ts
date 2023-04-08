import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  title: String, // String is shorthand for {type: String}
    creator: {
      type: Schema.Types.ObjectId, ref: 'User',
    },
    muscle_groups: [{
        String
    }],
    
});


module.exports = mongoose.model("Exercise", exerciseSchema);