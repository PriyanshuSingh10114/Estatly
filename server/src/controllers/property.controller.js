import Property from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const query = { isActive: true };
    if (req.query.location) query.location = new RegExp(req.query.location, 'i');
    if (req.query.bhk) query.bedrooms = Number(req.query.bhk);

    const properties = await Property.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Property.countDocuments(query);

    res.json({
      properties,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    property.views += 1;
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

export const createProperty = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
};
