const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Gig = require('./models/Gig');
const Order = require('./models/Order');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Gig.deleteMany({});
    await Order.deleteMany({});

    console.log('👥 Creating users...');
    
    // Hash password once
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    // Create sellers - use insertMany to bypass pre-save hook
    const sellers = await User.insertMany([
      {
        username: 'sarah_designer',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'seller',
        description: 'Professional graphic designer with 5+ years experience'
      },
      {
        username: 'mike_developer',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'seller',
        description: 'Full-stack developer specializing in React and Node.js'
      },
      {
        username: 'lisa_writer',
        email: 'lisa@example.com',
        password: hashedPassword,
        role: 'seller',
        description: 'Creative content writer and copywriter'
      },
      {
        username: 'john_animator',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'seller',
        description: '2D/3D animator and motion graphics specialist'
      },
      {
        username: 'emma_marketer',
        email: 'emma@example.com',
        password: hashedPassword,
        role: 'seller',
        description: 'Digital marketing expert with SEO and social media expertise'
      }
    ]);

    // Create buyers - use insertMany to bypass pre-save hook
    const buyers = await User.insertMany([
      {
        username: 'alex_buyer',
        email: 'alex@example.com',
        password: hashedPassword,
        role: 'buyer'
      },
      {
        username: 'maria_buyer',
        email: 'maria@example.com',
        password: hashedPassword,
        role: 'buyer'
      }
    ]);

    console.log(`✅ Created ${sellers.length} sellers and ${buyers.length} buyers`);

    console.log('💼 Creating gigs...');

    const gigs = await Gig.create([
      // Graphics & Design
      {
        title: 'I will design a modern logo for your business',
        description: 'Get a professional, unique logo design for your brand. I provide multiple concepts, unlimited revisions, and all source files. Perfect for startups and established businesses looking to refresh their brand.',
        category: 'graphics-design',
        price: 50,
        deliveryTime: 3,
        seller: sellers[0]._id,
        tags: ['logo', 'branding', 'design', 'business'],
        orders: 15,
        rating: 4.8
      },
      {
        title: 'I will create stunning social media graphics',
        description: 'Professional social media graphics for Instagram, Facebook, Twitter, and LinkedIn. Includes posts, stories, banners, and covers. Eye-catching designs that drive engagement.',
        category: 'graphics-design',
        price: 35,
        deliveryTime: 2,
        seller: sellers[0]._id,
        tags: ['social media', 'graphics', 'instagram', 'facebook'],
        orders: 23,
        rating: 4.9
      },
      {
        title: 'I will design professional business cards',
        description: 'Custom business card design that makes a lasting impression. Double-sided design with unlimited revisions. Print-ready files included.',
        category: 'graphics-design',
        price: 25,
        deliveryTime: 2,
        seller: sellers[0]._id,
        tags: ['business card', 'print design', 'corporate'],
        orders: 18,
        rating: 4.7
      },

      // Programming & Tech
      {
        title: 'I will develop a responsive website using React',
        description: 'Modern, responsive website built with React.js. Includes mobile-friendly design, fast loading times, SEO optimization, and clean code. Perfect for businesses and portfolios.',
        category: 'programming-tech',
        price: 200,
        deliveryTime: 7,
        seller: sellers[1]._id,
        tags: ['react', 'website', 'web development', 'responsive'],
        orders: 12,
        rating: 5.0
      },
      {
        title: 'I will fix bugs in your JavaScript/React code',
        description: 'Quick bug fixes and debugging for your JavaScript, React, or Node.js applications. Fast turnaround, clean code, and detailed explanations of fixes.',
        category: 'programming-tech',
        price: 40,
        deliveryTime: 1,
        seller: sellers[1]._id,
        tags: ['javascript', 'react', 'debugging', 'bug fix'],
        orders: 31,
        rating: 4.9
      },
      {
        title: 'I will build a REST API with Node.js and Express',
        description: 'Custom REST API development with Node.js, Express, and MongoDB. Includes authentication, CRUD operations, error handling, and documentation.',
        category: 'programming-tech',
        price: 150,
        deliveryTime: 5,
        seller: sellers[1]._id,
        tags: ['nodejs', 'api', 'backend', 'express'],
        orders: 8,
        rating: 4.8
      },

      // Writing & Translation
      {
        title: 'I will write engaging blog posts and articles',
        description: 'SEO-optimized blog posts and articles on any topic. Well-researched, original content that engages readers and drives traffic. Multiple revisions included.',
        category: 'writing-translation',
        price: 30,
        deliveryTime: 2,
        seller: sellers[2]._id,
        tags: ['blog', 'article', 'content writing', 'SEO'],
        orders: 27,
        rating: 4.9
      },
      {
        title: 'I will write compelling product descriptions',
        description: 'Persuasive product descriptions that convert browsers into buyers. Perfect for e-commerce stores, Amazon listings, and online catalogs.',
        category: 'writing-translation',
        price: 20,
        deliveryTime: 1,
        seller: sellers[2]._id,
        tags: ['copywriting', 'product description', 'ecommerce'],
        orders: 34,
        rating: 4.8
      },
      {
        title: 'I will proofread and edit your documents',
        description: 'Professional proofreading and editing services. Grammar, spelling, punctuation, and style improvements. Perfect for essays, articles, and business documents.',
        category: 'writing-translation',
        price: 15,
        deliveryTime: 1,
        seller: sellers[2]._id,
        tags: ['proofreading', 'editing', 'grammar'],
        orders: 42,
        rating: 5.0
      },

      // Video & Animation
      {
        title: 'I will create professional 2D animations',
        description: 'Custom 2D animations for explainer videos, ads, and social media. Smooth animations, vibrant colors, and engaging storytelling.',
        category: 'video-animation',
        price: 100,
        deliveryTime: 5,
        seller: sellers[3]._id,
        tags: ['animation', '2D', 'explainer video', 'motion graphics'],
        orders: 9,
        rating: 4.9
      },
      {
        title: 'I will edit your videos professionally',
        description: 'Professional video editing for YouTube, social media, or business. Includes color correction, transitions, music, and effects. Fast delivery.',
        category: 'video-animation',
        price: 60,
        deliveryTime: 3,
        seller: sellers[3]._id,
        tags: ['video editing', 'youtube', 'premiere pro'],
        orders: 19,
        rating: 4.7
      },
      {
        title: 'I will create an engaging intro video',
        description: 'Eye-catching intro videos for YouTube channels, podcasts, or presentations. Custom animations with your logo and branding.',
        category: 'video-animation',
        price: 45,
        deliveryTime: 2,
        seller: sellers[3]._id,
        tags: ['intro', 'youtube', 'branding', 'animation'],
        orders: 25,
        rating: 4.8
      },

      // Digital Marketing
      {
        title: 'I will manage your social media accounts',
        description: 'Complete social media management including content creation, posting schedule, engagement, and analytics. Grow your online presence.',
        category: 'digital-marketing',
        price: 120,
        deliveryTime: 30,
        seller: sellers[4]._id,
        tags: ['social media', 'marketing', 'instagram', 'management'],
        orders: 11,
        rating: 4.9
      },
      {
        title: 'I will do SEO optimization for your website',
        description: 'Comprehensive SEO audit and optimization. Keyword research, on-page SEO, technical SEO, and actionable recommendations to improve rankings.',
        category: 'digital-marketing',
        price: 80,
        deliveryTime: 4,
        seller: sellers[4]._id,
        tags: ['SEO', 'optimization', 'google', 'ranking'],
        orders: 16,
        rating: 5.0
      },
      {
        title: 'I will run effective Facebook and Instagram ads',
        description: 'Targeted ad campaigns that deliver results. Includes audience research, ad creation, campaign setup, and performance optimization.',
        category: 'digital-marketing',
        price: 90,
        deliveryTime: 3,
        seller: sellers[4]._id,
        tags: ['facebook ads', 'instagram ads', 'PPC', 'advertising'],
        orders: 13,
        rating: 4.8
      }
    ]);

    console.log(`✅ Created ${gigs.length} gigs`);

    // Create some sample orders
    console.log('📦 Creating sample orders...');
    
    const orders = await Order.create([
      {
        gig: gigs[0]._id,
        buyer: buyers[0]._id,
        seller: sellers[0]._id,
        price: gigs[0].price,
        status: 'completed',
        requirements: 'Please create a modern logo for my tech startup. Colors: blue and white.',
        deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        gig: gigs[3]._id,
        buyer: buyers[1]._id,
        seller: sellers[1]._id,
        price: gigs[3].price,
        status: 'in-progress',
        requirements: 'Need a portfolio website with 5 pages. Clean and modern design.',
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
      },
      {
        gig: gigs[6]._id,
        buyer: buyers[0]._id,
        seller: sellers[2]._id,
        price: gigs[6].price,
        status: 'pending',
        requirements: 'Write 3 blog posts about digital marketing trends.',
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
      }
    ]);

    console.log(`✅ Created ${orders.length} sample orders`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${sellers.length + buyers.length}`);
    console.log(`   Gigs: ${gigs.length}`);
    console.log(`   Orders: ${orders.length}`);
    console.log('\n🔐 Login credentials for testing:');
    console.log('   Sellers: sarah@example.com, mike@example.com, etc.');
    console.log('   Buyers: alex@example.com, maria@example.com');
    console.log('   Password (all): password123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();