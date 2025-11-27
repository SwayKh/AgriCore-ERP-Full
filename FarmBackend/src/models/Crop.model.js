import mongoose from "mongoose";


const cropSchema = new mongoose.Schema({
    cropName:{
        type:String,
        required:true,
        unique:true
    },
    plantingDate:{
        type:Date,
        required:true,
    },
    harvestingDate:{
        type:Date,
        required:true,
    },
    actualYield:{
        type:Date,
        required:true,
        default:NULL,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["Planted", "Harvested"],
        default:"Planted",
        required:true
    },
    itemUsed:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Item",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

},{timestamps:true});

export const Crop = mongoose.model("Crop", cropSchema);