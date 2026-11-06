/**
 * Curated knowledge base for popular skills: realistic estimated hours, action steps & resources
 */
const SKILL_RESOURCE_DB = {
  Docker: {
    hours: 14,
    difficulty: 'Intermediate',
    actionSteps: [
      'Understand images, containers, and layers',
      'Write multi-stage Dockerfiles for Node.js / React apps',
      'Master Docker Compose for multi-container microservices',
      'Optimize image size and implement volume mounting for hot-reload',
    ],
    resources: [
      { title: 'Docker Official Getting Started', type: 'docs', url: 'https://docs.docker.com/get-started/' },
      { title: 'Docker Tutorial for Beginners (FreeCodeCamp)', type: 'tutorial', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
      { title: 'Docker Deep Dive (Nigel Poulton)', type: 'course', url: 'https://nigelpoulton.com/books/' },
    ],
  },
  Kubernetes: {
    hours: 28,
    difficulty: 'Advanced',
    actionSteps: [
      'Understand Pods, Deployments, Services, and Ingress',
      'Set up local cluster using Minikube or Kind',
      'Manage ConfigMaps, Secrets, and Persistent Volumes',
      'Deploy a resilient microservice architecture with Helm charts',
    ],
    resources: [
      { title: 'Kubernetes Official Interactive Tutorial', type: 'docs', url: 'https://kubernetes.io/docs/tutorials/' },
      { title: 'Kubernetes Crash Course for Absolute Beginners', type: 'tutorial', url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4' },
    ],
  },
  TypeScript: {
    hours: 16,
    difficulty: 'Intermediate',
    actionSteps: [
      'Learn basic types, interfaces, and type aliases',
      'Master generics, utility types (Partial, Pick, Omit), and union types',
      'Integrate TypeScript into Express and React apps with strict mode',
      'Configure tsconfig for production-grade builds',
    ],
    resources: [
      { title: 'TypeScript Official Handbook', type: 'docs', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { title: 'Total TypeScript Essentials by Matt Pocock', type: 'tutorial', url: 'https://www.totaltypescript.com/tutorials' },
    ],
  },
  'Node.js': {
    hours: 20,
    difficulty: 'Intermediate',
    actionSteps: [
      'Understand the Event Loop, asynchronous non-blocking I/O, and Streams',
      'Build robust REST APIs with Express or NestJS',
      'Implement JWT authentication, rate limiting, and input validation',
      'Connect with MongoDB / PostgreSQL using ORMs and connection pooling',
    ],
    resources: [
      { title: 'Node.js Official Documentation', type: 'docs', url: 'https://nodejs.org/en/docs' },
      { title: 'Node.js Full Course (freeCodeCamp)', type: 'tutorial', url: 'https://www.freecodecamp.org/news/free-nodejs-course-for-beginners/' },
    ],
  },
  MongoDB: {
    hours: 12,
    difficulty: 'Intermediate',
    actionSteps: [
      'Understand document schema design and normalization vs denormalization',
      'Master aggregation pipelines ($match, $group, $lookup, $project)',
      'Create compound indexes and analyze query execution with explain()',
      'Set up MongoDB Atlas and implement Mongoose validation schemas',
    ],
    resources: [
      { title: 'MongoDB University Free Courses', type: 'course', url: 'https://learn.mongodb.com/' },
      { title: 'Mongoose Documentation', type: 'docs', url: 'https://mongoosejs.com/docs/' },
    ],
  },
  PostgreSQL: {
    hours: 18,
    difficulty: 'Intermediate',
    actionSteps: [
      'Write complex joins, subqueries, and window functions',
      'Understand transactions (ACID), isolation levels, and row locking',
      'Optimize slow queries using EXPLAIN ANALYZE and B-Tree / GIN indexes',
      'Integrate with Prisma / Sequelize in backend microservices',
    ],
    resources: [
      { title: 'PostgreSQL Tutorial', type: 'docs', url: 'https://www.postgresqltutorial.com/' },
      { title: 'Use The Index, Luke (SQL Indexing Guide)', type: 'tutorial', url: 'https://use-the-index-luke.com/' },
    ],
  },
  AWS: {
    hours: 24,
    difficulty: 'Advanced',
    actionSteps: [
      'Understand core infrastructure: VPC, EC2, S3, RDS, IAM roles',
      'Deploy serverless APIs using AWS Lambda and API Gateway',
      'Configure CloudWatch alerts and monitoring',
      'Automate deployment with AWS CDK or Terraform',
    ],
    resources: [
      { title: 'AWS Skill Builder Free Learning Plans', type: 'course', url: 'https://explore.skillbuilder.aws/' },
      { title: 'AWS Certified Cloud Practitioner & Solutions Architect Prep', type: 'tutorial', url: 'https://aws.amazon.com/certification/' },
    ],
  },
  'CI/CD Pipelines': {
    hours: 10,
    difficulty: 'Intermediate',
    actionSteps: [
      'Understand CI/CD core concepts: automated build, test, and release',
      'Write GitHub Actions workflows (.github/workflows/main.yml)',
      'Implement automated linting, test suites, and Docker image builds',
      'Configure automated zero-downtime deployment to staging & production',
    ],
    resources: [
      { title: 'GitHub Actions Documentation', type: 'docs', url: 'https://docs.github.com/en/actions' },
    ],
  },
  Redis: {
    hours: 8,
    difficulty: 'Beginner',
    actionSteps: [
      'Understand in-memory caching patterns (Cache-Aside, Write-Through)',
      'Use Redis data structures: Strings, Hashes, Lists, Sets, Sorted Sets',
      'Implement API rate limiting and session storage',
      'Configure TTL (Time to Live) and eviction policies',
    ],
    resources: [
      { title: 'Redis University Free Courses', type: 'course', url: 'https://university.redis.io/' },
    ],
  },
  Microservices: {
    hours: 22,
    difficulty: 'Advanced',
    actionSteps: [
      'Design domain boundaries using Domain-Driven Design (DDD)',
      'Implement inter-service communication (REST, gRPC, and Message Queues)',
      'Manage distributed transactions with the Saga pattern',
      'Implement centralized logging, distributed tracing, and service mesh',
    ],
    resources: [
      { title: 'Microservices Architecture Patterns (Martin Fowler)', type: 'docs', url: 'https://martinfowler.com/articles/microservices.html' },
    ],
  },
  'System Design': {
    hours: 26,
    difficulty: 'Advanced',
    actionSteps: [
      'Master high-level architecture: Load Balancers, CDN, Caching, Sharding',
      'Evaluate trade-offs with CAP Theorem and PACELC Theorem',
      'Design real-world systems (URL Shortener, Chat System, Rate Limiter)',
      'Calculate back-of-the-envelope capacity estimations',
    ],
    resources: [
      { title: 'System Design Primer (GitHub)', type: 'tutorial', url: 'https://github.com/donnemartin/system-design-primer' },
    ],
  },
};

/**
 * Generate a tailored, prioritized learning roadmap from gap analysis results
 */
export function generateLearningPlan(gapAnalysis, options = {}) {
  const { breakdown } = gapAnalysis;
  const items = [];

  // Process missing skills first
  (breakdown.missing || []).forEach((skill) => {
    const meta = SKILL_RESOURCE_DB[skill.name] || {
      hours: skill.requiredLevel === 'Advanced' ? 24 : skill.requiredLevel === 'Beginner' ? 8 : 15,
      difficulty: skill.requiredLevel || 'Intermediate',
      actionSteps: [
        `Study core concepts and syntax of ${skill.name}`,
        `Follow official quickstart and build a working demo application`,
        `Solve common real-world use cases and practice troubleshooting`,
        `Integrate ${skill.name} into your portfolio or target project`,
      ],
      resources: [
        { title: `${skill.name} Official Documentation & Guides`, type: 'docs', url: `https://www.google.com/search?q=${encodeURIComponent(skill.name + ' official documentation')}` },
        { title: `Complete ${skill.name} Crash Course`, type: 'tutorial', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name + ' crash course')}` },
      ],
    };

    let calculatedPriority = 'High';
    if (skill.importance === 'Critical' || skill.frequency >= 3) {
      calculatedPriority = 'Critical';
    } else if (skill.importance === 'High') {
      calculatedPriority = 'High';
    } else if (skill.importance === 'Medium') {
      calculatedPriority = 'Medium';
    } else {
      calculatedPriority = 'Low';
    }

    items.push({
      skillName: skill.name,
      category: skill.category,
      priority: calculatedPriority,
      status: 'to_learn',
      estimatedHours: meta.hours,
      difficulty: meta.difficulty,
      currentLevel: 'None',
      targetLevel: skill.requiredLevel || 'Intermediate',
      whyImportant: `Required by job listing (${skill.importance} priority, mentioned ${skill.frequency || 1}x)`,
      actionSteps: meta.actionSteps,
      resources: meta.resources,
      notes: '',
    });
  });

  // Process weak skills (skills requiring upskilling/proficiency upgrade)
  (breakdown.weak || []).forEach((skill) => {
    const meta = SKILL_RESOURCE_DB[skill.name] || {
      hours: 10,
      difficulty: skill.requiredLevel || 'Intermediate',
      actionSteps: [
        `Review advanced concepts and internal workings of ${skill.name}`,
        `Refactor existing code to use best practices, design patterns, and performance optimizations`,
        `Practice building end-to-end features testing ${skill.requiredLevel} capabilities`,
      ],
      resources: [
        { title: `Advanced ${skill.name} Masterclass`, type: 'course', url: `https://www.google.com/search?q=${encodeURIComponent('advanced ' + skill.name + ' best practices')}` },
      ],
    };

    let calculatedPriority = 'High';
    if (skill.importance === 'Critical') calculatedPriority = 'Critical';
    else if (skill.importance === 'High') calculatedPriority = 'High';
    else calculatedPriority = 'Medium';

    items.push({
      skillName: skill.name,
      category: skill.category,
      priority: calculatedPriority,
      status: 'to_learn',
      estimatedHours: Math.max(6, Math.round(meta.hours * 0.65)), // Faster since student already has beginner knowledge
      difficulty: meta.difficulty,
      currentLevel: skill.studentLevel,
      targetLevel: skill.requiredLevel,
      whyImportant: `Upskill needed: currently at ${skill.studentLevel}, job demands ${skill.requiredLevel}`,
      actionSteps: meta.actionSteps,
      resources: meta.resources,
      notes: '',
    });
  });

  // Sort items: Critical > High > Medium > Low, then by estimated hours descending
  const priorityScore = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  items.sort((a, b) => {
    const diff = (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
    if (diff !== 0) return diff;
    return b.estimatedHours - a.estimatedHours;
  });

  return items;
}

