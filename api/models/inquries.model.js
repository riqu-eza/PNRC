import mongoose  from "mongoose";

const inqurySchema = new mongoose.Schema(
{
    text:{
        type: String,
        required: true,
    },
    
},
{ timestamps: true }

)

const Inquiry = mongoose.model("Inquiry", inqurySchema);

export default Inquiry;
