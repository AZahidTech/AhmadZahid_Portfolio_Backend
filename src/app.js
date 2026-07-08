require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const User = require('./models/User');
const Service = require('./models/Service');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Project = require('./models/Project');

const app = express();

// Trust Vercel's proxy for accurate client IP rate limiting
app.set('trust proxy', 1);

// Security Headers
app.use(helmet());

// CORS configuration (Restrict to front-end origin in production)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate Limiting (Prevents Denial of Service and Brute-force attacks)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.use(express.json());
app.use(morgan('dev'));

// Seed default Admin if no users exist
const seedAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    
    const adminUser = await User.findOne({ username });
    if (!adminUser) {
      await User.create({
        username,
        password,
      });
      console.log('----------------------------------------------------');
      console.log(`Default administrator seeded successfully!`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
      console.log('----------------------------------------------------');
    } else {
      adminUser.password = password;
      await adminUser.save();
      console.log('----------------------------------------------------');
      console.log(`Administrator password synchronized from .env!`);
      console.log(`Username: ${username}`);
      console.log('----------------------------------------------------');
    }
  } catch (error) {
    console.error(`Error seeding default administrator: ${error.message}`);
  }
};

// Seed default portfolio data if empty
const seedPortfolioData = async () => {
  try {
    // 1. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.create([
        {
          title: 'Full-Stack Web Development',
          description: 'End-to-end development of scalable and interactive web systems using the MERN stack. Crafting cohesive architectures from front to back.',
          icon: 'Globe',
          features: ['Complete MERN Applications', 'State Management & Redux', 'Role-Based Dashboard Portals', 'Cross-Platform Integrations']
        },
        {
          title: 'Backend Development',
          description: 'Building secure, robust, and highly-performant server-side services. Engineering custom databases, controllers, and routing structures.',
          icon: 'Server',
          features: ['Node.js & Express.js Services', 'RESTful API Engineering', 'JWT Auth & RBAC Security', 'Middleware & Error Handling']
        },
        {
          title: 'Frontend Web Development',
          description: 'Designing highly responsive, pixel-perfect, and modern interactive user interfaces using React.js, Tailwind CSS, and HTML/CSS.',
          icon: 'Layout',
          features: ['React.js Single Page Apps', 'Figma/PSD-to-React Code', 'Responsive Layout Designs', 'SEO & Performance Tweaks']
        },
        {
          title: 'Database & API Solutions',
          description: 'Engineering database schemas, data modeling, and connecting third-party API configurations or AI integrations.',
          icon: 'Cpu',
          features: ['MongoDB Schema Modeling', 'MySQL Query Engineering', 'AI/NLP Chatbot Integrations', 'Third-Party Services Connect']
        }
      ]);
      console.log('Default Services seeded successfully!');
    }

    // 2. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.create([
        {
          category: 'Languages',
          icon: 'Code2',
          skills: ['C++', 'JavaScript', 'HTML5', 'CSS3']
        },
        {
          category: 'Tools & Frameworks',
          icon: 'Wrench',
          skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Git', 'GitHub', 'Postman']
        },
        {
          category: 'Databases',
          icon: 'Database',
          skills: ['MongoDB', 'MySQL']
        },
        {
          category: 'Other Skills',
          icon: 'Globe',
          skills: [
            'Data Structures',
            'OOP',
            'RESTful APIs',
            'JWT Authentication',
            'Role-Based Access Control',
            'AI/NLP Integration',
            'Responsive UI Design',
            'Debugging & Problem Solving'
          ]
        }
      ]);
      console.log('Default Skills seeded successfully!');
    }

    // 3. Seed Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.create([
        {
          role: 'MERN Stack Intern',
          company: 'IIFA Tech',
          duration: 'Nov 2025 – Present',
          location: 'Lahore, Pakistan',
          points: [
            'Built and maintained full-stack web applications using React.js, Node.js, Express.js, and MongoDB.',
            'Designed and implemented RESTful APIs for efficient data handling and system integration.',
            'Developed secure authentication and authorization systems for user management.',
            'Optimized application performance and enhanced UI responsiveness using Tailwind CSS.',
            'Working on live projects.'
          ]
        }
      ]);
      console.log('Default Experience seeded successfully!');
    }

    // 4. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: 'TalentHub Pro',
          subtitle: 'AI-Powered Recruitment Platform (FYP)',
          description: 'A full-stack AI recruitment platform featuring an NLP-based chatbot for resume parsing, candidate automated support, and interview question generation. Includes role-based dashboards for candidates, companies, and administrators.',
          tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'NLP Chatbot'],
          github: 'https://github.com/AZahidTech/TalentHubPro.git',
          category: 'Full Stack',
          icon: 'Brain'
        },
        {
          title: 'EstateSphere',
          subtitle: 'MERN Stack Real Estate Platform',
          description: 'A comprehensive property platform facilitating advanced search, role-based dashboards, and complete listing management. Implemented secure token-based authorization and granular backend REST APIs.',
          tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
          github: 'https://github.com/AZahidTech/EstateSphere.git',
          category: 'Full Stack',
          icon: 'Home'
        },
        {
          title: 'Restaurant Application',
          subtitle: 'Responsive Order Placement UI',
          description: 'A responsive digital menu and order management client interface built with raw web modules. Features details tracking, cart caching, and dynamic item listings.',
          tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
          github: 'https://github.com/AZahidTech/restaurant-application.git',
          category: 'Frontend',
          icon: 'Utensils'
        },
        {
          title: 'Airline Booking Client',
          subtitle: 'Dynamic Flight Search & Booking Frontend',
          description: 'A responsive airline reservation interface featuring dynamic flight scheduling lists, interactive passenger details forms, and validation checks.',
          tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox'],
          github: 'https://github.com/AZahidTech',
          category: 'Frontend',
          icon: 'Plane'
        }
      ]);
      console.log('Default Projects seeded successfully!');
    }
  } catch (error) {
    console.error(`Error seeding portfolio default data: ${error.message}`);
  }
};

// Database connection & seeding middleware (handles connection state reactively in Serverless environment)
let seeded = false;
app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!seeded) {
      await seedAdmin();
      await seedPortfolioData();
      seeded = true;
    }
    next();
  } catch (error) {
    console.error(`Database connection or seeding failure: ${error.message}`);
    next(error);
  }
});

// Route Mounts
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));

// Sanity Check Route
app.get('/', (req, res) => {
  res.json({ message: 'Ahmad Zahid Portfolio API is running...' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
