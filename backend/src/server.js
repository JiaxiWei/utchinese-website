const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

// Frontend URL for CORS
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Secret key for JWT token
const JWT_SECRET = process.env.JWT_SECRET || 'ut-chinese-network-secret-key';

// Default admin password hash (can be changed later via API)
const DEFAULT_ADMIN_PASSWORD = 'utchinese';
const DEFAULT_PASSWORD_HASH = crypto.createHash('sha256').update(DEFAULT_ADMIN_PASSWORD).digest('hex');

// Middleware
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'], // 允许前端域名和本地开发环境
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const eventImagesDir = path.join(uploadsDir, 'events');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

if (!fs.existsSync(eventImagesDir)) {
  fs.mkdirSync(eventImagesDir);
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, eventImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max file size
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Admin Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Initialize admin password if not set
const initializeAdminPassword = async () => {
  try {
    const adminPassword = await prisma.adminConfig.findUnique({
      where: { key: 'admin_password' }
    });
    
    if (!adminPassword) {
      await prisma.adminConfig.create({
        data: {
          key: 'admin_password',
          value: DEFAULT_PASSWORD_HASH
        }
      });
      console.log('Admin password initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing admin password:', error);
  }
};

// Call initialization function
initializeAdminPassword();

// Admin Authentication Routes
// Verify admin password
app.post('/api/admin/verify', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    
    const adminConfig = await prisma.adminConfig.findUnique({
      where: { key: 'admin_password' }
    });
    
    if (!adminConfig) {
      return res.status(500).json({ error: 'Admin configuration not found' });
    }
    
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (passwordHash !== adminConfig.value) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ token, message: 'Authentication successful' });
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Change admin password (requires authentication)
app.put('/api/admin/password', authenticateAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }
    
    const adminConfig = await prisma.adminConfig.findUnique({
      where: { key: 'admin_password' }
    });
    
    const currentPasswordHash = crypto.createHash('sha256').update(currentPassword).digest('hex');
    
    if (currentPasswordHash !== adminConfig.value) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    
    await prisma.adminConfig.update({
      where: { key: 'admin_password' },
      data: { value: newPasswordHash }
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Helper function to extract filename from imageUrl
const getImageFilenameFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const urlParts = imageUrl.split('/');
  return urlParts[urlParts.length - 1];
};

// Helper function to delete image file
const deleteImageFile = (filename) => {
  if (!filename) return;
  
  const imagePath = path.join(eventImagesDir, filename);
  if (fs.existsSync(imagePath)) {
    try {
      fs.unlinkSync(imagePath);
      console.log(`Deleted old image: ${filename}`);
    } catch (error) {
      console.error(`Failed to delete image file: ${filename}`, error);
    }
  }
};

// Routes
// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const { status, language = 'en' } = req.query;
    let whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { startDate: 'desc' }
      ]
    });
    
    // Transform data based on language
    const transformedEvents = events.map(event => ({
      id: event.id,
      title: language === 'zh' ? event.title_zh : event.title_en,
      description: language === 'zh' ? event.description_zh : event.description_en,
      imageUrl: event.imageUrl,
      startDate: event.startDate,
      endDate: event.endDate,
      location: language === 'zh' ? event.location_zh : event.location_en,
      status: event.status,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      link: event.link,
      featured: event.featured,
      // Include original fields for admin purposes
      title_en: event.title_en,
      title_zh: event.title_zh,
      description_en: event.description_en,
      description_zh: event.description_zh,
      location_en: event.location_en,
      location_zh: event.location_zh
    }));
    
    res.json(transformedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get event by id
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'en' } = req.query;
    
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Transform data based on language
    const transformedEvent = {
      id: event.id,
      title: language === 'zh' ? event.title_zh : event.title_en,
      description: language === 'zh' ? event.description_zh : event.description_en,
      imageUrl: event.imageUrl,
      startDate: event.startDate,
      endDate: event.endDate,
      location: language === 'zh' ? event.location_zh : event.location_en,
      status: event.status,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      link: event.link,
      featured: event.featured,
      // Include original fields for admin purposes
      title_en: event.title_en,
      title_zh: event.title_zh,
      description_en: event.description_en,
      description_zh: event.description_zh,
      location_en: event.location_en,
      location_zh: event.location_zh
    };
    
    res.json(transformedEvent);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create a new event (requires authentication)
app.post('/api/events', authenticateAdmin, async (req, res) => {
  try {
    const { 
      title_en, 
      title_zh,
      description_en, 
      description_zh,
      imageUrl, 
      startDate, 
      endDate, 
      location_en,
      location_zh,
      link, 
      featured 
    } = req.body;
    
    // Calculate event status
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    let status;
    if (end && now > end) {
      status = 'past';
    } else if (start > now) {
      status = 'upcoming';
    } else {
      status = 'ongoing';
    }
    
    const newEvent = await prisma.event.create({
      data: {
        title_en,
        title_zh,
        description_en,
        description_zh,
        imageUrl,
        startDate: start,
        endDate: end,
        location_en,
        location_zh,
        status,
        link,
        featured: featured || false
      }
    });
    
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update an event (requires authentication)
app.put('/api/events/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title_en, 
      title_zh,
      description_en, 
      description_zh,
      imageUrl, 
      startDate, 
      endDate, 
      location_en,
      location_zh,
      status: providedStatus, 
      link, 
      featured 
    } = req.body;
    
    // Get existing event to retrieve old image
    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // If imageUrl is different, delete old image
    if (existingEvent.imageUrl && imageUrl && existingEvent.imageUrl !== imageUrl) {
      const oldImageFilename = getImageFilenameFromUrl(existingEvent.imageUrl);
      deleteImageFile(oldImageFilename);
    }
    
    // Calculate status if not provided
    let status = providedStatus;
    if (!status) {
      const now = new Date();
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;
      
      if (end && now > end) {
        status = 'past';
      } else if (start > now) {
        status = 'upcoming';
      } else {
        status = 'ongoing';
      }
    }
    
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title_en,
        title_zh,
        description_en,
        description_zh,
        imageUrl,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location_en,
        location_zh,
        status,
        link,
        featured
      }
    });
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event (requires authentication)
app.delete('/api/events/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get event details to retrieve image filename
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Delete associated image file if exists
    if (event.imageUrl) {
      const imageFilename = getImageFilenameFromUrl(event.imageUrl);
      deleteImageFile(imageFilename);
    }
    
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Image Upload Route
app.post('/api/upload/image', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Check if this is for an existing event (has eventId)
    const eventId = req.body.eventId;
    if (eventId) {
      // Find the existing event to get its current image
      const existingEvent = await prisma.event.findUnique({
        where: { id: parseInt(eventId) }
      });
      
      if (existingEvent && existingEvent.imageUrl) {
        // Delete the old image
        const oldImageFilename = getImageFilenameFromUrl(existingEvent.imageUrl);
        deleteImageFile(oldImageFilename);
      }
    }
    
    // Get the server URL
    const protocol = req.protocol;
    const host = req.get('host');
    
    // Generate the image URL
    const imageUrl = `${protocol}://${host}/uploads/events/${req.file.filename}`;
    
    res.json({ 
      imageUrl, 
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: ${FRONTEND_URL}`);
}); 