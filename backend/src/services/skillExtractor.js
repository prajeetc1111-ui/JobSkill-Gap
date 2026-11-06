/**
 * Comprehensive Skill Extractor & Taxonomy Engine
 */

export const SKILL_TAXONOMY = [
  // Programming Languages
  { name: 'JavaScript', category: 'Programming Languages', aliases: ['javascript', 'js', 'es6', 'es2015', 'ecmascript'] },
  { name: 'TypeScript', category: 'Programming Languages', aliases: ['typescript', 'ts'] },
  { name: 'Python', category: 'Programming Languages', aliases: ['python', 'py', 'python3'] },
  { name: 'Java', category: 'Programming Languages', aliases: ['java', 'jdk', 'jvm', 'j2ee'] },
  { name: 'C++', category: 'Programming Languages', aliases: ['c++', 'cpp'] },
  { name: 'C#', category: 'Programming Languages', aliases: ['c#', 'csharp', 'dotnet c#'] },
  { name: 'Go', category: 'Programming Languages', aliases: ['golang', 'go lang', 'go'] },
  { name: 'Rust', category: 'Programming Languages', aliases: ['rust', 'rustlang'] },
  { name: 'Ruby', category: 'Programming Languages', aliases: ['ruby'] },
  { name: 'PHP', category: 'Programming Languages', aliases: ['php', 'php8'] },
  { name: 'Kotlin', category: 'Programming Languages', aliases: ['kotlin'] },
  { name: 'Swift', category: 'Programming Languages', aliases: ['swift'] },
  { name: 'SQL', category: 'Programming Languages', aliases: ['sql', 'ansi sql', 't-sql', 'pl/sql'] },

  // Frontend Frameworks & Web
  { name: 'React', category: 'Frontend', aliases: ['react', 'react.js', 'reactjs'] },
  { name: 'Next.js', category: 'Frontend', aliases: ['next.js', 'nextjs', 'next'] },
  { name: 'Vue.js', category: 'Frontend', aliases: ['vue', 'vue.js', 'vuejs', 'vue3'] },
  { name: 'Nuxt.js', category: 'Frontend', aliases: ['nuxt', 'nuxt.js', 'nuxtjs'] },
  { name: 'Angular', category: 'Frontend', aliases: ['angular', 'angularjs', 'angular 2+'] },
  { name: 'Svelte', category: 'Frontend', aliases: ['svelte', 'sveltekit'] },
  { name: 'HTML5', category: 'Frontend', aliases: ['html', 'html5', 'semantic html'] },
  { name: 'CSS3', category: 'Frontend', aliases: ['css', 'css3', 'modern css'] },
  { name: 'Tailwind CSS', category: 'Frontend', aliases: ['tailwind', 'tailwindcss', 'tailwind-css'] },
  { name: 'Bootstrap', category: 'Frontend', aliases: ['bootstrap', 'bootstrap 5'] },
  { name: 'Sass/SCSS', category: 'Frontend', aliases: ['sass', 'scss'] },
  { name: 'Redux', category: 'Frontend', aliases: ['redux', 'redux toolkit', 'rtk'] },
  { name: 'GraphQL Client', category: 'Frontend', aliases: ['apollo client', 'relay', 'urql'] },
  { name: 'Webpack', category: 'Frontend', aliases: ['webpack', 'vite', 'turbopack', 'rollup'] },

  // Backend & APIs
  { name: 'Node.js', category: 'Backend', aliases: ['node', 'node.js', 'nodejs'] },
  { name: 'Express.js', category: 'Backend', aliases: ['express', 'express.js', 'expressjs'] },
  { name: 'NestJS', category: 'Backend', aliases: ['nestjs', 'nest.js'] },
  { name: 'Django', category: 'Backend', aliases: ['django', 'drf', 'django rest framework'] },
  { name: 'FastAPI', category: 'Backend', aliases: ['fastapi', 'fast-api'] },
  { name: 'Flask', category: 'Backend', aliases: ['flask'] },
  { name: 'Spring Boot', category: 'Backend', aliases: ['spring', 'spring boot', 'springboot'] },
  { name: '.NET Core', category: 'Backend', aliases: ['.net', '.net core', 'asp.net', 'dotnet'] },
  { name: 'Ruby on Rails', category: 'Backend', aliases: ['rails', 'ruby on rails'] },
  { name: 'RESTful APIs', category: 'Backend', aliases: ['rest', 'rest api', 'restful', 'restful apis', 'rest apis'] },
  { name: 'GraphQL', category: 'Backend', aliases: ['graphql', 'apollo server'] },
  { name: 'gRPC', category: 'Backend', aliases: ['grpc', 'protobuf'] },
  { name: 'WebSockets', category: 'Backend', aliases: ['websockets', 'socket.io', 'websocket'] },
  { name: 'Microservices', category: 'Architecture', aliases: ['microservices', 'microservice architecture', 'distributed systems'] },

  // Databases & Caching
  { name: 'PostgreSQL', category: 'Database', aliases: ['postgres', 'postgresql', 'psql'] },
  { name: 'MongoDB', category: 'Database', aliases: ['mongo', 'mongodb', 'mongoose'] },
  { name: 'MySQL', category: 'Database', aliases: ['mysql', 'mariadb'] },
  { name: 'Redis', category: 'Database', aliases: ['redis', 'redis cache', 'key-value store'] },
  { name: 'Elasticsearch', category: 'Database', aliases: ['elasticsearch', 'elastic search', 'elk'] },
  { name: 'DynamoDB', category: 'Database', aliases: ['dynamodb', 'aws dynamodb'] },
  { name: 'Cassandra', category: 'Database', aliases: ['cassandra', 'apache cassandra'] },
  { name: 'Prisma / ORM', category: 'Database', aliases: ['prisma', 'typeorm', 'hibernate', 'sequelize', 'sqlalchemy'] },

  // Cloud & DevOps
  { name: 'Docker', category: 'DevOps & Cloud', aliases: ['docker', 'containerization', 'containers'] },
  { name: 'Kubernetes', category: 'DevOps & Cloud', aliases: ['k8s', 'kubernetes', 'helm'] },
  { name: 'AWS', category: 'DevOps & Cloud', aliases: ['aws', 'amazon web services', 's3', 'ec2', 'lambda', 'cloudformation', 'iam'] },
  { name: 'Google Cloud Platform (GCP)', category: 'DevOps & Cloud', aliases: ['gcp', 'google cloud', 'google cloud platform', 'bigquery', 'gke'] },
  { name: 'Microsoft Azure', category: 'DevOps & Cloud', aliases: ['azure', 'microsoft azure', 'azure devops'] },
  { name: 'Terraform', category: 'DevOps & Cloud', aliases: ['terraform', 'iac', 'infrastructure as code'] },
  { name: 'CI/CD Pipelines', category: 'DevOps & Cloud', aliases: ['ci/cd', 'cicd', 'github actions', 'jenkins', 'gitlab ci', 'continuous integration'] },
  { name: 'Git', category: 'DevOps & Tools', aliases: ['git', 'github', 'version control', 'gitlab', 'bitbucket'] },
  { name: 'Linux', category: 'DevOps & Tools', aliases: ['linux', 'bash', 'shell scripting', 'unix'] },
  { name: 'Nginx', category: 'DevOps & Cloud', aliases: ['nginx', 'reverse proxy', 'apache web server'] },
  { name: 'Prometheus / Grafana', category: 'DevOps & Cloud', aliases: ['prometheus', 'grafana', 'datadog', 'monitoring', 'observability'] },

  // Data Science, AI & ML
  { name: 'Machine Learning', category: 'Data & AI', aliases: ['machine learning', 'ml', 'deep learning'] },
  { name: 'PyTorch', category: 'Data & AI', aliases: ['pytorch', 'torch'] },
  { name: 'TensorFlow', category: 'Data & AI', aliases: ['tensorflow', 'tf', 'keras'] },
  { name: 'Pandas', category: 'Data & AI', aliases: ['pandas', 'numpy', 'scipy', 'matplotlib'] },
  { name: 'Apache Spark', category: 'Data & AI', aliases: ['spark', 'apache spark', 'pyspark'] },
  { name: 'Apache Kafka', category: 'Data & AI', aliases: ['kafka', 'apache kafka', 'message queue', 'event streaming', 'rabbitmq'] },
  { name: 'GenAI / LLMs', category: 'Data & AI', aliases: ['llm', 'llms', 'openai', 'gemini', 'langchain', 'generative ai', 'prompt engineering', 'rag'] },

  // Testing & Quality
  { name: 'Unit Testing', category: 'Testing', aliases: ['unit testing', 'unit tests', 'tdd', 'test-driven development'] },
  { name: 'Jest / Vitest', category: 'Testing', aliases: ['jest', 'vitest', 'mocha', 'chai'] },
  { name: 'Cypress / Playwright', category: 'Testing', aliases: ['cypress', 'playwright', 'selenium', 'e2e testing'] },

  // Security & Authentication
  { name: 'OAuth / JWT', category: 'Security', aliases: ['oauth', 'oauth2', 'jwt', 'json web tokens', 'auth0', 'authentication'] },
  { name: 'Web Security (OWASP)', category: 'Security', aliases: ['owasp', 'web security', 'csrf', 'xss', 'cors', 'penetration testing'] },

  // Soft Skills & Methodologies
  { name: 'Agile / Scrum', category: 'Methodology', aliases: ['agile', 'scrum', 'kanban', 'sprint planning', 'jira'] },
  { name: 'System Design', category: 'Architecture', aliases: ['system design', 'high level design', 'low level design', 'scalability'] },
  { name: 'Problem Solving', category: 'Soft Skills', aliases: ['problem solving', 'analytical skills', 'critical thinking'] },
  { name: 'Team Collaboration', category: 'Soft Skills', aliases: ['collaboration', 'cross-functional teams', 'team player', 'communication skills'] },
  { name: 'Code Review', category: 'Methodology', aliases: ['code review', 'code reviews', 'pr review'] },
];

