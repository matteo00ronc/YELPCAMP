const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d4f2853a5e11ad3614950d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/doahzvp3a/image/upload/v1691748606/YelpCamp/bai2lxfjq9uvm5zeyuql.jpg',
                filename: 'YelpCamp/bai2lxfjq9uvm5zeyuql'
            },
            {
                url: 'https://res.cloudinary.com/doahzvp3a/image/upload/v1691757505/YelpCamp/w8maxkwic0qrv75whi0f.webp',
                filename: 'YelpCamp/w8maxkwic0qrv75whi0f'
            }],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt natus nulla dolorem molestiae quis ducimus? Maxime aliquid eum harum dolorum ad, veritatis delectus enim atque iusto. Modi nihil aliquid libero.',
            price: price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});