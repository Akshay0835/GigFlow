const Gig = require('../models/Gig');

exports.createGig = async (req, res) => {
  try {
    const { title, description, category, price, deliveryTime, tags, images } = req.body;

    if (req.user.role === 'buyer') {
      return res.status(403).json({ message: 'Only sellers can create gigs' });
    }

    const gig = await Gig.create({
      title,
      description,
      category,
      price,
      deliveryTime,
      tags: tags || [],
      images: images || [],
      seller: req.user._id
    });

    await gig.populate('seller', 'username email profileImage');
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGigs = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    const query = { status: 'active' };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'popular') sortOption.orders = -1;
    else sortOption.createdAt = -1;

    const gigs = await Gig.find(query)
      .populate('seller', 'username email profileImage')
      .sort(sortOption);

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('seller', 'username email profileImage description');

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this gig' });
    }

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'username email profileImage');

    res.json(updatedGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this gig' });
    }

    await Gig.findByIdAndUpdate(req.params.id, { status: 'deleted' });
    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ 
      seller: req.user._id,
      status: { $ne: 'deleted' }
    }).populate('seller', 'username email profileImage');

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};