import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, 
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Service = mongoose.model("service", serviceSchema);

export default Service;
