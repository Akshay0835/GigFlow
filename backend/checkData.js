const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Gig = require('./models/Gig');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const checkData = async () => {
  try {
    const userCount = await User.countDocuments();
    const gigCount = await Gig.countDocuments();
    
    console.log(`\n📊 Database Status:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Gigs: ${gigCount}\n`);
    
    if (gigCount > 0) {
      console.log('First 5 gigs:');
      const gigs = await Gig.find().limit(5);
      gigs.forEach(gig => {
        console.log(`  - ${gig.title} (${gig.category}) - $${gig.price}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkData();