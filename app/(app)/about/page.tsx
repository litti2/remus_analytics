'use client';

export default function RemusPrdPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Remus PRD</h1>
      <article className="space-y-4 text-sm leading-6 text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Product Requirements Document</h2>
          <p><strong>Remus: Growth Experimentation Advisor</strong></p>
          <p>Team: Product + Design + Applied AI</p>
          <p>Author: Devansh Dubey (devanshdubey.nitd.cse@gmail.com)</p>
          <p>Date: November 18, 2025</p>
          <p>Status: Assignment Submitted</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">1. Executive Summary</h2>
          <p>Early-stage teams struggle to understand, structure, and improve their funnels and experiments. They have data, but not direction; tools, but not clarity; metrics, but not insight. Ema is uniquely positioned to solve this because teams already trust Ema for reasoning, analysis, and decision support.</p>
          <p>Remus is a Growth Experimentation Advisor. It lets teams define their own metrics, build custom funnels, analyze performance, generate experiments, track learnings, and accelerate insight-to-action cycles without requiring a heavy analytics stack.</p>
          <p>This PRD proposes Remus as a modular, AI-driven experimentation layer that sits on top of the data teams already have (spreadsheets, exports, metrics, notes, and snapshots) and organizes it into a unified problem &gt; insight &gt; experiment &gt; learning system.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">2. Problem Statement</h2>
          <p>Across interviews with founders, PMs, and performance marketers, a consistent pattern emerged:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fragmented data scattered across GA/Sheets/Stripe/Notion</li>
            <li>Cannot easily create funnels because metrics rarely follow clean event schemas</li>
            <li>Experimentation is slow, usually 1-3 tests per month</li>
            <li>Insights rarely turn into action because no system connects them</li>
          </ul>
          <p><strong>Key Insight</strong><br/>Teams don't need a new dashboard. They need a way to think — a smart surface that turns messy data into structured decisions.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">3. Strategic Rationale</h2>
          <p><strong>Why This Matters for Remus</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Remus already excels at reasoning and interpreting data</li>
            <li>Users repeatedly ask for help understanding funnels, performance changes, and growth opportunities</li>
            <li>Full analytics tools (Mixpanel, Amplitude) are too heavy for early teams</li>
            <li>There is no "lightweight + AI-native" experimentation system in the market</li>
            <li>Remus aligns with the mission: augment human teams by turning ambiguity into clarity</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">4. Target Users &amp; Personas</h2>
          <p><strong>Persona 1: Founder / Operator (Early-stage startup)</strong><br/>Pain: No central source of truth, unclear funnel, ad-hoc decisions<br/>Behavior: Lives in Sheets/Slack, wants fast insight<br/>Key Need: A place to see where growth is leaking and what to try next</p>
          <p><strong>Persona 2: Growth/Performance Marketer</strong><br/>Pain: Experiments take too long; too many ideas, not enough clarity<br/>Behavior: Comfortable with numbers but hates stitching reports<br/>Key Need: Rapid test creation, hypothesis generation, prioritization</p>
          <p><strong>Persona 3: Product Manager (0-1 or 1-10 stage)</strong><br/>Pain: Data incomplete, events missing, funnels unreliable<br/>Behavior: Wants directional truth, not precision analytics<br/>Key Need: A unified insight &gt; experiment &gt; learning workflow</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">5. Market Opportunity</h2>
          <p><strong>Total Addressable Market (TAM)</strong><br/>$296.88B by 2030 (MarketsandMarkets). This includes the full MarTech ecosystem: analytics, automation, personalization, optimization, and AI marketing tools.</p>
          <p><strong>Serviceable Addressable Market (SAM)</strong><br/>$18B segment inside MarTech focused on AI analytics and experimentation tools that help teams analyze, interpret, and optimize growth.</p>
          <p><strong>Serviceable Obtainable Market (SOM)</strong><br/>$1.0B reachable in 3 to 5 years by targeting startups, SMBs, and agencies adopting AI for insight generation and experiment tracking.</p>
          <p>The MarTech industry is projected to reach $296.88B by 2030, the AI-driven analytics and optimization segment represents roughly $18B, and Remus's obtainable early-stage niche is approximately $1B over 3-5 years.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">6. Proposed Solution: Remus</h2>
          <p>Remus is not a dashboard. Not a deployment tool. It is an AI-first reasoning layer that helps teams track, analyze, ideate, and organize growth experiments.</p>
          <p><strong>Why Remus Exists</strong><br/>The core challenge for early-stage teams isn't data scarcity, but rather the inability to transform raw data into actionable experiments that drive continuous growth.</p>
          <p><strong>Core Capabilities</strong></p>
          <h3 className="font-medium text-foreground">6.1 Custom Funnels (User-Defined Metrics)</h3>
          <p>Users input any metrics (e.g., Visits &gt; Signups &gt; Trials &gt; Paid). Remus builds the funnel, identifies dropoffs, explains why, and quantifies impact.</p>
          <h3 className="font-medium text-foreground">6.2 Copilot Analysis</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>"Analyze my funnel" - narrative interpretation</li>
            <li>"What changed this week?" - anomaly reasoning</li>
            <li>"Where should we focus?" - prioritized opportunities</li>
          </ul>
          <h3 className="font-medium text-foreground">6.3 Experiment Ideation</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>AI generates hypotheses based on dropoffs</li>
            <li>Suggests variations, user flows, copy-level angles</li>
            <li>Prioritizes tests using ICE-like models</li>
          </ul>
          <h3 className="font-medium text-foreground">6.4 Experiment Tracking</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Lightweight experiment cards</li>
            <li>Confidence scores</li>
            <li>Auto-written summaries</li>
            <li>Learnings captured in the Experiment Library</li>
          </ul>
          <h3 className="font-medium text-foreground">6.5 Insight-to-Action Acceleration</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Each insight can instantly become a test</li>
            <li>Each test automatically feeds back into strategy</li>
            <li>Reduces cycle time from weeks to days</li>
          </ul>
          <h3 className="font-medium text-foreground">6.6 Excalidraw-Style Workspace</h3>
          <p>A visual surface for mapping funnels, brainstorming, and structuring ideas. Helps teams externalize thinking and organize information. Works as a complement to structured copilots.</p>
          <p><strong>What Remus Is NOT</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Not an event instrumentation platform</li>
            <li>Not a GA/Mixpanel replacement</li>
            <li>Not an A/B testing deployment tool</li>
            <li>Not a BI dashboard</li>
          </ul>
          <p>Remus is the "thinking layer" above all of these.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">7. User Journey (End-to-End)</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li><strong>Add Metrics:</strong> Manually or via paste. Choose funnel order.</li>
            <li><strong>Analyze:</strong> "Explain drop-offs." "Show biggest opportunity."</li>
            <li><strong>Get Copilot Opinion:</strong> Suggested focus area with reasoned explanation.</li>
            <li><strong>Generate Experiments:</strong> AI produces hypotheses. User adds/edits.</li>
            <li><strong>Start Tracking:</strong> Create experiment cards. Add metrics being monitored.</li>
            <li><strong>Reflect &amp; Learn:</strong> Remus generates post-mortem. Adds learnings to Library.</li>
            <li><strong>Suggest Next Experiments:</strong> Based on results + funnel movement. Enables rapid momentum (2-4 tests/week).</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">8. Scope</h2>
          <p><strong>In Scope</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Funnel builder</li>
            <li>Copilot analysis</li>
            <li>Experiment ideation</li>
            <li>Experiment tracking</li>
            <li>Learning library</li>
            <li>Excalidraw surface for planning</li>
          </ul>
          <p><strong>Out of Scope (Phase 1)</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Test deployment</li>
            <li>Multi-user analytics dashboards</li>
            <li>Automated integrations (deferred to Phase 2)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">9. Success Metrics &amp; KPIs</h2>
          <p><strong>North Star Metric</strong><br/>Weekly Active Experimenters (WAEs) — Teams consistently running, reviewing, or generating experiments weekly.</p>
          <p><strong>Supporting KPIs</strong></p>
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-border"><td className="pr-3 py-1">Experiment velocity</td><td className="py-1">2-4 tests/week</td><td className="py-1">Cadence of actionable tests being run</td></tr>
              <tr className="border-b border-border"><td className="pr-3 py-1">Insight-to-test conversion</td><td className="py-1">&gt;40%</td><td className="py-1">Ability to turn insights into shipped tests</td></tr>
              <tr className="border-b border-border"><td className="pr-3 py-1">Time to first insight</td><td className="py-1">&lt;5 minutes</td><td className="py-1">Speed from data input to actionable suggestions</td></tr>
              <tr className="border-b border-border"><td className="pr-3 py-1">Funnel clarity score</td><td className="py-1">Qualitative</td><td className="py-1">User confidence in understanding their funnel</td></tr>
              <tr><td className="pr-3 py-1">Weekly retention</td><td className="py-1">[target TBD]</td><td className="py-1">Cohort stickiness and repeated value recognition</td></tr>
            </tbody>
          </table>
          <p>Additional: Activation rate [TBD], NPS [TBD]</p>
          <p><strong>Leading Indicators</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Experiments per user</li>
            <li>Insight-to-experiment conversion rate</li>
            <li>Backlog reduction</li>
            <li>Time to insight</li>
            <li>Learning reuse</li>
          </ul>
          <p><em>Key Success Principle:</em> Remus wins by increasing the quality and velocity of experiments, not by creating more analytics.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">10. Risks &amp; Mitigations</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr><th className="pr-3 py-1">Risk</th><th className="pr-3 py-1">Impact</th><th className="py-1">Mitigation</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="pr-3 py-1">Users expect full analytics</td><td className="pr-3 py-1">Misaligned expectations</td><td className="py-1">Explicit positioning: Remus is experimentation intelligence, not event analytics. Position as an experiment intelligence layer, not a dashboard.</td></tr>
              <tr className="border-b border-border"><td className="pr-3 py-1">Messy/partial data</td><td className="pr-3 py-1">Poor suggestions</td><td className="py-1">Confidence scoring + fallback reasoning + prompts for missing context. Guardrails, confidence scoring, and tolerant funnel building.</td></tr>
              <tr><td className="pr-3 py-1">Overreliance on AI</td><td className="pr-3 py-1">Blind trust</td><td className="py-1">Show reasoning, uncertainty, and alternate hypotheses. Expose data and require confirmations.</td></tr>
              <tr><td className="pr-3 py-1">Experimentation becoming random</td><td className="pr-3 py-1">Noise &gt; signal</td><td className="py-1">Strategy mode + prioritization framework. Strategy mode sets goals, constraints, and prioritization logic.</td></tr>
            </tbody>
          </table>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">11. Sample Interactions</h2>
          <p><strong>Example 1: Initial Funnel Analysis</strong></p>
          <p><em>Prompt:</em> "Here are my metrics. Build me a funnel and show where I should focus."</p>
          <p><em>Response:</em> "The largest dropoff is Signup to Trial (62%). This is your highest-leverage point. I recommend: Simplify onboarding; Add CRM nudges; Reduce friction in the 'Try' step. Want experiment ideas?"</p>
          <p><strong>Example 2: Experiment Generation</strong></p>
          <p><em>Prompt:</em> "Generate experiments based on that."</p>
          <p><em>Response:</em> "Here are 6 experiments ranked by expected impact: Reduce fields in signup; Post-signup activation email; Simplify CTA on signup page ..."</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">12. Open Questions</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Which integrations (if any) should be prioritized first?</li>
            <li>Should Remus support teams &gt;15 people or stay focused on early-stage?</li>
            <li>What is the ideal balance between UI structure and Excalidraw-style freeform?</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">14. Testing &amp; Validation Plan</h2>
          <p><strong>Zero-to-Ten Scale Rollout (Pre-GTM)</strong></p>
          <p><strong>Phase 0: Validation (Weeks 1-2)</strong><br/>Goal: Validate problem with founders and PMs<br/>Success Criteria: Confirm low experiment velocity + scattered metrics</p>
          <p><strong>Phase 1: Prototype (Weeks 2-4)</strong><br/>Goal: Build mock-data MVP<br/>Success Criteria: User builds 1 funnel + receives actionable insights</p>
          <p><strong>Phase 2: Beta Pilot (Weeks 4-8)</strong><br/>Goal: Guided pilot with real teams<br/>Success Criteria: Run real experiments + refine LLM reasoning</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">15. Competitive Landscape</h2>
          <p><strong>Current Market Players</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google Optimize — Free, but discontinued; Left massive SMB gap</li>
            <li>Optimizely — $36K+ annual pricing; Enterprise-level complexity</li>
            <li>VWO — $99-$400+/month; Web-only, manual setup</li>
          </ul>
          <p><strong>Remus Differentiation</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>AI-First Architecture:</strong> Competitors give toolkits; Remus gives an assistant. AI proposes tests, creates variants, and analyzes results - eliminating manual setup and guesswork.</li>
            <li><strong>Rapid Testing:</strong> Teams move from 1-3 tests/month to 2-4 tests/week. Remus removes bottlenecks by generating ideas, drafts, and experiment setups instantly.</li>
            <li><strong>Accessible Innovation:</strong> Retains Google Optimize's simplicity but adds what GO lacked: multi-channel testing and AI-generated ideas. Simpler than Optimizely, smarter than VWO's toolkit.</li>
            <li><strong>Workflow Integration:</strong> Remus embeds into daily workflows (Slack/Teams, GA4, GSC, MixPanel, CMS plugins, APIs). Experimentation becomes continuous, not a separate discipline.</li>
          </ul>
          <p><strong>Bottom Line:</strong> In a world where product and marketing boundaries are blurring, Remus uniquely positions itself as the growth strategist AI that makes sophisticated experimentation accessible to everyone. We're not just another testing tool - we're democratizing data-driven decision making.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">16. Recommendation</h2>
          <p>Build Remus as a modular, reasoning-first experimentation layer inside Remus.</p>
          <p>Start simple: custom funnels + analysis + experiment ideation + tracking. Layer in visualization and workflow integration next.</p>
          <p>Remus has the potential to become the daily workspace for early teams making growth decisions and fundamentally accelerates insight &gt; action &gt; learning.</p>
          <p><strong>Next Steps:</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Stakeholder review and alignment</li>
            <li>Technical feasibility assessment</li>
            <li>Design exploration and prototyping</li>
            <li>Phase 1 development roadmap</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
