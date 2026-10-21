// Centralized Technology Stack Architecture & Skills Dataset
// Easily add, edit, or remove technologies here.

export const WORKFLOW_STAGES = [
  {
    id: 'frontend',
    name: 'Frontend Client',
    shortName: 'Frontend',
    step: 1,
    description: 'Interactive UI, state management, and responsive client experiences',
    color: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/40',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    icon: 'Layout',
  },
  {
    id: 'backend',
    name: 'Backend API Services',
    shortName: 'Backend',
    step: 2,
    description: 'RESTful API routing, business logic, auth, and data processing',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/40',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    icon: 'Server',
  },
  {
    id: 'database',
    name: 'Data Persistence',
    shortName: 'Database',
    step: 3,
    description: 'Structured & NoSQL data models, indexing, and storage',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    icon: 'Database',
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    shortName: 'Cloud',
    step: 4,
    description: 'Scalable computing, static assets hosting, VPC networking, and security',
    color: 'from-sky-500 to-indigo-500',
    borderColor: 'border-sky-500/40',
    glowColor: 'rgba(14, 165, 233, 0.25)',
    icon: 'Cloud',
  },
  {
    id: 'devops',
    name: 'DevOps & CI/CD Pipeline',
    shortName: 'DevOps',
    step: 5,
    description: 'Containerization, automated test/build/deploy pipelines',
    color: 'from-violet-500 to-purple-500',
    borderColor: 'border-violet-500/40',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    icon: 'GitBranch',
  },
  {
    id: 'tools',
    name: 'Tooling & Architecture',
    shortName: 'Tools',
    step: 6,
    description: 'API testing, system design, prototyping, and version control',
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/40',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    icon: 'Wrench',
  },
];

export const CATEGORIES = [
  {
    id: 'Frontend Development',
    name: 'Frontend Development',
    badge: 'Client-Side',
    subtitle: 'UI/UX & Client Logic',
    description: 'Creating high-performance, accessible, and responsive user interfaces with modern component ecosystems.',
    icon: 'Layout',
    accentColor: 'text-cyan-400',
    bgGlow: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    id: 'Backend Development',
    name: 'Backend Development',
    badge: 'Server-Side',
    subtitle: 'APIs, Services & Auth',
    description: 'Architecting scalable server-side applications, secure authentication layers, and robust REST APIs.',
    icon: 'Server',
    accentColor: 'text-emerald-400',
    bgGlow: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    id: 'Databases',
    name: 'Databases',
    badge: 'Persistence',
    subtitle: 'Data Modeling & Queries',
    description: 'Designing reliable relational and document databases with optimized queries and schema integrity.',
    icon: 'Database',
    accentColor: 'text-amber-400',
    bgGlow: 'from-amber-500/10 to-orange-500/10',
  },
  {
    id: 'Cloud Infrastructure',
    name: 'Cloud Infrastructure',
    badge: 'Cloud & Compute',
    subtitle: 'AWS Cloud Ecosystem',
    description: 'Deploying high-availability infrastructure, secure VPC networking, and global CDN delivery on AWS.',
    icon: 'Cloud',
    accentColor: 'text-sky-400',
    bgGlow: 'from-sky-500/10 to-indigo-500/10',
  },
  {
    id: 'DevOps & Deployment',
    name: 'DevOps & Deployment',
    badge: 'Automation',
    subtitle: 'Containers & CI/CD',
    description: 'Automating software delivery with containerization, continuous integration, and version-controlled environments.',
    icon: 'GitBranch',
    accentColor: 'text-violet-400',
    bgGlow: 'from-violet-500/10 to-purple-500/10',
  },
  {
    id: 'Programming Languages',
    name: 'Programming Languages',
    badge: 'Core Foundations',
    subtitle: 'Core Problem Solving',
    description: 'Deep foundational knowledge across object-oriented, functional, and systems programming paradigms.',
    icon: 'Code2',
    accentColor: 'text-blue-400',
    bgGlow: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    id: 'Tools & Design',
    name: 'Tools & Design',
    badge: 'Ecosystem',
    subtitle: 'Productivity & Testing',
    description: 'Professional toolsets for debugging, API lifecycle management, prototyping, and team collaboration.',
    icon: 'Wrench',
    accentColor: 'text-rose-400',
    bgGlow: 'from-pink-500/10 to-rose-500/10',
  },
];

