const mongoose = require('mongoose');

// needed for updated version
mongoose.set('useFindAndModify',false);

const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';

// options needed for updated version
const connect = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then((db) => {
    console.log('Connected correctl to server');
    // var newDish = Dishes({
    //     name: 'Uthappizza',
    //     description: 'test'
    // });

    // newDish.save()
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                $set: {description: 'Updated test'}
            },{
                new: true
            }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);
            // remove is deprecated using deleteOne
            return Dishes.deleteOne({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});