import { useState } from 'react';
import { 
  Code2, Layout, Server, Database, Cloud, GitBranch, Wrench, 
  Terminal, ShieldCheck, KeyRound, Network, Cpu, Layers 
} from 'lucide-react';
import { getDeviconSvgUrl } from '../../data/technologiesData';
import { getImageUrl } from '../../utils/imageUtils';

// Fallback icon mapper based on Lucide icon names or categories
const LUCIDE_ICONS = {
  Layout, Server, Database, Cloud, GitBranch, Wrench, 
  Code2, Terminal, ShieldCheck, KeyRound, Network, Cpu, Layers
};

export const TechIcon = ({ tech, size = 'md', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  if (!tech) return null;

  // Determine size classes
  const sizeMap = {
    xs: { box: 'w-6 h-6', img: 'w-4 h-4', text: 'text-xs' },
    sm: { box: 'w-8 h-8', img: 'w-5 h-5', text: 'text-sm' },
    md: { box: 'w-10 h-10', img: 'w-6 h-6', text: 'text-base' },
    lg: { box: 'w-14 h-14', img: 'w-8 h-8', text: 'text-xl' }
  };
  const s = sizeMap[size] || sizeMap.md;

  // 1. Direct SVG devicon URL if defined
  let iconUrl = null;
  if (tech.devicon && !imgError) {
    iconUrl = getDeviconSvgUrl(tech.devicon);
  } else if (tech.icon && !imgError) {
    // Stored image path
    iconUrl = getImageUrl(tech.icon);
  }

  // 2. Lucide component fallback if provided in tech.icon
  const LucideComponent = (tech.icon && LUCIDE_ICONS[tech.icon]) ? LUCIDE_ICONS[tech.icon] : null;

  return (
    <div
      className={`rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-slate-900/60 dark:bg-dark-800/80 border border-slate-700/50 shadow-inner ${s.box} ${className}`}
    >
      {iconUrl && !imgError ? (
        <img
          src={iconUrl}
          alt={tech.name || 'Tech Icon'}
          className={`${s.img} object-contain transition-transform group-hover:scale-110`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : LucideComponent ? (
        <LucideComponent className={`${s.img} text-accent-400`} />
      ) : (
        <span className={`font-bold font-heading text-accent-400 ${s.text}`}>
          {tech.name ? tech.name.charAt(0).toUpperCase() : '?'}
        </span>
      )}
    </div>
  );
};

export default TechIcon;
