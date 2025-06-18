
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); 

const User = require('./models/User');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');

// Loading the environment variables
dotenv.config();

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('🔌 Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seed() {
  try {
    // Clearing any existing data, so to avoid production time issues
    await User.deleteMany();
    await Listing.deleteMany();
    await Booking.deleteMany();

    // Created users with hashed passwords
    const hashedPassword = await bcrypt.hash('123456', 10);
    const hostUser = new User({ username: 'host123', email: 'host@example.com', password: hashedPassword, role: 'host' });
    const guestUser = new User({ username: 'guest123', email: 'guest@example.com', password: hashedPassword, role: 'guest' });
    //password for both is : 123456

    await hostUser.save();
    await guestUser.save();

    // Creating a sample listings
    const listings = await Listing.insertMany([
      {
        title: 'Cozy Apartment in Delhi',
        description: 'A nice, fully-furnished apartment in South Delhi.',
        location: 'Delhi',
        pricePerNight: 1500,
        images: ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/600493419.jpg?k=66d20888192522896474d3f177f896cd00933069b352f8c1fd90381321bcb745&o=&hp=1'],
        host: hostUser._id,
      },
      {
        title: 'Sea-facing Villa in Goa',
        description: 'Beach vibes, private pool, and full serenity.',
        location: 'Goa',
        pricePerNight: 3500,
        images: ['https://luxurystays.in/sale-villas/LSG-005/0.jpg'],
        host: hostUser._id,
      },
      {
        title: 'Budget Room in Jaipur',
        description: 'Affordable yet comfortable room for backpackers.',
        location: 'Jaipur',
        pricePerNight: 700,
        images: ['https://im.hunt.in/cg/jaipur/City-Guide/Budget_Hotels_Jaipur.JPG'],
        host: hostUser._id,
      }
    ]);

    // Creating  a sample booking
    await Booking.create({
      listing: listings[0]._id,
      guest: guestUser._id,
      checkIn: new Date('2025-07-10'),
      checkOut: new Date('2025-07-12'),
      totalPrice: 3000,
    });

    console.log('✅ Seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