export const TECHNOLOGIES = [
  // --- A. Frontend Development ---
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend Development',
    devicon: 'react',
    purpose: 'Building interactive component-based user interfaces with declarative state management',
    usedFor: [
      'Single Page Applications (SPAs)',
      'Custom reusable UI component libraries',
      'Dynamic client routing and state hooks',
      'High-performance Virtual DOM updates'
    ],
    relatedTechnologies: ['javascript', 'tailwindcss', 'html5', 'nodejs'],
    workflowStage: 'frontend',
    workflowRole: 'Core UI Library generating client-side views and routing',
    proficiency: 'Advanced'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    devicon: 'nextjs',
    purpose: 'Full-stack React framework providing SSR, SSG, and optimized production routing',
    usedFor: [
      'Server-Side Rendering (SSR) & Static Site Generation (SSG)',
      'SEO-optimized public web portals',
      'API routes and edge middleware execution'
    ],
    relatedTechnologies: ['react', 'nodejs', 'typescript'],
    workflowStage: 'frontend',
    workflowRole: 'Server-rendered frontend architecture and hybrid routing',
    proficiency: 'Intermediate'
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend Development',
    devicon: 'html5',
    purpose: 'Semantic structure and accessibility foundation for web content and modern DOM standards',
    usedFor: [
      'Semantic document hierarchy & SEO accessibility',
      'Native form validations and multimedia embeddings',
      'Web accessibility (ARIA standards)'
    ],
    relatedTechnologies: ['css3', 'javascript', 'react'],
    workflowStage: 'frontend',
    workflowRole: 'Semantic skeleton and structure for all browser views',
    proficiency: 'Advanced'
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend Development',
    devicon: 'css3',
    purpose: 'Visual styling, fluid grid systems, CSS custom properties, and fluid typography',
    usedFor: [
      'Responsive multi-breakpoint media queries',
      'Custom animations and CSS transforms',
      'Flexbox and CSS Grid modern layouts'
    ],
    relatedTechnologies: ['html5', 'tailwindcss'],
    workflowStage: 'frontend',
    workflowRole: 'Visual presentation layer and adaptive layouts',
    proficiency: 'Advanced'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    devicon: 'tailwindcss',
    purpose: 'Utility-first CSS framework for rapid UI styling, custom design tokens, and sleek dark modes',
    usedFor: [
      'Rapid prototype-to-production styling without CSS bloat',
      'Theme switching (seamless Light/Dark mode)',
      'Glassmorphic UI components and glow states'
    ],
    relatedTechnologies: ['css3', 'react'],
    workflowStage: 'frontend',
    workflowRole: 'Design system utility engine providing consistent aesthetic tokens',
    proficiency: 'Advanced'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Frontend Development',
    devicon: 'javascript',
    purpose: 'Core dynamic programming language powering frontend interactivity and async operations',
    usedFor: [
      'DOM manipulation, event handling, and client logic',
      'Asynchronous API communication via Fetch/Axios and Promises',
      'Cross-platform full stack runtime logic'
    ],
    relatedTechnologies: ['react', 'nodejs', 'typescript'],
    workflowStage: 'frontend',
    workflowRole: 'Universal language binding client, API, and async logic',
    proficiency: 'Advanced'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend Development',
    devicon: 'typescript',
    purpose: 'Typed superset of JavaScript providing compile-time type safety and enterprise scalability',
    usedFor: [
      'Strict type contracts for API request/response payloads',
      'Predictable refactoring across large codebases',
      'Enhanced IDE autocomplete and error prevention'
    ],
    relatedTechnologies: ['javascript', 'react', 'nodejs'],
    workflowStage: 'frontend',
    workflowRole: 'Type safety layer preventing runtime exceptions across frontend & backend',
    proficiency: 'Intermediate'
  },

  // --- B. Backend Development ---
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Development',
    devicon: 'nodejs',
    purpose: 'Event-driven, non-blocking asynchronous JavaScript runtime powering high-throughput backend services',
    usedFor: [
      'Lightweight, event-driven RESTful microservices',
      'Asynchronous I/O handling and file stream operations',
      'Full-stack JavaScript development sharing client/server schemas'
    ],
    relatedTechnologies: ['express', 'mongodb', 'docker', 'javascript'],
    workflowStage: 'backend',
    workflowRole: 'Underlying runtime engine executing server processes and API routing',
    proficiency: 'Advanced'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Development',
    devicon: 'express',
    purpose: 'Fast, unopinionated, minimalist web framework for building REST APIs and middleware pipelines',
    usedFor: [
      'REST API route handling and HTTP request lifecycle',
      'Centralized error handling and security middleware',
      'Integration with database drivers and token verification'
    ],
    relatedTechnologies: ['nodejs', 'jwt', 'mongodb', 'mysql'],
    workflowStage: 'backend',
    workflowRole: 'HTTP server layer handling routing, request parsing, and API responses',
    proficiency: 'Advanced'
  },
  {
    id: 'jwt',
    name: 'JWT (JSON Web Tokens)',
    category: 'Backend Development',
    icon: 'KeyRound',
    purpose: 'Stateless, cryptographically signed authentication and role-based authorization tokens',
    usedFor: [
      'Stateless user authentication across microservices',
      'Protected API route authorization middleware',
      'Secure cross-origin session verification'
    ],
    relatedTechnologies: ['express', 'nodejs', 'mongodb'],
    workflowStage: 'backend',
    workflowRole: 'Security gatekeeper verifying credentials between client and protected endpoints',
    proficiency: 'Advanced'
  },
  {
    id: 'restapi',
    name: 'REST APIs & Webhooks',
    category: 'Backend Development',
    icon: 'Network',
    purpose: 'Standardized client-server architectural communication protocol utilizing standard HTTP verbs',
    usedFor: [
      'CRUD operations with semantic status codes',
      'Pagination, search querying, and payload validation',
      'Third-party cloud service webhooks integration'
    ],
    relatedTechnologies: ['express', 'postman', 'react'],
    workflowStage: 'backend',
    workflowRole: 'Contract and bridge connecting the UI clients to persistent data services',
    proficiency: 'Advanced'
  },

  // --- C. Databases ---
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    devicon: 'mongodb',
    purpose: 'Document-oriented NoSQL database for flexible JSON-like data modeling and high scalability',
    usedFor: [
      'Dynamic schema storage for user profiles, blogs, and portfolio projects',
      'Aggregation pipelines for advanced queries and analytics',
      'High-throughput read/write operations with Atlas cloud replication'
    ],
    relatedTechnologies: ['nodejs', 'express', 'aws_ec2'],
    workflowStage: 'database',
    workflowRole: 'Primary NoSQL document store for application content and user data',
    proficiency: 'Advanced'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases',
    devicon: 'mysql',
    purpose: 'Robust relational database management system (RDBMS) ensuring ACID compliance and structured relational schemas',
    usedFor: [
      'Structured tabular data modeling and foreign key relationships',
      'Complex JOIN queries and transaction integrity',
      'Enterprise reporting and transactional ledger consistency'
    ],
    relatedTechnologies: ['nodejs', 'express', 'cplusplus'],
    workflowStage: 'database',
    workflowRole: 'Relational data store maintaining strict referential integrity for critical entities',
    proficiency: 'Intermediate'
  },

  // --- D. Cloud Infrastructure ---
  {
    id: 'aws_ec2',
    name: 'AWS EC2',
    category: 'Cloud Infrastructure',
    devicon: 'amazonwebservices',
    purpose: 'Elastic Compute Cloud virtual server instances hosting containerized backends and services',
    usedFor: [
      'Hosting Dockerized Node.js API servers',
      'Configuring Linux production environments with systemd & PM2',
      'Auto-scaling and resilient compute clusters'
    ],
    relatedTechnologies: ['docker', 'linux', 'aws_vpc', 'aws_iam'],
    workflowStage: 'cloud',
    workflowRole: 'Cloud compute backbone running live server containers and background jobs',
    proficiency: 'Intermediate'
  },
  {
    id: 'aws_s3',
    name: 'AWS S3',
    category: 'Cloud Infrastructure',
    devicon: 'amazonwebservices',
    purpose: 'Simple Storage Service providing high-durability object storage for media, static builds, and assets',
    usedFor: [
      'Hosting static SPA frontend builds (React/HTML)',
      'Storing user uploads, resumes, project screenshots, and media',
      'Automated bucket lifecycle policies and secure signed URLs'
    ],
    relatedTechnologies: ['aws_cloudfront', 'aws_iam', 'react'],
    workflowStage: 'cloud',
    workflowRole: 'Object storage hub serving static web bundles and media assets',
    proficiency: 'Intermediate'
  },
  {
    id: 'aws_cloudfront',
    name: 'AWS CloudFront',
    category: 'Cloud Infrastructure',
    devicon: 'amazonwebservices',
    purpose: 'Global Content Delivery Network (CDN) delivering low-latency cached content to edge locations',
    usedFor: [
      'Ultra-fast global edge caching for S3 static websites',
      'SSL/TLS certificate termination and HTTPS security enforcement',
      'DDoS protection in tandem with AWS Shield'
    ],
    relatedTechnologies: ['aws_s3', 'react'],
    workflowStage: 'cloud',
    workflowRole: 'Global edge CDN caching static assets closest to end users for instant load times',
    proficiency: 'Intermediate'
  },
  {
    id: 'aws_iam',
    name: 'AWS IAM',
    category: 'Cloud Infrastructure',
    devicon: 'amazonwebservices',
    purpose: 'Identity and Access Management establishing granular security policies and least-privilege roles',
    usedFor: [
      'Granting scoped permissions to EC2 instances and Lambda functions',
      'Managing API access keys for automated CI/CD deployment pipelines',
      'Enforcing Multi-Factor Authentication and principle of least privilege'
    ],
    relatedTechnologies: ['aws_ec2', 'aws_s3', 'github_actions'],
    workflowStage: 'cloud',
    workflowRole: 'Security policy controller governing infrastructure access permissions',
    proficiency: 'Intermediate'
  },
  {
    id: 'aws_vpc',
    name: 'AWS VPC',
    category: 'Cloud Infrastructure',
    devicon: 'amazonwebservices',
    purpose: 'Virtual Private Cloud configuring isolated virtual networks, subnets, route tables, and gateways',
    usedFor: [
      'Isolating production database instances in private subnets',
      'Configuring Internet Gateways and NAT Gateways for secure outbound traffic',
      'Network security groups and access control lists (NACLs)'
    ],
    relatedTechnologies: ['aws_ec2', 'mongodb', 'mysql'],
    workflowStage: 'cloud',
    workflowRole: 'Isolated network boundary securing servers and databases from unauthorized internet access',
    proficiency: 'Intermediate'
  },

  // --- E. DevOps & Deployment ---
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Deployment',
    devicon: 'docker',
    purpose: 'Platform-agnostic containerization packaging code, runtime, system tools, and dependencies together',
    usedFor: [
      'Eliminating "it works on my machine" differences between dev and production',
      'Multi-stage Dockerfiles optimizing lean production images',
      'Docker Compose orchestration for multi-container local microservices'
    ],
    relatedTechnologies: ['kubernetes', 'nodejs', 'aws_ec2', 'git'],
    workflowStage: 'devops',
    workflowRole: 'Standardized package containerizing software for deterministic execution everywhere',
    proficiency: 'Advanced'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes (K8s)',
    category: 'DevOps & Deployment',
    devicon: 'kubernetes',
    purpose: 'Automated container orchestration managing deployment, scaling, health checks, and service discovery',
    usedFor: [
      'Deploying declarative Pods, Deployments, and Services',
      'Rolling updates with zero application downtime',
      'Automated self-healing and horizontal pod autoscaling'
    ],
    relatedTechnologies: ['docker', 'aws_ec2'],
    workflowStage: 'devops',
    workflowRole: 'Orchestrator monitoring, scaling, and self-healing container clusters',
    proficiency: 'Intermediate'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'DevOps & Deployment',
    devicon: 'git',
    purpose: 'Distributed version control system and collaborative code repository management',
    usedFor: [
      'Feature branch workflows, pull requests, and peer code reviews',
      'Commit history auditing, rebasing, and atomic versioning',
      'Serving as the single source of truth triggering automated CI/CD runs'
    ],
    relatedTechnologies: ['github_actions', 'vscode'],
    workflowStage: 'devops',
    workflowRole: 'Version control backbone managing source code history and collaboration',
    proficiency: 'Advanced'
  },
  {
    id: 'github_actions',
    name: 'GitHub Actions',
    category: 'DevOps & Deployment',
    devicon: 'github',
    purpose: 'Native continuous integration and delivery (CI/CD) automation workflows built into GitHub',
    usedFor: [
      'Automated test suites running on every pull request',
      'Automated building of production Docker images and pushing to registries',
      'Zero-downtime deployment dispatching to AWS EC2 and S3'
    ],
    relatedTechnologies: ['git', 'docker', 'aws_ec2', 'aws_s3'],
    workflowStage: 'devops',
    workflowRole: 'Automated CI/CD pipeline verifying code quality and deploying releases',
    proficiency: 'Intermediate'
  },
  {
    id: 'linux',
    name: 'Linux / Ubuntu',
    category: 'DevOps & Deployment',
    devicon: 'linux',
    purpose: 'Unix-like operating system kernel powering server infrastructure, shell scripting, and container bases',
    usedFor: [
      'Bash shell automation scripting and cron tasks',
      'Server configuration, SSH remote access, and firewall administration',
      'Process management and performance monitoring (top, htop, systemctl)'
    ],
    relatedTechnologies: ['docker', 'aws_ec2', 'git'],
    workflowStage: 'devops',
    workflowRole: 'Underlying operating environment hosting servers, containers, and deployment scripts',
    proficiency: 'Advanced'
  },

  // --- F. Programming Languages ---
  {
    id: 'c',
    name: 'C',
    category: 'Programming Languages',
    devicon: 'c',
    purpose: 'Procedural low-level systems programming language teaching memory management and pointers',
    usedFor: [
      'Foundational understanding of hardware architecture and memory allocation',
      'High-performance computational algorithms',
      'Operating system principles and data structure implementations'
    ],
    relatedTechnologies: ['cplusplus'],
    workflowStage: 'tools',
    workflowRole: 'Core language foundation cultivating disciplined memory and algorithmic understanding',
    proficiency: 'Intermediate'
  },
  {
    id: 'cplusplus',
    name: 'C++',
    category: 'Programming Languages',
    devicon: 'cplusplus',
    purpose: 'High-performance Object-Oriented programming language with Standard Template Library (STL)',
    usedFor: [
      'Data Structures & Algorithms (DSA) problem solving',
      'Object-oriented system design and resource management (RAII)',
      'Competitive programming and memory-constrained computing'
    ],
    relatedTechnologies: ['c', 'java'],
    workflowStage: 'tools',
    workflowRole: 'High-efficiency problem solving engine for complex data structures and algorithmic efficiency',
    proficiency: 'Advanced'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    devicon: 'java',
    purpose: 'Robust, strongly-typed object-oriented language running on the Java Virtual Machine (JVM)',
    usedFor: [
      'Enterprise OOP architectures and design patterns',
      'Multi-threaded concurrent application programming',
      'Core academic software engineering fundamentals'
    ],
    relatedTechnologies: ['cplusplus', 'mysql'],
    workflowStage: 'tools',
    workflowRole: 'Enterprise OOP foundation providing strong structural design patterns',
    proficiency: 'Intermediate'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    devicon: 'python',
    purpose: 'High-level, expressive programming language ideal for scripting, automation, and backend logic',
    usedFor: [
      'Automation scripts and data processing workflows',
      'API prototyping and server automation utilities',
      'Machine learning libraries and algorithmic exploration'
    ],
    relatedTechnologies: ['linux', 'mysql'],
    workflowStage: 'tools',
    workflowRole: 'Rapid prototyping and utility scripting language automating routine tasks',
    proficiency: 'Intermediate'
  },

  // --- G. Tools & Design ---
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools & Design',
    devicon: 'vscode',
    purpose: 'Extensible, feature-rich source code editor with deep Git, debugger, and extension integrations',
    usedFor: [
      'Primary local development environment across all stacks',
      'Integrated debugging, linting, and formatting',
      'Remote SSH server editing and container attachments'
    ],
    relatedTechnologies: ['git', 'javascript', 'typescript'],
    workflowStage: 'tools',
    workflowRole: 'Command center editor for writing, testing, and debugging source code',
    proficiency: 'Advanced'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'Tools & Design',
    devicon: 'postman',
    purpose: 'Comprehensive API platform for designing, testing, documenting, and monitoring RESTful APIs',
    usedFor: [
      'Testing endpoint request/response contracts and payload validations',
      'Managing automated collection test runs and environment variables',
      'Generating API documentation for client-server integration'
    ],
    relatedTechnologies: ['express', 'restapi', 'jwt'],
    workflowStage: 'tools',
    workflowRole: 'API workbench ensuring server endpoints are battle-tested before frontend integration',
    proficiency: 'Advanced'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Tools & Design',
    devicon: 'figma',
    purpose: 'Collaborative cloud-based UI/UX vector design tool for wireframing and prototyping',
    usedFor: [
      'Designing wireframes, interactive prototypes, and design systems',
      'Extracting design tokens (spacing, typography, color palettes)',
      'Visualizing user journeys prior to writing frontend code'
    ],
    relatedTechnologies: ['react', 'tailwindcss'],
    workflowStage: 'tools',
    workflowRole: 'Visual blueprint tool creating UX prototypes before frontend implementation',
    proficiency: 'Intermediate'
  },
  {
    id: 'npm',
    name: 'NPM',
    category: 'Tools & Design',
    devicon: 'npm',
    purpose: 'Standard package manager for the Node.js ecosystem managing third-party libraries and scripts',
    usedFor: [
      'Dependency resolution and semantic version locking (package-lock.json)',
      'Executing build, lint, and dev environment lifecycle scripts',
      'Managing security audits and dependency updates'
    ],
    relatedTechnologies: ['nodejs', 'react'],
    workflowStage: 'tools',
    workflowRole: 'Package ecosystem manager installing and orchestrating project dependencies',
    proficiency: 'Advanced'
  }
];

