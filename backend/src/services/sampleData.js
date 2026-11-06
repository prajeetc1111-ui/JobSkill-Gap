/**
 * High-quality sample job descriptions and student profiles for immediate testing
 */

export const SAMPLE_JOBS = [
  {
    id: 'job_fullstack_lead',
    title: 'Senior Full Stack Engineer',
    company: 'Stripe / FinTech Cloud',
    location: 'Remote / San Francisco',
    salary: '$140,000 - $185,000',
    description: `About the Role:
We are looking for a Senior Full Stack Engineer to join our Core Platform team. In this role, you will architect, build, and scale high-throughput web applications and financial APIs that power global commerce.

Key Responsibilities:
- Design and develop performant, accessible web user interfaces using React, Next.js, and TypeScript.
- Architect and maintain resilient backend services and RESTful APIs using Node.js, Express.js, and TypeScript.
- Design database schemas and write optimized queries for PostgreSQL and MongoDB.
- Build event-driven microservices using Redis and Apache Kafka for asynchronous transaction processing.
- Containerize services with Docker and deploy to AWS using Kubernetes (EKS) and CI/CD Pipelines.
- Champion code quality, unit testing with Jest / Vitest, and end-to-end testing with Cypress or Playwright.
- Collaborate closely with Product Managers and Designers in an Agile / Scrum environment.

Requirements:
- 4+ years of professional full-stack software development experience.
- Deep expertise in JavaScript, TypeScript, React, and Node.js.
- Strong proficiency with relational databases (PostgreSQL) and NoSQL (MongoDB).
- Hands-on experience with Docker containerization and AWS cloud infrastructure.
- Solid understanding of Web Security (OWASP), OAuth / JWT authentication, and System Design principles.
- Strong problem solving and communication skills.`,
  },

  {
    id: 'job_devops_cloud',
    title: 'Cloud DevOps & SRE Engineer',
    company: 'CloudNative Solutions',
    location: 'Remote',
    salary: '$130,000 - $170,000',
    description: `About the Role:
Join our Infrastructure & Reliability Engineering team to build modern cloud foundations and automated deployment pipelines supporting 99.99% uptime.

Responsibilities:
- Manage multi-region cloud infrastructure on AWS and Google Cloud Platform (GCP) using Terraform (Infrastructure as Code).
- Architect, monitor, and scale Kubernetes clusters with Helm and ArgoCD.
- Build automated CI/CD Pipelines using GitHub Actions and Jenkins for automated linting, security scanning, and deployments.
- Manage observability, distributed tracing, and alerting stacks with Prometheus / Grafana and Datadog.
- Configure Nginx reverse proxies, ingress controllers, and network security policies.
- Automate operational tasks and serverless workers using Go, Python, and Linux bash scripting.

Required Qualifications:
- 3+ years experience in a DevOps, SRE, or Cloud Infrastructure role.
- Strong knowledge of Docker, Kubernetes, Linux, and Git version control.
- Proven experience with Terraform and AWS or GCP.
- Familiarity with CI/CD Pipelines and automated testing workflows.
- Strong analytical and problem solving mindset with Agile / Scrum experience.`,
  },

  {
    id: 'job_ai_data_engineer',
    title: 'AI & Data Platform Engineer',
    company: 'NeuralMetrics AI',
    location: 'New York / Hybrid',
    salary: '$150,000 - $190,000',
    description: `About the Role:
We are seeking an AI & Data Platform Engineer to design scalable ETL data pipelines, orchestrate machine learning model serving, and integrate Generative AI capabilities.

What You'll Do:
- Develop robust data processing pipelines using Python, Apache Spark, and Pandas.
- Implement real-time streaming architectures using Apache Kafka and Redis.
- Deploy and fine-tune Machine Learning and GenAI / LLMs workflows using PyTorch and FastAPI.
- Manage vector databases and data warehouses with PostgreSQL and Elasticsearch.
- Containerize ML pipelines with Docker and deploy to AWS infrastructure.
- Implement data validation, unit testing, and automated model tracking.

Requirements:
- Strong programming foundation in Python and SQL.
- Hands-on experience with FastAPI, Docker, and PyTorch or TensorFlow.
- Experience building data pipelines with Apache Spark or Apache Kafka.
- Understanding of GenAI / LLMs and modern vector retrieval architectures.
- Experience with cloud providers (AWS or Google Cloud Platform).`,
  },

  {
    id: 'job_frontend_specialist',
    title: 'Frontend React Engineer',
    company: 'Verve Design Systems',
    location: 'Remote',
    salary: '$110,000 - $145,000',
    description: `About the Role:
We are seeking a Frontend Engineer passionate about crafting pixel-perfect, accessible, and blazing-fast user interfaces.

Requirements & Skills:
- Extensive experience with React, TypeScript, HTML5, and CSS3.
- Mastery of modern styling with Tailwind CSS and CSS Modules.
- State management with Redux Toolkit or Zustand.
- Experience with Next.js for server-side rendering and static site generation.
- Proficient in writing automated tests with Jest and Cypress.
- Knowledge of RESTful APIs and GraphQL Client integration.
- Familiarity with Git, Agile / Scrum development, and responsive design.`,
  },
];

export const SAMPLE_STUDENT_PROFILES = [
  {
    name: 'Frontend Developer Transitioning to Full Stack',
    studentName: 'Jordan Chen',
    email: 'jordan.chen@example.com',
    targetRole: 'Full Stack Engineer',
    skills: [
      { name: 'JavaScript', level: 'Advanced', category: 'Programming Languages' },
      { name: 'HTML5', level: 'Advanced', category: 'Frontend' },
      { name: 'CSS3', level: 'Advanced', category: 'Frontend' },
      { name: 'React', level: 'Intermediate', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 'Intermediate', category: 'Frontend' },
      { name: 'Git', level: 'Intermediate', category: 'DevOps & Tools' },
      { name: 'Node.js', level: 'Beginner', category: 'Backend' },
      { name: 'Express.js', level: 'Beginner', category: 'Backend' },
      { name: 'SQL', level: 'Beginner', category: 'Programming Languages' },
    ],
  },
  {
    name: 'Recent Computer Science Graduate',
    studentName: 'Maya Patel',
    email: 'maya.patel@example.com',
    targetRole: 'Junior Software Engineer',
    skills: [
      { name: 'Python', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'Java', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'SQL', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'Problem Solving', level: 'Advanced', category: 'Soft Skills' },
      { name: 'Git', level: 'Beginner', category: 'DevOps & Tools' },
      { name: 'HTML5', level: 'Beginner', category: 'Frontend' },
      { name: 'CSS3', level: 'Beginner', category: 'Frontend' },
    ],
  },
  {
    name: 'Full Stack Developer Upskilling for Cloud/DevOps',
    studentName: 'Liam Kowalski',
    email: 'liam.k@example.com',
    targetRole: 'Senior Cloud Full Stack Engineer',
    skills: [
      { name: 'JavaScript', level: 'Advanced', category: 'Programming Languages' },
      { name: 'TypeScript', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'React', level: 'Advanced', category: 'Frontend' },
      { name: 'Node.js', level: 'Advanced', category: 'Backend' },
      { name: 'Express.js', level: 'Advanced', category: 'Backend' },
      { name: 'MongoDB', level: 'Intermediate', category: 'Database' },
      { name: 'PostgreSQL', level: 'Intermediate', category: 'Database' },
      { name: 'Docker', level: 'Beginner', category: 'DevOps & Cloud' },
      { name: 'Git', level: 'Advanced', category: 'DevOps & Tools' },
    ],
  },
];

