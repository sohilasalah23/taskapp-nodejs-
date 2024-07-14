import mongoose from "mongoose";

export const dbconnection = () => {

    mongoose.connect(process.env.CONNECTIONURL)
        .then(() => console.log(' DB Connected!'))
        .catch((err) => console.log('err', err))
}