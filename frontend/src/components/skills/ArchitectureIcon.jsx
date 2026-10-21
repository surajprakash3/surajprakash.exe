import React from 'react';
import { 
  KeyRound, Network, Cpu, Brain, Layers, Share2, 
  Terminal, Server, Database, Cloud, Wrench, Code2, Globe, Shield
} from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

// Direct SVG Paths for Special Architecture Logos (AWS, JWT, MediaPipe, etc.)
export const SPECIAL_ICONS = {
  // JWT Official colorful 7-pointed burst
  jwt: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#000000" />
      <path d="M50 15 L58 38 L82 38 L63 52 L70 76 L50 61 L30 76 L37 52 L18 38 L42 38 Z" fill="none" stroke="#d63aff" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="10" fill="#00b9f1" />
      <path d="M50 8 L50 25 M85 30 L72 40 M78 78 L65 67 M22 78 L35 67 M15 30 L28 40" stroke="#f15b24" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  // AWS EC2
  awsec2: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#ff9900" fillOpacity="0.15" stroke="#ff9900" strokeWidth="2.5" />
      <path d="M20 22 L20 42 L34 42 M20 32 L30 32 M38 24 C44 24 46 28 46 32 C46 36 44 40 38 40" fill="none" stroke="#ff9900" strokeWidth="3.5" strokeLinecap="round" />
      <text x="32" y="52" fill="#ff9900" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">EC2</text>
    </svg>
  ),

  // AWS S3
  awss3: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#e05243" fillOpacity="0.15" stroke="#e05243" strokeWidth="2.5" />
      <path d="M18 24 L32 16 L46 24 L32 32 Z" fill="#e05243" fillOpacity="0.5" stroke="#e05243" strokeWidth="2.5" />
      <path d="M18 24 L18 40 L32 48 L32 32 Z" fill="#e05243" fillOpacity="0.7" stroke="#e05243" strokeWidth="2.5" />
      <path d="M46 24 L46 40 L32 48 L32 32 Z" fill="#e05243" fillOpacity="0.9" stroke="#e05243" strokeWidth="2.5" />
    </svg>
  ),

  // AWS CloudFront
  awscloudfront: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="#c084fc" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="6" ry="14" fill="none" stroke="#c084fc" strokeWidth="2" />
      <line x1="18" y1="32" x2="46" y2="32" stroke="#c084fc" strokeWidth="2" />
      <circle cx="18" cy="24" r="3" fill="#ec4899" />
      <circle cx="46" cy="24" r="3" fill="#ec4899" />
      <circle cx="32" cy="46" r="3" fill="#ec4899" />
    </svg>
  ),

  // AWS IAM
  awsiam: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5" />
      <circle cx="32" cy="24" r="9" fill="none" stroke="#34d399" strokeWidth="3" />
      <path d="M32 33 L32 48 M32 40 L38 40 M32 45 L36 45" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),

  // AWS VPC
  awsvpc: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2.5" />
      <rect x="16" y="16" width="32" height="32" rx="6" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeDasharray="4 3" />
      <circle cx="24" cy="24" r="3" fill="#a78bfa" />
      <circle cx="40" cy="40" r="3" fill="#a78bfa" />
      <path d="M24 24 L40 40" stroke="#a78bfa" strokeWidth="2" />
    </svg>
  ),

  // AWS Lambda
  awslambda: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="2.5" />
      <path d="M22 46 L34 18 L42 18 M30 32 L44 46" fill="none" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // MediaPipe
  mediapipe: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="2.5" />
      <circle cx="20" cy="32" r="5" fill="#22d3ee" />
      <circle cx="32" cy="20" r="5" fill="#22d3ee" />
      <circle cx="32" cy="44" r="5" fill="#22d3ee" />
      <circle cx="44" cy="32" r="5" fill="#22d3ee" />
      <line x1="20" y1="32" x2="32" y2="20" stroke="#22d3ee" strokeWidth="2.5" />
      <line x1="20" y1="32" x2="32" y2="44" stroke="#22d3ee" strokeWidth="2.5" />
      <line x1="32" y1="20" x2="44" y2="32" stroke="#22d3ee" strokeWidth="2.5" />
      <line x1="32" y1="44" x2="44" y2="32" stroke="#22d3ee" strokeWidth="2.5" />
    </svg>
  ),

  // Networking
  networking: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="32" cy="20" r="5" fill="#60a5fa" />
      <circle cx="18" cy="44" r="5" fill="#60a5fa" />
      <circle cx="46" cy="44" r="5" fill="#60a5fa" />
      <line x1="32" y1="25" x2="18" y2="39" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="32" y1="25" x2="46" y2="39" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="23" y1="44" x2="41" y2="44" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2 2" />
    </svg>
  ),

  // Jira
  jira: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#0052cc" fillOpacity="0.15" stroke="#2684ff" strokeWidth="2.5" />
      <path d="M32 14 L46 28 L32 42 L18 28 Z" fill="#2684ff" />
      <path d="M32 28 L46 42 L32 50 L18 42 Z" fill="#0052cc" />
    </svg>
  ),

  // Notion
  notion: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#ffffff" fillOpacity="0.1" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="16" y="16" width="32" height="32" rx="4" fill="#000" stroke="#fff" strokeWidth="2" />
      <text x="32" y="38" fill="#fff" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">N</text>
    </svg>
  )
};