/**
 * Heuristics to detect required level and importance based on surrounding context
 */
function analyzeSkillContext(text, aliases) {
  const lowerText = text.toLowerCase();

  // Find occurrences of any alias
  let frequency = 0;
  let sampleContext = '';

  for (const alias of aliases) {
    // Regex with word boundaries
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      frequency += matches.length;
      if (!sampleContext) {
        const idx = lowerText.indexOf(alias);
        sampleContext = lowerText.substring(Math.max(0, idx - 80), Math.min(lowerText.length, idx + 80));
      }
    }
  }

  if (frequency === 0) return null;

  // Determine Required Level
  let requiredLevel = 'Intermediate';
  if (
    /expert|architect|advanced|senior|lead|5\+\s*years|6\+\s*years|7\+\s*years|deep\s*understanding|in-depth|mastery/i.test(
      sampleContext
    )
  ) {
    requiredLevel = 'Advanced';
  } else if (
    /familiarity|exposure|basic|understanding\s*of|nice\s*to\s*have|junior|entry|intern/i.test(
      sampleContext
    )
  ) {
    requiredLevel = 'Beginner';
  }

  // Determine Importance
  let importance = 'Medium';
  if (
    /must\s*have|required|essential|core|mandatory|critical|primary|key\s*requirement/i.test(
      sampleContext
    ) ||
    frequency >= 3
  ) {
    importance = 'Critical';
  } else if (
    /strong|proficient|solid|proven|significant/i.test(sampleContext) ||
    frequency === 2
  ) {
    importance = 'High';
  } else if (/nice\s*to\s*have|plus|bonus|optional|preferred|good\s*to\s*have/i.test(sampleContext)) {
    importance = 'Low';
  }

  return { frequency, requiredLevel, importance };
}

/**
 * Extract skills from any raw job description text
 */
export function extractSkills(jobText) {
  if (!jobText || typeof jobText !== 'string') {
    return [];
  }

  const extracted = [];
  const seenSkills = new Set();

  for (const skill of SKILL_TAXONOMY) {
    const analysis = analyzeSkillContext(jobText, skill.aliases);
    if (analysis && !seenSkills.has(skill.name)) {
      seenSkills.add(skill.name);
      extracted.push({
        name: skill.name,
        category: skill.category,
        frequency: analysis.frequency,
        requiredLevel: analysis.requiredLevel,
        importance: analysis.importance,
      });
    }
  }

  // Sort by Importance (Critical > High > Medium > Low) and then Frequency
  const importanceOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  extracted.sort((a, b) => {
    const weightDiff = (importanceOrder[b.importance] || 0) - (importanceOrder[a.importance] || 0);
    if (weightDiff !== 0) return weightDiff;
    return b.frequency - a.frequency;
  });

  return extracted;
}

