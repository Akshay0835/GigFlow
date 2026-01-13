const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Gig = require('./models/Gig');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'));

const fixStatus = async () => {
  try {
    const result = await Gig.updateMany(
      {},
      { $set: { status: 'active' } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} gigs to active status`);
    
    const activeGigs = await Gig.find({ status: 'active' });
    console.log(`📊 Total active gigs: ${activeGigs.length}`);
    
    if (activeGigs.length > 0) {
      console.log('\nFirst 3 active gigs:');
      activeGigs.slice(0, 3).forEach(gig => {
        console.log(`  - ${gig.title}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixStatus();