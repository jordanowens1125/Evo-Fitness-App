import mongoose from "mongoose";
const { Schema } = mongoose;

const workoutSchema = new Schema({
  date: { type: Date, default: Date.now() }, // String is shorthand for {type: String}
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  exercises: [
    {
      exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
      kind: {
        type: String,
        enum: ['Weight/Reps', 'Distance/Time'],
        default: 'Weight/Reps',
      },
      sets: [
        {
          reps:Number,
          weight: Number,
          units: String,
        }
      ],
    }
  ]
});

module.exports = mongoose.model("Workout", workoutSchema);
