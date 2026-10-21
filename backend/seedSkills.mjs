import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from './models/Skill.js';

dotenv.config({ path: './backend/.env' });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: './.env' });
}

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

// Clear old skills
await Skill.deleteMany({});
console.log('Cleared old skills.');

const skills = [
  // --- 1. Frontend Development ---
  { name: 'React', category: 'Frontend Development', group: 'UI Library', order: 1 },
  { name: 'HTML5', category: 'Frontend Development', group: 'Markup', order: 2 },
  { name: 'CSS3', category: 'Frontend Development', group: 'Styling', order: 3 },
  { name: 'Tailwind CSS', category: 'Frontend Development', group: 'Utility CSS', order: 4 },
  { name: 'JavaScript', category: 'Frontend Development', group: 'Scripting', order: 5 },
  { name: 'Bootstrap', category: 'Frontend Development', group: 'CSS Framework', order: 6 },

  // --- 2. Backend Development ---
  { name: 'Node.js', category: 'Backend Development', group: 'Server Runtime', order: 1 },
  { name: 'Express.js', category: 'Backend Development', group: 'REST APIs', order: 2 },
  { name: 'JWT', category: 'Backend Development', group: 'Authentication', order: 3 },

  // --- 3. Databases ---
  { name: 'MongoDB', category: 'Databases', group: 'NoSQL Database', order: 1 },
  { name: 'MySQL', category: 'Databases', group: 'Relational Database', order: 2 },

  // --- 4. Cloud Infrastructure ---
  { name: 'AWS EC2', category: 'Cloud Infrastructure', group: 'Compute Instances', order: 1 },
  { name: 'AWS S3', category: 'Cloud Infrastructure', group: 'Object Storage', order: 2 },
  { name: 'AWS CloudFront', category: 'Cloud Infrastructure', group: 'Global CDN', order: 3 },
  { name: 'AWS IAM', category: 'Cloud Infrastructure', group: 'Access Management', order: 4 },
  { name: 'AWS VPC', category: 'Cloud Infrastructure', group: 'Virtual Network', order: 5 },
  { name: 'AWS Lambda', category: 'Cloud Infrastructure', group: 'Serverless Functions', order: 6 },

  // --- 5. DevOps & Deployment ---
  { name: 'Docker', category: 'DevOps & Deployment', group: 'Containers', order: 1 },
  { name: 'Kubernetes', category: 'DevOps & Deployment', group: 'Orchestration', order: 2 },
  { name: 'Jenkins', category: 'DevOps & Deployment', group: 'CI/CD Automation', order: 3 },
  { name: 'Git', category: 'DevOps & Deployment', group: 'Version Control', order: 4 },
  { name: 'GitHub', category: 'DevOps & Deployment', group: 'Repository & CI', order: 5 },
  { name: 'Terraform', category: 'DevOps & Deployment', group: 'Infrastructure as Code', order: 6 },
  { name: 'GitHub Actions', category: 'DevOps & Deployment', group: 'Workflows', order: 7 },
  { name: 'Linux', category: 'DevOps & Deployment', group: 'Server OS', order: 8 },

  // --- 6. Tools & Design ---
  { name: 'VS Code', category: 'Tools & Design', group: 'IDE / Editor', order: 1 },
  { name: 'Postman', category: 'Tools & Design', group: 'API Testing', order: 2 },
  { name: 'Figma', category: 'Tools & Design', group: 'UI/UX Design', order: 3 },
  { name: 'Jira', category: 'Tools & Design', group: 'Project Management', order: 4 },
  { name: 'Notion', category: 'Tools & Design', group: 'Documentation', order: 5 },
  { name: 'Slack', category: 'Tools & Design', group: 'Team Collaboration', order: 6 },

  // --- 7. Programming Languages ---
  { name: 'C', category: 'Programming Languages', group: 'Systems Language', order: 1 },
  { name: 'C++', category: 'Programming Languages', group: 'Algorithms & OOP', order: 2 },
  { name: 'Java', category: 'Programming Languages', group: 'Object-Oriented', order: 3 },
  { name: 'Python', category: 'Programming Languages', group: 'Scripting & AI', order: 4 },
  { name: 'JavaScript', category: 'Programming Languages', group: 'Web Programming', order: 5 },

  // --- 8. Other Technologies (AI / ML / Libraries) ---
  { name: 'TensorFlow', category: 'Other Technologies', group: 'Machine Learning', order: 1 },
  { name: 'OpenCV', category: 'Other Technologies', group: 'Computer Vision', order: 2 },
  { name: 'MediaPipe', category: 'Other Technologies', group: 'Vision AI', order: 3 },
  { name: 'Linux', category: 'Other Technologies', group: 'OS Kernel', order: 4 },
  { name: 'Ansible', category: 'Other Technologies', group: 'Configuration Management', order: 5 },
  { name: 'Networking', category: 'Other Technologies', group: 'Protocols & Routing', order: 6 },
];

const result = await Skill.insertMany(skills);
console.log(`Seeded ${result.length} skills successfully!`);
await mongoose.disconnect();
console.log('MongoDB disconnected');