// Helper to look up a technology by ID (case-insensitive)
export const getTechnologyById = (id) => {
  if (!id) return null;
  const cleanId = id.toLowerCase().trim();
  return TECHNOLOGIES.find(t => t.id.toLowerCase() === cleanId || t.name.toLowerCase() === cleanId) || null;
};

// Helper to get technologies for a specific category
export const getTechnologiesByCategory = (categoryName) => {
  return TECHNOLOGIES.filter(t => t.category === categoryName);
};

// Helper to get technologies for a workflow stage
export const getTechnologiesByWorkflowStage = (stageId) => {
  return TECHNOLOGIES.filter(t => t.workflowStage === stageId);
};

// Helper to merge database skills with the architecture dataset
// Ensures that if an admin adds a new skill in MongoDB, it dynamically shows up in the UI!
export const mergeSkillsWithDatabase = (dbSkills = []) => {
  if (!Array.isArray(dbSkills) || dbSkills.length === 0) {
    return TECHNOLOGIES;
  }

  const existingMap = new Map();
  TECHNOLOGIES.forEach(tech => {
    existingMap.set(tech.name.toLowerCase().trim(), tech);
    existingMap.set(tech.id.toLowerCase().trim(), tech);
  });

  const merged = [...TECHNOLOGIES];

  dbSkills.forEach((dbItem, index) => {
    if (!dbItem || !dbItem.name) return;
    const key = dbItem.name.toLowerCase().trim();
    if (!existingMap.has(key)) {
      // Map category or fallback
      let category = dbItem.category || 'Tools & Technologies';
      let workflowStage = 'tools';

      const catLower = category.toLowerCase();
      if (catLower.includes('front')) workflowStage = 'frontend';
      else if (catLower.includes('back')) workflowStage = 'backend';
      else if (catLower.includes('data')) workflowStage = 'database';
      else if (catLower.includes('cloud')) workflowStage = 'cloud';
      else if (catLower.includes('devops')) workflowStage = 'devops';

      const newTech = {
        id: `db_${dbItem._id || index}_${key.replace(/[^a-z0-9]/g, '_')}`,
        name: dbItem.name,
        category: category,
        icon: dbItem.icon || null,
        purpose: `${dbItem.name} integrated into the development stack`,
        usedFor: ['Software development and production workflows'],
        relatedTechnologies: [],
        workflowStage: workflowStage,
        workflowRole: `${dbItem.name} utility component`,
        isCustom: true
      };
      merged.push(newTech);
      existingMap.set(key, newTech);
    }
  });

  return merged;
};

// Standard DevIcon CDN URL resolver with fallback
export const getDeviconSvgUrl = (deviconKey) => {
  if (!deviconKey) return null;
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconKey}/${deviconKey}-original.svg`;
};
