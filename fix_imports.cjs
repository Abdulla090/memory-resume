const fs = require('fs');
const filePath = 'src/routes/index.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// Check what's at the top
console.log('Current top 300 chars:', JSON.stringify(src.slice(0, 300)));

// The file starts with broken content (missing imports, starts mid-route-config)
// Find where the route config starts and prepend correct imports
const routeStart = src.indexOf('export const Route = createFileRoute');
if (routeStart === -1) {
  console.error('Could not find Route definition');
  process.exit(1);
}

// Strip anything before the Route definition (broken/partial lines)
const body = src.slice(routeStart);

const imports = [
  "import { createFileRoute, Link } from \"@tanstack/react-router\";",
  "import { animate, motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from \"framer-motion\";",
  "import { TrustedMarquee } from \"../components/TrustedMarquee\";",
  "import {",
  "  ArrowLeft,",
  "  ArrowRight,",
  "  CheckCircle,",
  "  ChevronDown,",
  "  Download,",
  "  FileText,",
  "  Globe,",
  "  LockKeyhole,",
  "  Menu,",
  "  Sparkles,",
  "  Star,",
  "  TrendingUp,",
  "  Users,",
  "  ArrowUpRight,",
  "  X,",
  "} from \"lucide-react\";",
  "import React, { useEffect, useRef, useState } from \"react\";",
  "import { HeroV2 } from \"@/components/HeroV2\";",
  "import { useAppStore } from \"@/lib/store\";",
  "",
].join('\n');

const fixed = imports + body;
fs.writeFileSync(filePath, fixed, 'utf8');
console.log('Done. New file starts with:', JSON.stringify(fixed.slice(0, 200)));