export const ArchitectureIcon = ({ name, icon, className = 'w-7 h-7' }) => {
  const [imgError, setImgError] = React.useState(false);
  const clean = (name || '').toLowerCase().replace(/[\s\.\-_]/g, '');

  // 1. Check special custom SVGs first
  if (SPECIAL_ICONS[clean]) {
    return (
      <div className={`${className} flex items-center justify-center shrink-0`}>
        {SPECIAL_ICONS[clean]}
      </div>
    );
  }

  // 2. Custom uploaded icon
  if (icon && !imgError && icon !== 'null' && icon !== 'undefined' && icon.trim() !== '') {
    return (
      <img
        src={getImageUrl(icon)}
        alt={name}
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  // 3. Devicon CDN map lookup
  const DEVICONS = {
    'react': 'react/react-original.svg',
    'html5': 'html5/html5-original.svg',
    'html': 'html5/html5-original.svg',
    'css3': 'css3/css3-original.svg',
    'css': 'css3/css3-original.svg',
    'tailwindcss': 'tailwindcss/tailwindcss-original.svg',
    'tailwind': 'tailwindcss/tailwindcss-original.svg',
    'javascript': 'javascript/javascript-original.svg',
    'js': 'javascript/javascript-original.svg',
    'typescript': 'typescript/typescript-original.svg',
    'ts': 'typescript/typescript-original.svg',
    'bootstrap': 'bootstrap/bootstrap-original.svg',
    'nodejs': 'nodejs/nodejs-original.svg',
    'node': 'nodejs/nodejs-original.svg',
    'express': 'express/express-original.svg',
    'expressjs': 'express/express-original.svg',
    'nextjs': 'nextjs/nextjs-original.svg',
    'next': 'nextjs/nextjs-original.svg',
    'mongodb': 'mongodb/mongodb-original.svg',
    'mysql': 'mysql/mysql-original.svg',
    'postgresql': 'postgresql/postgresql-original.svg',
    'redis': 'redis/redis-original.svg',
    'docker': 'docker/docker-original.svg',
    'kubernetes': 'kubernetes/kubernetes-plain.svg',
    'k8s': 'kubernetes/kubernetes-plain.svg',
    'jenkins': 'jenkins/jenkins-original.svg',
    'git': 'git/git-original.svg',
    'github': 'github/github-original.svg',
    'terraform': 'terraform/terraform-original.svg',
    'githubactions': 'github/github-original.svg',
    'linux': 'linux/linux-original.svg',
    'ubuntu': 'ubuntu/ubuntu-plain.svg',
    'vscode': 'vscode/vscode-original.svg',
    'postman': 'postman/postman-original.svg',
    'figma': 'figma/figma-original.svg',
    'slack': 'slack/slack-original.svg',
    'c': 'c/c-original.svg',
    'cplusplus': 'cplusplus/cplusplus-original.svg',
    'cpp': 'cplusplus/cplusplus-original.svg',
    'java': 'java/java-original.svg',
    'python': 'python/python-original.svg',
    'tensorflow': 'tensorflow/tensorflow-original.svg',
    'opencv': 'opencv/opencv-original.svg',
    'ansible': 'ansible/ansible-original.svg',
    'npm': 'npm/npm-original-wordmark.svg',
    'aws': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'amazonwebservices': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  };

  const deviconFile = DEVICONS[clean];
  if (deviconFile && !imgError) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconFile}`}
        alt={name}
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback initial
  return (
    <span className="font-bold text-sm text-accent-400 font-heading">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  );
};

export default ArchitectureIcon;
