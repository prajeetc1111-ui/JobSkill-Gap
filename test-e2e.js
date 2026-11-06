import http from 'http';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = options.body;
    const req = http.request(
      {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
          ...options.headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = data;
          }
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        });
      }
    );
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 [Test Harness] Starting backend server in child process...');
  const serverProc = fork(path.join(__dirname, 'backend', 'src', 'index.js'), {
    stdio: 'pipe',
    env: { ...process.env, PORT: '5001' },
  });

  serverProc.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`));
  serverProc.stderr.on('data', (d) => process.stderr.write(`[Server ERR] ${d}`));

  console.log('⏳ Waiting for server initialization...');
  await sleep(4000);

  const BASE = 'http://127.0.0.1:5001';

  try {
    // 1. Health
    console.log('\n--- 1. Testing GET /api/health ---');
    const health = await fetch(`${BASE}/api/health`);
    console.log('Status:', health.status, 'Response:', health.data);
    if (health.status !== 200) throw new Error('Health check failed');

    // 2. Samples
    console.log('\n--- 2. Testing Samples APIs ---');
    const samples = await fetch(`${BASE}/api/samples/jobs`);
    console.log('Sample Jobs Count:', samples.data.jobs?.length);
    if (!samples.data.jobs || samples.data.jobs.length === 0) throw new Error('Jobs empty');

    // 3. Skill Extraction
    console.log('\n--- 3. Testing POST /api/analysis/extract ---');
    const jdText = samples.data.jobs[0].description;
    const extractRes = await fetch(`${BASE}/api/analysis/extract`, {
      method: 'POST',
      body: JSON.stringify({ jobDescription: jdText }),
    });
    console.log('Extracted Skills Count:', extractRes.data.skills?.length);
    console.log('Sample Extracted:', extractRes.data.skills?.slice(0, 5));
    if (!extractRes.data.skills || extractRes.data.skills.length === 0)
      throw new Error('Extraction failed');

    // 4. Gap Analysis
    console.log('\n--- 4. Testing POST /api/analysis/gap ---');
    const gapRes = await fetch(`${BASE}/api/analysis/gap`, {
      method: 'POST',
      body: JSON.stringify({
        jobDescription: jdText,
        title: 'Senior Full Stack Engineer',
        company: 'Stripe',
        studentSkills: [
          { name: 'JavaScript', level: 'Advanced', category: 'Frontend' },
          { name: 'React', level: 'Intermediate', category: 'Frontend' },
          { name: 'HTML5', level: 'Advanced', category: 'Frontend' },
          { name: 'CSS3', level: 'Advanced', category: 'Frontend' },
          { name: 'Git', level: 'Intermediate', category: 'DevOps & Tools' },
        ],
      }),
    });
    console.log('Gap Analysis Status:', gapRes.status);
    console.log('Match Score:', gapRes.data.analysis?.matchScore);
    console.log('Readiness Level:', gapRes.data.analysis?.readinessLevel);
    console.log('Plan Items Count:', gapRes.data.plan?.items?.length);
    if (!gapRes.data.analysis || gapRes.data.analysis.matchScore === undefined)
      throw new Error('Gap analysis failed');

    const planId = gapRes.data.plan._id;
    const firstPlanSkill = gapRes.data.plan.items[0].skillName;

    // 5. Update Plan Item Status
    console.log(`\n--- 5. Testing PATCH /api/plans/${planId}/skills/${firstPlanSkill}/status ---`);
    const statusRes = await fetch(
      `${BASE}/api/plans/${planId}/skills/${encodeURIComponent(firstPlanSkill)}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'completed',
          notes: 'Completed official tutorial & built demo app',
        }),
      }
    );
    console.log('Updated Plan Progress %:', statusRes.data.plan?.progressPercentage);
    console.log('Updated Completed Skills:', statusRes.data.plan?.completedSkills);
    if (statusRes.data.plan?.completedSkills !== 1)
      throw new Error('Plan status update did not persist');

    // 6. Test Frontend Static Serving
    console.log('\n--- 6. Testing GET / (Frontend Bundle Serving) ---');
    const frontendRes = await fetch(`${BASE}/`);
    console.log('Frontend Status:', frontendRes.status);
    const htmlSnippet = typeof frontendRes.data === 'string' ? frontendRes.data.substring(0, 120) : '';
    console.log('HTML Snippet:', htmlSnippet);
    if (frontendRes.status !== 200 || !htmlSnippet.includes('html'))
      throw new Error('Frontend serving failed');

    console.log('\n🎉 ALL FULL-STACK TESTS PASSED SUCCESSFULLY! ✅');
  } catch (err) {
    console.error('\n❌ Test Failure:', err);
    process.exitCode = 1;
  } finally {
    console.log('🛑 Stopping server...');
    serverProc.kill();
  }
}

runTests();

