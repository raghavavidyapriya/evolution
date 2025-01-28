import carModel from "../models/carModel.js"
import fs from 'fs'

// add
const addCar = async(req, res) => {
    let image_filename = `${req.file.filename}`

    const car = new carModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await car.save()
        res.json({success:true, message: "Accessory added"})
    } catch(error){
        res.json({success:false, message:"Error in adding accessory"})
    }
}

// list
const listCars = async(req, res) => {
    try {
        const cars = await carModel.find({}).sort({name:1});
        res.json({success:true, data:cars})
    } catch (error) {
        res.json({success:false, data:"Error in viewing accessories"})
    }
}

// remove 
const removeCars = async(req, res) => {
    try {
        const car = await carModel.findById(req.body.id)
        fs.unlink(`uploads/${car.image}`, ()=>{})
        await carModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Accessory deleted"})
    } catch (error) {
        res.json({success:false, message:"Error in deleting accessory"})
    }
}

export {addCar, listCars, removeCars}