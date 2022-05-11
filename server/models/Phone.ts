import { Schema, model } from "mongoose";

const schema = new Schema({
  "phone": {type: String, required: true, unique: true}
});

const Phone = model('Phone', schema);

export default Phone;