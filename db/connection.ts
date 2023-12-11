import mongoose from 'mongoose'

export function connectDB(): void {
    mongoose.connect("mongodb+srv://ahmedyousry098:ahmedyousry098@cluster0.dlciqzv.mongodb.net/")
        .then(() => console.log('DB Connected Successfully') )
        .catch(err => console.log(err))
}