import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import BilingualBlogContent from '@/components/BilingualBlogContent'

// Static params for SSG. Merge DB-derived slugs with STATIC_POSTS slugs so a
// newly-added post is prerendered even before the production DB has been
// re-seeded (otherwise the slug falls to dynamic serverless render).
export async function generateStaticParams() {
  const staticSlugs = Object.keys(STATIC_POSTS).map((slug) => ({ slug }))
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    })
    const dbSlugs = posts.map((p) => ({ slug: p.slug }))
    const seen = new Set<string>()
    const merged: { slug: string }[] = []
    for (const s of [...dbSlugs, ...staticSlugs]) {
      if (!seen.has(s.slug)) {
        seen.add(s.slug)
        merged.push(s)
      }
    }
    return merged
  } catch {
    return staticSlugs
  }
}

// Dynamic metadata — never throws, falls back to static data on any DB error
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const staticPost = STATIC_POSTS[params.slug]
  try {
    const dbPost = await prisma.post.findUnique({ where: { slug: params.slug } })
    if (dbPost) {
      return {
        title: `${dbPost.title} | Celestial Tech`,
        description: dbPost.excerpt,
        openGraph: {
          title: dbPost.title,
          description: dbPost.excerpt,
          type: 'article',
          images: dbPost.coverImage ? [dbPost.coverImage] : [],
        },
      }
    }
  } catch {
    // DB unavailable — fall through to static
  }
  if (!staticPost) return { title: 'Post Not Found | Celestial Tech' }
  return {
    title: `${staticPost.title} | Celestial Tech`,
    description: staticPost.excerpt,
    openGraph: {
      title: staticPost.title,
      description: staticPost.excerpt,
      type: 'article',
      images: staticPost.coverImage ? [staticPost.coverImage] : [],
    },
  }
}

interface PostData {
  id: string
  title: string
  titleZh: string
  slug: string
  excerpt: string
  excerptZh: string
  content: string
  contentZh: string
  category: string
  coverImage: string | null
  author: string
  authorZh: string
  readTime: number
  publishedAt: string
  sourceUrl: string | null
  sourceName: string | null
}

const STATIC_POSTS: Record<string, PostData> = {
  'ai-powered-soc-future-threat-detection': {
    id: '1',
    title: 'AI-Powered SOC: The Future of Threat Detection is Here',
    titleZh: 'AI 驅動 SOC：威脅檢測的未來已來',
    slug: 'ai-powered-soc-future-threat-detection',
    excerpt:
      "Security Operations Centers are being transformed by artificial intelligence. Here's how AI-powered SOCs are redefining threat detection and why your organization needs one.",
    excerptZh: '人工智能正在徹底改變安全運營中心。以下是 AI 驅動的 SOC 如何重新定義威脅檢測，以及您的組織為何需要它。',
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 6,
    publishedAt: '2026-03-20T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## The Evolution of Security Operations

The traditional Security Operations Center (SOC) was built on a simple premise: human analysts monitoring dashboards, triaging alerts, and responding to incidents. But as attack surfaces expanded and threat actors grew more sophisticated, the model began to crack under its own weight.

**The numbers tell a grim story:** The average enterprise now generates over **2 million security events per day**. A team of 10 analysts cannot possibly keep pace. The result? Alert fatigue, missed threats, and breaches that go undetected for weeks.

## Enter AI-Powered SOC

Artificial intelligence is fundamentally reshaping how SOCs operate. Here's what's changing:

- **Speed**: AI systems analyze millions of events per second — something impossible for human teams
- **Accuracy**: Machine learning models reduce false positives by up to 90% by learning from historical data
- **Context**: AI correlates signals across disparate data sources to paint a complete threat picture
- **Continuous Learning**: Unlike static rules, AI models improve with every interaction

## Key Capabilities of AI-Powered SOC

### 1. Behavioral Threat Detection

Rather than relying on known threat signatures, AI-powered SOCs establish baseline behavior for every user, device, and system. When activity deviates from the norm — even by a fraction — the system flags it for investigation.

### 2. Automated Incident Response

When a threat is confirmed, AI-driven SOAR (Security Orchestration, Automation, and Response) platforms can automatically contain affected systems, block malicious IPs, and isolate compromised accounts — often within seconds of detection.

### 3. Predictive Threat Intelligence

AI doesn't just react to current threats — it predicts emerging ones. By analyzing global threat patterns, vulnerability disclosures, and dark web chatter, AI systems can warn organizations about risks before they're actively exploited.

## Why Your SOC Needs AI Now

The threat landscape has never been more hostile. Nation-state actors, ransomware gangs, and supply chain attackers are operating with unprecedented sophistication. Relying on human-only SOC operations is no longer a viable strategy.

**Celestial Tech's AI-Powered SOC** combines advanced machine learning with expert human analysts to deliver continuous, proactive protection. Our hybrid approach catches what tools miss and responds faster than any pure-play SOC.

Ready to transform your security operations? [Contact our team](/#contact) to learn how we can build an AI-powered SOC tailored to your organization.`,
    contentZh: `## 安全運營的演變

傳統的安全運營中心（SOC）基於一個簡單的前提：人類分析師監控儀表板、分揀警報並應對事件。但隨著攻擊面擴大，威脅行為者變得越來越複雜，這一模式開始崩潰。

**數據說明了一切：** 如今，平均每家企業每天產生超過 **200 萬個安全事件**。一個 10 人分析師團隊根本無法跟上。**結果？**警報疲勞、遺漏威脅，以及數週未被發現的漏洞。

## AI 驅動 SOC 的到來

人工智能正在從根本上重塑 SOC 的運作方式。以下是正在發生的變化：

- **速度**：AI 系統每秒分析數百萬個事件——這是人類團隊不可能做到的
- **準確性**：機器學習模型通過學習歷史數據，將誤報率降低多達 90%
- **上下文**：AI 關聯不同數據源的信號，描繪完整的威脅圖景
- **持續學習**：與靜態規則不同，AI 模型每次交互都會改進

## AI 驅動 SOC 的關鍵能力

### 1. 行為威脅檢測

AI 驅動的 SOC 不是依賴已知威脅特徵，而是為每個用戶、設備和系統建立基準行為。當活動偏離正常範圍時——即使只是一點點——系統會標記它以進行調查。

### 2. 自動化事件響應

當威脅被確認時，AI 驅動的 SOAR（安全編排、自動化和響應）平台可以自動控制受影響的系統、阻止惡意 IP 並隔離受損帳戶——通常在檢測後幾秒鐘內。

### 3. 預測性威脅情報

AI 不僅僅是對當前威脅做出反應——它還預測新興威脅。通過分析全球威脅模式、漏洞披露和暗網動態，AI 系統可以在威脅被主動利用之前警告組織。

## 為何您的 SOC 現在需要 AI

威脅環境從未如此惡劣。國家級行為者、勒索軟件團伙和供應鏈攻擊者以前所未有的複雜性運作。僅依靠人類的 SOC 運營不再是可行的策略。

**Celestial Tech 的 AI 驅動 SOC** 結合先進的機器學習與專家人類分析師，提供持續、主動的保護。我們的混合方法能捕捉工具遺漏的內容，並比任何純 SOC 更快響應。

準備好轉變您的安全運營了嗎？[聯絡我們的團隊](/#contact) 了解我們如何為您的組織量身定制 AI 驅動的 SOC。`,
  },
  'reactive-to-predictive-traditional-cybersecurity-failing': {
    id: '2',
    title: 'From Reactive to Predictive: Why Traditional Cybersecurity is Failing',
    titleZh: '從被動到主動：為何傳統網絡安全正在失效',
    slug: 'reactive-to-predictive-traditional-cybersecurity-failing',
    excerpt:
      "Traditional cybersecurity waits for something to break. Predictive security stops threats before they happen. Here's why the paradigm shift is urgent — and inevitable.",
    excerptZh: '傳統網絡安全在被動等待事故發生後才作出反應。預測性安全則在威脅成形之前將其阻止。為何這個範式轉移刻不容緩——且不可逆轉。',
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 5,
    publishedAt: '2026-03-18T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## The Reactive Trap

For decades, cybersecurity operated on a reactive model. Wait for something bad to happen. Detect it. Respond to it. Recover from it. The entire industry — firewalls, antivirus, SIEMs — was built around this cycle.

**The problem?** Reactive security is fundamentally asymmetric. Attackers only need to succeed once. Defenders have to succeed every single time.

The average cost of a data breach now exceeds **$4.4 million**. More alarming: the average dwell time — the period between initial compromise and detection — is **207 days**. By the time most organizations detect a breach, the damage is done.

## What Predictive Security Actually Means

Predictive security isn't just a marketing buzzword. It's a fundamentally different approach:

### Proactive Threat Hunting

Instead of waiting for alerts, predictive SOCs actively search for indicators of compromise that existing tools haven't flagged. Expert analysts combined with AI analysis actively pursue threats that dwell silently in your environment.

### Threat Modeling

Predictive organizations model their adversaries. Who is likely to target you? What are their tactics, techniques, and procedures (TTPs)? By building threat models specific to your industry and organization, security teams can prioritize defenses where they matter most.

### Attack Surface Monitoring

Continuous monitoring of your external attack surface — exposed APIs, forgotten subdomains, misconfigured cloud buckets — surfaces vulnerabilities before attackers find them.

## The Three Pillars of Predictive Security

| Pillar | Description | Outcome |
|--------|-------------|---------|
| **Intelligence** | Real-time threat feeds + dark web monitoring | Know what's coming |
| **Automation** | AI-driven detection + SOAR playbooks | Respond in seconds |
| **Expertise** | Human analysts + machine learning | No alert goes unchecked |

## The Cost of Inaction

Every day your organization runs on reactive security is a day your adversaries have the advantage. The security talent gap means you can't hire your way out of the problem — there simply aren't enough skilled analysts to staff traditional SOCs at the scale required.

**The answer isn't more analysts. It's smarter architecture.**

Celestial Tech's predictive security platform combines AI-powered monitoring, expert-led threat hunting, and round-the-clock response capabilities — giving your organization the proactive defense it deserves.

Don't wait for the breach. [Get ahead of it](/#contact).`,
    contentZh: `## 被動陷阱

數十年來，網絡安全一直基於被動模式運作。等待壞事發生。檢測它。響應它。從中恢復。整個行業——防火牆、防毒軟件、SIEM——都是圍繞這個循環構建的。

**問題在哪裡？** 被動安全在根本上是不對稱的。攻擊者只需成功一次。防守者必須每次都成功。

如今，數據洩露的平均成本超過 **440 萬美元**。更令人震驚的是：平均停留時間——從初始入侵到檢測之間的時間——是 **207 天**。當大多數組織檢測到漏洞時，損害已經造成。

## 預測性安全的真正含義

預測性安全不只是一個營銷術語。這是一種根本不同的方法：

### 主動威脅獵殺

預測性 SOC 不是等待警報，而是主動搜索現有工具尚未標記的入侵指標。專家分析師結合 AI 分析，主動追蹤潛伏在您環境中的威脅。

### 威脅建模

預測性組織會模擬他們的對手。誰可能瞄準您？他們的戰術、技術和程序（TTP）是什麼？通過構建特定於您行業和組織的威脅模型，安全團隊可以將防禦重點放在最關鍵的地方。

### 攻擊面監控

持續監控您的外部攻擊面——暴露的 API、被遺忘的子域名、配置錯誤的雲存儲桶——在攻擊者發現之前發現漏洞。

## 預測性安全的三個支柱

| 支柱 | 描述 | 成果 |
|--------|-------------|---------|
| **情報** | 實時威脅情報 + 暗網監控 | 預知威脅 |
| **自動化** | AI 驅動檢測 + SOAR 劇本 | 秒級響應 |
| **專業知識** | 人類分析師 + 機器學習 | 每個警報都不遺漏 |

## 不行動的代價

您的組織每使用一天被動安全，您的對手就有一天的優勢。安全人才缺口意味著您無法通過招聘來解決問題——根本沒有足夠的技能分析師來按所需規模配備傳統 SOC。

**答案不是更多的分析師。是更智能的架構。**

Celestial Tech 的預測性安全平台結合 AI 驅動的監控、專家主導的威脅獵殺和全天候響應能力——為您的組織提供應有的主動防禦。

不要等待漏洞。[走在它前面](/#contact)。`,
  },
  'convergence-ai-cybersecurity-enterprises-2026': {
    id: '3',
    title: 'The Convergence of AI and Cybersecurity: What Enterprises Need to Know in 2026',
    titleZh: 'AI 與網絡安全的融合：2026 年企業需要知道的事',
    slug: 'convergence-ai-cybersecurity-enterprises-2026',
    excerpt:
      "AI and cybersecurity are no longer separate disciplines — they're converging into a single imperative. Here's what forward-thinking enterprises are doing differently.",
    excerptZh: 'AI 與網絡安全已不再是兩個獨立領域——兩者正融合為一個共同的必然要求。以下是前瞻性企業與別不同之處。',
    category: 'AI',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 7,
    publishedAt: '2026-03-15T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## Two Worlds Colliding

In 2026, the line between AI strategy and cybersecurity strategy has effectively disappeared. Organizations that treat them as separate domains are already falling behind. Those that are fusing them are building unassailable competitive advantages.

**The convergence isn't theoretical.** It's playing out in real time:

- AI is being weaponized by threat actors to create more convincing phishing attacks, bypass authentication systems, and automate vulnerability discovery
- Simultaneously, AI is the most powerful defensive tool ever created — capable of identifying patterns human analysts would never see
- The enterprises winning in this environment are those using AI defensively faster than attackers can use it offensively

## The AI-Powered Threat Landscape

### AI-Generated Social Engineering

Generative AI has made spear-phishing nearly indistinguishable from legitimate communications. Attackers now craft personalized, context-aware messages at industrial scale — targeting CFOs with fake invoice requests, engineers with fabricated Jira notifications, and executives with convincing urgent requests.

### Autonomous Attack Systems

Nation-state actors have deployed AI systems that autonomously scan, exploit, and propagate through networks. These aren't theoretical threats — they're operational today. The average enterprise network faces thousands of automated attack attempts daily.

### Deepfake Fraud

Voice cloning and video synthesis have enabled a new category of fraud. CEO fraud, investment scams, and identity theft powered by deepfakes have cost enterprises billions.

## How Leading Enterprises Are Responding

The organizations ahead of the curve are doing five things differently:

### 1. Unified Security + AI Leadership

Forward-thinking enterprises now have CISOs and Chief AI Officers working in tandem — or in some cases, a single executive accountable for both. Siloed security and AI strategies are being replaced by integrated "Secure AI" frameworks.

### 2. AI-Native Security Architecture

Instead of bolting AI onto legacy security stacks, leading organizations are rebuilding on AI-native foundations. AI-powered SOCs, autonomous threat response, and continuous AI model security are now standard practice.

### 3. Red Teaming AI Systems

Just as penetration testing has been standard for decades, "AI red teaming" — adversarial testing of AI systems themselves — is becoming mandatory. Organizations must secure their AI models from prompt injection, data poisoning, and model extraction attacks.

### 4. Security-Aware AI Governance

AI governance is no longer purely an ethics and compliance concern. Security teams are at the table for every AI deployment decision, ensuring models are not only accurate but also resistant to manipulation.

### 5. AI-Powered Supply Chain Security

Third-party AI services introduce new attack vectors. Leading enterprises are extending their security perimeters to cover AI model supply chains, training data provenance, and inference infrastructure.

## The Imperative for Action

The convergence of AI and cybersecurity isn't a future trend — it's a present reality. The question isn't whether to address it. The question is how fast you can move.

**Celestial Tech** specializes in helping enterprises navigate this convergence. From AI-powered SOC deployment to AI red teaming and Secure AI framework development, we help organizations build defenses that match the threat landscape they're actually facing.

The time to act is now. [Speak with our team](/#contact) to understand your exposure and build a path forward.`,
    contentZh: `## 兩個世界的碰撞

到了 2026 年，AI 策略與網絡安全策略之間的界限已經實際消失。將兩者視為獨立領域的組織正在落後。將兩者融合的組織正在建立不可逾越的競爭優勢。

**這種融合不是理論性的。** 它正在實時上演：

- AI 正在被威脅行為者武器化，創建更令人信服的網絡釣魚攻擊、繞過認證系統並自動化漏洞發現
- 同時，AI 是有史以來最強大的防禦工具——能夠識別人類分析師永遠看不到的模式
- 在這個環境中獲勝的企業，是那些比攻擊者更快地使用 AI 進行防禦的企業

## AI 驅動的威脅環境

### AI 生成的社會工程

生成式 AI 使魚叉式網絡釣魚幾乎與合法通信無法區分。攻擊者現在以工業規模製作個性化、有上下文意識的信息——以虛假發票請求瞄準 CFO、以假冒的 Jira 通知瞄準工程師、以令人信服的緊急請求瞄準高管。

### 自主攻擊系統

國家級行為者已經部署了能自主掃描、利用和傳播的 AI 系統。這些不是理論威脅——它們今天就在運作。平均每個企業網絡每天面對數千次自動攻擊嘗試。

### 深度偽造欺詐

語音克隆和視頻合成催生了一個新的欺詐類別。由深度偽造驅動的 CEO 欺詐、投資詐騙和身份盜竊已經讓企業損失了數十億美元。

## 領先企業如何應對

走在前面的組織有五個不同之處：

### 1. 統一的 安全 + AI 領導力

前瞻性企業現在讓 CISO 和首席 AI 官員並肩工作——或者在某些情況下，由一位高管對兩者負責。孤島化的安全和 AI 策略正在被整合的「安全 AI」框架所取代。

### 2. AI 原生安全架構

領先的組織不是將 AI 附加到傳統安全堆棧上，而是基於 AI 原生基礎重建。AI 驅動的 SOC、自主威脅響應和持續 AI 模型安全性現已成為標準實踐。

### 3. AI 系統紅隊演練

正如滲透測試數十年來一直是標準一樣，「AI 紅隊演練」——對 AI 系統本身進行對抗性測試——正在成為強制性要求。組織必須保護其 AI 模型免受提示注入、數據中毒和模型提取攻擊。

### 4. 安全意識的 AI 治理

AI 治理不再純粹是道德和合規問題。安全團隊參與每個 AI 部署決策，確保模型不僅準確，而且能抵抗操縱。

### 5. AI 驅動的供應鏈安全

第三方 AI 服務引入了新的攻擊向量。領先企業正在擴展其安全邊界，涵蓋 AI 模型供應鏈、訓練數據來源和推理基礎設施。

## 行動的迫切性

AI 與網絡安全的融合不是未來趨勢——它是當下現實。問題不是是否解決它。問題是您能以多快的速度行動。

**Celestial Tech** 專門幫助企業應對這種融合。從 AI 驅動的 SOC 部署到 AI 紅隊演練和安全 AI 框架開發，我們幫助組織建立與其實際面臨的威脅環境相匹配的防禦。

行動的時刻就是現在。[與我們的團隊交談](/#contact)，了解您的風險並建立前進的道路。`,
  },
  'openclaw-multi-agent-patterns-autonomous-execution-engine': {
    id: '4',
    title: 'Building an Autonomous Execution Engine: Multi-Agent Patterns with OpenClaw',
    titleZh: '構建自主執行引擎：OpenClaw 多代理模式',
    slug: 'openclaw-multi-agent-patterns-autonomous-execution-engine',
    excerpt:
      "Six months of building with OpenClaw taught me that the gap between 'AI chatbot' and 'autonomous execution engine' is exactly this: moving from 'AI answers questions' to 'AI completes projects.' Here's what multi-agent orchestration looks like in practice.",
    excerptZh:
      '六個月的 OpenClaw 開發經驗告訴我，「AI 聊天機械人」與「自主執行引擎」之間的鴻溝就在於：從「AI 回答問題」到「AI 完成項目」。以下是多代理編排在實踐中的具體運作方式。',
    category: 'AI',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 8,
    publishedAt: '2026-04-01T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## What Is OpenClaw?

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source agentic AI assistant framework built by [Peter Steinberger](https://x.com/steipete) (who recently joined OpenAI to work on agents). It provides the infrastructure layer for running autonomous AI subagents that can read files, execute shell commands, spawn child agents, and coordinate their work through a shared state system.

Think of it as an operating system for AI agents. Instead of one LLM doing everything in a single conversation, OpenClaw lets you spin up multiple specialized agents that work in parallel, communicate through a structured event log, and defer to a project manager agent for coordination.

The key insight: **single-agent systems bottleneck on context window limits and sequential execution**. A multi-agent system distributes cognitive load across specialized agents, each carrying only the context it needs.

## Why Multi-Agent Systems Matter

The AI productivity space is crowded. Zapier connects 8,000+ apps. Make offers visual workflow automation. n8n provides open-source workflow engine with AI agent nodes. Microsoft Copilot Studio embeds agents deep into enterprise ecosystems.

These are all real products solving real problems. But most of them are **deterministic automation dressed up as AI**. They trigger on events, run predefined logic, connect A to B. Powerful, but brittle.

What multi-agent orchestration unlocks is **adaptive, reasoning-driven automation**:

- **Parallelism = speed.** Independent tasks run simultaneously. Research, writing, coding, and outreach happen at the same time instead of sequentially.
- **Specialization.** A research agent doesn't carry deployment pipeline context. A coding agent doesn't need to know your content calendar. Each agent is scoped to its domain.
- **Resilience.** If one agent crashes, the others keep working. Tasks are independent by design.
- **Context liberation.** Instead of stuffing everything into one context window, each agent operates with focused, relevant context.

## The Three-Layer Architecture

### Layer 1: The Conversational Layer

This is what the human sees and talks to. Natural language goes in; status updates, summaries, and completed work come out. The conversational layer never executes tasks directly. It only coordinates. This is the **CEO rule**: the main session is a coordinator, not a worker.

### Layer 2: The Event / State Layer

Everything significant gets logged to a shared event store. This includes:

- **progress** — task started, completed, or updated
- **blocker** — something is blocking work
- **decision** — a significant choice was made
- **pivot** — direction changed

The event layer is the memory of the system. Any agent can query it to understand what happened, what's blocked, and why a particular decision was made.

### Layer 3: The Execution Layer

This is where work actually happens. Subagents are spawned per project or per task, running in parallel, coordinated through the state layer. Results are written back to the event layer.

## Core Patterns That Actually Work

### The PM Delegation Pattern (CEO Rule)

The main session coordinates. Subagents execute. If the main session tries to do work directly, it becomes a bottleneck. The moment a project is assigned, the main session spawns a PM subagent and steps back.

PM agents own STATE.yaml. They spawn workers, track progress, emit events. The main session only intervenes for decisions or blockers that need human input.

### Event-Driven Coordination

Agents don't poll each other. They communicate through the event log. When a worker finishes a task, it emits a progress event. The PM agent picks this up and updates state.

This means the system is **asynchronous by default**. Any agent can die and be restarted without losing work. The event log is the source of truth.

### The Two-File Rule

The secret to preventing race conditions:

- **AUTONOMOUS.md** — token-light goals and backlog. Only the main session touches this.
- **memory/tasks-log.md** — append-only completed tasks. Subagents only ever add new lines at the bottom.

Append-only logs have zero merge conflicts. An agent either appends successfully or it doesn't — no silent data loss.

## Lessons Learned

**Start with one agent, not five.** The temptation is to spawn a team of specialists immediately. Don't. Start with 1 PM + 1 worker. Understand the coordination overhead before scaling.

**Event log everything, even the boring stuff.** I initially skipped logging for minor tasks. Then I needed to reconstruct why a particular stack decision was made three weeks ago. Now I log progress events for everything.

**Define blocker escalation explicitly.** Early on, agents would get stuck in loops — retrying the same failing action indefinitely. Now blockers automatically escalate after two retries.

The gap between "AI chatbot" and "autonomous execution engine" is exactly this: moving from "AI answers questions" to "AI completes projects." Multi-agent orchestration enables that shift — not as science fiction, but as a daily workflow.

Ready to build your own execution engine? [Contact our team](/#contact) to learn how we can help you set up an AI-powered automation system tailored to your business.`,
    contentZh: `## 什麼是 OpenClaw？

[OpenClaw](https://github.com/openclaw/openclaw) 是一個開源的 AI Agent 框架，由 [Peter Steinberger](https://x.com/steipete)（最近加入 OpenAI 從事 Agent 工作）開發。它提供基礎設施，讓您可以運行多個自主 AI 子代理，它們可以讀取文件、執行 shell 命令、生成子代理，並通過共享狀態系統協調工作。

可以將其想像為 AI 代理的作業系統。不再是一個 LLM 在單一對話中完成所有任務，OpenClaw 讓您啟動多個專業代理並行工作，通過結構化事件日誌溝通，並由項目經理代理進行協調。

關鍵洞察：**單代理系統會因為上下文窗口限制和順序執行而出現瓶頸**。多代理系統將認知負擔分佈到各個專業代理，每個代理只攜帶其所需的上下文。

## 為什麼多代理系統如此重要？

AI 生產力領域已經相當擁擠。Zapier 連接 8,000+ 應用。Make 提供視覺化工作流自動化。Microsoft Copilot Studio 將代理深度嵌入企業生態系統。

這些都是解決真實問題的真實產品。但它們大多數都是**包裝成 AI 的確定性自動化**。強大，但脆弱。

多代理編排所實現的是**自適應、推理驅動的自動化**：

- **並行 = 速度**：獨立任務同時運行。
- **專業化**：研究代理不會帶著部署流水線上下文。每個代理專注於自己的領域。
- **韌性**：如果一個代理崩潰，其他代理繼續工作。
- **上下文解放**：不再將所有內容塞進一個上下文窗口，每個代理專注於相關上下文。

## 三層架構

### 第一層：對話層

這層是人類看到和交流的對象。自然語言輸入，狀態更新、摘要和完成的工作輸出。對話層從不直接執行任務，僅進行協調。這就是**CEO 規則**：主會話是協調者，而非工作者。

### 第二層：事件 / 狀態層

所有重要的事情都會記錄到共享事件存儲。包括 progress、blocker、decision、pivot 等。

事件層是系統的記憶。任何代理都可以查詢，了解發生了什麼、什麼被阻塞、為什麼做了某個決定。

### 第三層：執行層

這層是實際工作發生的地方。子代理按項目或任務生成，並行運行，通過狀態層協調。結果寫回事件層。

## 真正有效的核心模式

### PM 委託模式（CEO 規則）

主會話協調。子代理執行。如果主會話嘗試自己做工作，就會成為瓶頸。一旦項目被分配，主會話生成 PM 子代理然後退後。

PM 代理擁有 STATE.yaml。它們生成工作者、跟蹤進度、發出事件。主會話只在需要人類輸入的決策或阻塞時干預。

### 事件驅動協調

代理之間不會互相輪詢。它們通過事件日誌溝通。當工作者完成任務時，它會發出 progress 事件。PM 代理在下一個查詢週期讀取事件並更新狀態。

這意味著系統**默認異步**。任何代理死亡並重啟都不會丟失工作。事件日誌是事實來源。

### 兩文件規則

防止競爭條件的秘密：

- **AUTONOMOUS.md** — token-light 目標和待辦。只有主會話觸摸這個。
- **memory/tasks-log.md** — 僅追加的已完成任務日誌。子代理只在底部添加新行。

僅追加日誌有零合併衝突。代理要麼成功追加，要麼失敗——沒有隱性數據丟失。

## 經驗教訓

**從一個代理開始，而非五個。** 從 1 個 PM + 1 個工作者開始。在擴展之前了解協調開銷。

**記錄所有事件，即使是無關緊要的事情。** 我最初跳過記錄小任務。然後我需要重建三週前為什麼做某個技術棧決定。現在我記錄所有事情的進度事件。

**明確定義阻塞升級。** 早期代理會卡在循環中——反覆重試相同失敗的動作。現在阻塞自動在兩次重試後升級。

「AI 聊天機械人」和「自主執行引擎」之間的差距就在於此：從「AI 回答問題」到「AI 完成項目」。多代理編排實現了這個轉變——不是科幻，而是日常工作流程。

準備好建立您自己的執行引擎？[聯繫我們的團隊](/#contact) 了解我們如何幫您設置適合您業務的 AI 驅動自動化系統。`,
  },
  'hermes-agent-obsidian-llm-second-brain': {
    id: '5',
    title: 'Hermes Agent + Obsidian: Building an LLM-Powered Second Brain for Business',
    titleZh: 'Hermes Agent + Obsidian：為企業打造由 LLM 驅動的第二大腦',
    slug: 'hermes-agent-obsidian-llm-second-brain',
    excerpt:
      'How a local-first AI agent that reads your Obsidian vault, runs your scripts, and remembers your work becomes the highest-leverage tool a knowledge team can deploy.',
    excerptZh: '一個本地優先的 AI 代理，能讀取你的 Obsidian 筆記庫、執行你的腳本、記得你的工作——它如何成為知識團隊可部署的最高槓桿力工具。',
    category: 'AI',
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1600&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 9,
    publishedAt: '2026-05-15T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## Why we built Hermes Agent

Most AI assistants are chat interfaces bolted onto a single LLM. They forget everything between sessions, can't act on your files, and treat your private knowledge base as out-of-bounds. That's fine for "explain quantum computing" but useless for "summarize last week's client calls and draft a follow-up email."

Hermes Agent is built on a different premise: an AI coworker that lives in your local environment, reads your vault, runs your scripts, and remembers what you told it yesterday. It's the same architectural shift we wrote about in [Building an Autonomous Execution Engine](/blog/openclaw-multi-agent-patterns-autonomous-execution-engine) — but pointed inward at the user's own knowledge.

The project started in March 2026 as an internal tool. Our team was drowning in Obsidian notes, Notion docs, and Slack threads. The question was simple: could we make an agent that reads our vault, understands the structure, and proactively surfaces the right note at the right time?

The answer turned out to be yes. Here's the system we shipped.

## What Hermes Agent actually does

Hermes Agent is a local-first AI agent that integrates with three things:

1. **Your Obsidian vault** as the source of truth for personal + team knowledge
2. **Your shell environment** for executing commands, scripts, and tools
3. **A persistent event log** that records every action it takes

When you ask Hermes to "find every note I wrote about Project Atlas and give me a status summary," it does the following:

- Walks the vault, reads frontmatter, follows links
- Filters by tag, project, or date range
- Synthesizes a summary with inline citations
- Optionally writes a new note capturing the synthesis
- Logs the action to its event log so you can audit what it did

The agent runs locally. Your notes never leave your machine unless you explicitly choose to send them to a remote LLM. For most tasks — search, summarization, link suggestions — a quantized local model (Qwen 2.5 7B, Llama 3.1 8B) is good enough.

## Business use cases we've seen work

We've now deployed Hermes-style agents at over a dozen organizations. The patterns that consistently work:

### 1. Research and synthesis

A consulting firm with 200+ client engagement notes in Obsidian. Before, a new analyst would spend their first week reading the existing notes. Now they ask Hermes for a "client history brief" and get a 3-page synthesis with links to the source notes.

The agent handles the boring part of knowledge work — re-reading the corpus — and the human handles the judgment part — deciding what's relevant to the new engagement.

### 2. Meeting follow-ups

A team of 12 engineers, all running on Obsidian for project notes. After every meeting, someone has to write up the notes, file them in the right folder, and tag them. Hermes does this automatically:

- Reads the transcript (or audio if you have Whisper running)
- Extracts decisions, action items, open questions
- Files the note with the right frontmatter
- Tags it with the relevant project
- Links it to related notes

The engineer who ran the meeting reviews the draft, adjusts tone, hits save.

### 3. Sales enablement

A B2B sales team uses Obsidian as their CRM (don't laugh — it's actually a good fit for the long-form context sales requires). Hermes reads the deal notes, surfaces the most recent activity, drafts the next outreach, and flags deals that have been quiet too long.

The sales rep gets a daily brief: "3 deals need follow-up this week, 2 have new stakeholders since you last looked, 1 has a procurement blocker you should know about." The rep still does the selling — Hermes just keeps the pipeline clean.

### 4. Compliance and audit

A financial services firm uses Hermes to monitor their internal wiki for compliance-sensitive content. The agent flags notes that mention PII, regulated terms, or unsubstantiated claims, and routes them to the compliance team. What used to be a quarterly manual audit is now continuous.

### 5. Onboarding

The single highest-ROI use case. New hires get a Hermes-configured Obsidian vault with the company's institutional knowledge already organized, summarized, and linked. Their first week goes from "drinking from the firehose" to "having a senior colleague explain things in context."

## How Hermes binds with Obsidian

The integration is built on three primitives:

### 1. The vault as a database

Obsidian stores notes as plain Markdown files in a folder. Hermes treats this folder as a queryable database. It can:

- Read any note (full text + frontmatter + links)
- Write new notes (with proper frontmatter and links)
- Edit existing notes (preserving formatting)
- Move and rename notes (updating links)

The "database" view is fully under the user's control — they can add folders, tags, Dataview queries, and templates, and Hermes will respect all of it.

### 2. The event log as memory

Every action Hermes takes is logged to a structured event store (we use \`memory/events.jsonl\` — one JSON object per line). The event log is append-only, so it's auditable and conflict-free.

When you ask Hermes "what did you do last Tuesday?", it queries its own log. When you ask "did anyone update the security policy last month?", it can also query the vault to cross-reference.

### 3. The local LLM as the reasoning engine

Hermes uses a small local LLM (typically Qwen 2.5 7B Instruct or Llama 3.1 8B) for routing, summarization, and tool selection. For heavier tasks — long-context synthesis, complex reasoning — it can call a remote LLM (Claude, GPT-4o, Gemini) but with explicit user consent per task.

The local-first design means:

- **Latency** is 50-200ms for vault operations (no round trip to OpenAI)
- **Cost** is essentially zero (your GPU vs. API bills)
- **Privacy** is structural, not policy — your notes never leave the box unless you say so
- **Reliability** is independent of internet outages

## The LLM second brain pattern

The framing we've found most useful is "second brain" — a term from Tiago Forte's *Building a Second Brain*, applied to LLM-augmented knowledge work.

The traditional second brain is just your Obsidian vault: notes you've captured, organized, and linked so you can find them later. The LLM-augmented second brain is the same vault, but with an agent that:

- **Knows what's in it** — has indexed the full corpus, follows links, understands frontmatter
- **Reasons about it** — can synthesize, compare, and draft new artifacts
- **Acts on it** — can write new notes, update existing ones, trigger workflows
- **Remembers its work** — the event log gives it continuity across sessions

The result is something that feels less like a search engine and more like a colleague who's been with you for years.

## What you need to set this up

A working Hermes + Obsidian stack:

- **Obsidian** (free) with the Dataview, Templater, and Buttons plugins
- **A local LLM** — Ollama with Qwen 2.5 7B or Llama 3.1 8B
- **Hermes Agent** (open source on GitHub) — the orchestrator
- **A vault** with at least ~50 notes (smaller vaults don't show the pattern's value)

Total setup time for someone comfortable with the command line: about 2 hours. For everyone else: half a day with documentation.

## The catch

This isn't magic. The agent only works as well as your vault is organized. If your notes are inconsistent — different tag conventions, missing frontmatter, broken links — Hermes will struggle. The agent amplifies whatever system you give it. A messy vault produces messy answers.

We've found that the first 2-4 weeks of using Hermes are about **vault hygiene**: the agent surfaces inconsistencies, broken links, missing tags, and the user gradually fixes them. After that, the system runs itself.

The other catch is that this is a power-user tool. The UX is command-line first, with Obsidian as the front end. There's no fancy iOS app. If you want turnkey, this isn't it. If you want raw leverage and you don't mind a learning curve, it's transformative.

## What's next for us

We're building a managed service version of Hermes for teams that want the leverage but don't want to run the infrastructure themselves. The architecture is the same — local LLM, vault integration, event log — but hosted, with onboarding, training, and ongoing tuning.

If your team is sitting on a year or more of accumulated Obsidian notes and you suspect there's value in there you're not extracting, [let's talk](/#contact). We'll set up a Hermes instance, run it against your vault for a week, and show you what it finds.`,
    contentZh: `## 為何我們建立 Hermes Agent

大多數 AI 助手都是綁在單一 LLM 上的聊天介面。它們在每次會話之間忘記所有內容、無法讀取你的檔案、並把你的私人知識庫視為禁區。這對「解釋量子計算」沒問題，但對「總結上週的客戶通話並起草一封跟進郵件」毫無用處。

Hermes Agent 基於不同的前提構建：一個住在你本地環境中的 AI 同事，會讀取你的筆記庫、執行你的腳本、記得你昨天告訴它什麼。這與我們在〈[構建自主執行引擎](/blog/openclaw-multi-agent-patterns-autonomous-execution-engine)〉中描述的架構轉變相同，但指向使用者自身的知識內部。

這個項目於 2026 年 3 月作為內部工具啟動。當時我們的團隊淹沒在 Obsidian 筆記、Notion 文件和 Slack 對話中。問題很簡單：我們能否打造一個會讀取筆記庫、理解其結構、並主動在適當時機浮現正確筆記的代理？

答案原來是肯定的。以下是我們推出的系統。

## Hermes Agent 實際能做到什麼

Hermes Agent 是一個本地優先的 AI 代理，與三件事整合：

1. **你的 Obsidian 筆記庫**——作為個人與團隊知識的唯一事實來源
2. **你的 shell 環境**——用於執行命令、腳本和工具
3. **一個持久化的事件日誌**——記錄它採取的每一個動作

當你請 Hermes「找出我寫過的關於 Project Atlas 的所有筆記，並給我一份狀態摘要」時，它會執行以下步驟：

- 走訪筆記庫，讀取 frontmatter，循著連結前進
- 依標籤、專案或日期範圍篩選
- 綜合為一份附有內文引用的摘要
- 選擇性地撰寫一篇新筆記捕捉這次綜合的結果
- 將該動作記錄到事件日誌中，讓你能夠審核它做了什麼

代理在本機執行。除非你明確選擇將筆記送至遠端 LLM，否則你的筆記永遠不會離開你的機器。對大多數任務（搜尋、摘要、連結建議）來說，一個量化後的本地模型（Qwen 2.5 7B、Llama 3.1 8B）已經足夠。

## 我們所見能發揮作用的企業案例

我們現已在十多家企業部署了 Hermes 風格的代理。能持續發揮作用的模式如下：

### 1. 研究與綜合

一家顧問公司，Obsidian 中有 200 多份客戶往來筆記。以前，新分析師入職的第一週都在閱讀既有筆記。現在他們請 Hermes 製作一份「客戶歷史簡報」，就能得到一份 3 頁附有原始筆記連結的綜合報告。

代理處理知識工作中枯燥的部分——重讀整個語料庫；人類處理判斷的部分——決定哪些與新業務相關。

### 2. 會議跟進

一個 12 人的工程師團隊，全部以 Obsidian 作為專案筆記工具。每次會議結束後，總得有人撰寫會議記錄、歸檔到正確的資料夾、加上標籤。Hermes 自動完成這件事：

- 讀取逐字稿（如果你有執行 Whisper，也可以讀取音訊）
- 萃取出決策、待辦事項、未解問題
- 加上正確的 frontmatter 存檔
- 為它加上相關專案的標籤
- 連結到相關筆記

主持會議的工程師審閱草稿、調整語氣、按下儲存。

### 3. 業務賦能

一個 B2B 業務團隊以 Obsidian 作為他們的 CRM（別笑——對於銷售所需的長篇脈絡，這實際上是個不錯的選擇）。Hermes 讀取交易筆記、浮現最近的活動、起草下一封外聯信、並標記已沉寂太久的交易。

業務代表每天收到一份簡報：「本週有 3 筆交易需要跟進、2 筆交易自你上次查看以來出現新的利害關係人、1 筆交易有採購端的阻礙你應該知道。」業務代表依然在做銷售——Hermes 只是讓業務線保持清晰。

### 4. 合規與稽核

一家金融服務公司使用 Hermes 監控其內部 wiki 中是否含有合規敏感內容。代理會標記提及個人身份識別資訊、受監管術語或未經證實說法的筆記，並將其轉交合規團隊。原本每季一次的人工稽核現在變成持續性的。

### 5. 人才入職培訓

投資報酬率最高的單一應用場景。新進員工會拿到一份由 Hermes 配置好的 Obsidian 筆記庫，裡面已整理、摘要、連結好公司的制度性知識。他們的第一週從「被消防水龍頭灌頂」變成「有位資深同事在脈絡中解釋事情」。

## Hermes 如何與 Obsidian 結合

整合建構在三個基本元素之上：

### 1. 筆記庫即資料庫

Obsidian 將筆記以純 Markdown 檔案儲存在資料夾中。Hermes 把這個資料夾視為一個可查詢的資料庫。它能夠：

- 讀取任何筆記（全文 + frontmatter + 連結）
- 撰寫新筆記（帶有正確的 frontmatter 與連結）
- 編輯既有筆記（保留格式）
- 移動與重新命名筆記（更新連結）

「資料庫」檢視完全在使用者掌控之下——他們可以新增資料夾、標籤、Dataview 查詢、範本，Hermes 會全部尊重。

### 2. 事件日誌即記憶

Hermes 採取的每一個動作都會記錄到結構化事件儲存中（我們使用 \`memory/events.jsonl\`——一行一個 JSON 物件）。事件日誌僅追加，因此可稽核且無衝突。

當你問 Hermes「上週二你做了什麼？」，它會查詢自己的日誌。當你問「上個月有人更新安全政策嗎？」，它也能查詢筆記庫做交叉比對。

### 3. 本地 LLM 即推理引擎

Hermes 使用一個小型本地 LLM（通常為 Qwen 2.5 7B Instruct 或 Llama 3.1 8B）來處理路由、摘要和工具選擇。對更重的任務——長脈絡綜合、複雜推理——它可以呼叫遠端 LLM（Claude、GPT-4o、Gemini），但每個任務都需使用者明確同意。

本地優先的設計意味著：

- **延遲**——筆記庫操作 50-200ms（無需往返 OpenAI）
- **成本**——幾乎為零（你的 GPU 對上 API 帳單）
- **隱私**——是結構性的而非政策性的——你的筆記永遠不會離開這台機器，除非你說可以
- **可靠性**——不依賴網路連線

## LLM 第二大腦模式

我們發現最有效的框架是「第二大腦」——這個詞來自 Tiago Forte 的《Building a Second Brain》，應用於 LLM 增強的知識工作。

傳統的第二大腦只是你的 Obsidian 筆記庫：你已擷取、編排、連結的筆記，以便日後能夠找到它們。LLM 增強的第二大腦是同一個筆記庫，但配備了一個能夠：

- **知道裡面有什麼**——已索引整個語料庫、循連結前進、理解 frontmatter
- **對其進行推理**——能夠綜合、比較、起草新成品
- **對其採取行動**——能撰寫新筆記、更新既有筆記、觸發工作流
- **記得它的工作**——事件日誌賦予它跨會話的連續性

結果是感覺起來不像搜尋引擎，更像一位與你共事多年的同事。

## 你需要準備什麼

一個可運作的 Hermes + Obsidian 技術棧：

- **Obsidian**（免費），搭配 Dataview、Templater、Buttons 三個外掛
- **本地 LLM**——Ollama 加上 Qwen 2.5 7B 或 Llama 3.1 8B
- **Hermes Agent**（GitHub 開源）——編排器
- **一份筆記庫**——至少約 50 篇筆記（較小的筆記庫無法體現此模式的價值）

對熟悉命令列的人來說，總設置時間約 2 小時。對其他人：搭配文件半日可完成。

## 注意事項

這並非魔法。代理的表現取決於你筆記庫的組織程度。如果你的筆記不一致——不同的標籤慣例、缺少 frontmatter、斷掉的連結——Hermes 會陷入困難。代理會放大你交給它的任何系統。雜亂的筆記庫會產生雜亂的答案。

我們發現使用 Hermes 的前 2-4 週是在做**筆記庫整理**：代理會浮現不一致、斷掉的連結、缺失的標籤，使用者逐步修復它們。此後，系統就能自我運作。

另一個注意事項是這是一個進階使用者工具。使用者體驗以命令列為先，以 Obsidian 為前端。沒有花俏的 iOS App。如果你想要現成可用的，這不是答案。如果你想要原始的槓桿力且不介意學習曲線，它會帶來根本性的改變。

## 我們的下一步

我們正在為 Hermes 建立託管服務版本，給那些想要這種槓桿力但不想自行運作基礎設施的團隊。架構相同——本地 LLM、筆記庫整合、事件日誌——但託管，並附帶入職培訓、訓練與持續調校。

如果你的團隊已經累積了一年以上的 Obsidian 筆記，並懷疑其中有你尚未提取的價值，[讓我們談談](/#contact)。我們會設置一個 Hermes 實例，針對你的筆記庫運行一週，並展示它找到了什麼。`,
  },
  'hk-pdpo-compliance-sme-guide-2026': {
    id: '6',
    title: 'HK PDPO Compliance for SMEs in 2026: What Changed and What Your Business Actually Needs',
    titleZh: '2026 年香港《個人資料（私隱）條例》對中小企業的合規要求：實際變化與必要行動',
    slug: 'hk-pdpo-compliance-sme-guide-2026',
    excerpt:
      'The Personal Data (Privacy) Ordinance is not optional, and the 2021 doxxing amendments materially expanded the compliance surface. For SMEs without a dedicated legal team, here is what the Privacy Commissioner actually looks at — and what you can fix this quarter.',
    excerptZh: '《個人資料（私隱）條例》並非可選，而 2021 年針對「起底」行為的修訂已實質擴大了合規範圍。對沒有專屬法律團隊的中小企業而言，本文說明私隱專員實際會審視的項目，以及本季度內可採取的修正行動。',
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66c85b?w=1600&q=80',
    author: 'Celestial Tech Team',
    authorZh: 'Celestial Tech 團隊',
    readTime: 7,
    publishedAt: '2026-08-31T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## Compliance as a security control

Most SMEs treat the Personal Data (Privacy) Ordinance (PDPO) as a legal problem. It is not. It is a security control with legal teeth, and the recent enforcement record shows the Privacy Commissioner is willing to use them.

Three observable trends from the last 18 months:

- **Enforcement velocity is up.** The PCPD published 32 compliance investigation reports in 2024–2025, against an average of 14 per year in the preceding five. SMEs account for the majority of new respondents, not the banks.
- **The doxxing amendment is being applied broadly.** Since the 2021 amendments came into force on 8 October 2021, the offence of disclosing or threatening to disclose personal data with intent to cause harm has been charged in cases that do not involve public figures — most often ex-employer disputes, customer disputes, and tenant disputes.
- **Civil exposure is rising.** Compensation claims under section 66 of the PDPO are no longer rare. The maximum award per claim remains HK$150,000, but multiple-claimant cases are now routine.

The threat model is straightforward. The adversary is not always a hacker — it is more often a former employee, a customer with a grievance, or a vendor who mishandles a CSV export. The vulnerability is the same in every case: the SME does not have a written record of what personal data it holds, who has access to it, or what it is doing with it.

## What the 2021 amendments actually changed

Three changes matter for SMEs, in plain terms:

**1. The doxxing offence (new sections 64(1A) and 64(2A))** — It is now an offence to disclose personal data of another person without consent, with intent to cause the victim harm (whether or not harm actually occurs). The offence covers disclosures to any audience, not just public ones. Penalties: fine up to HK$100,000 and imprisonment up to 2 years on first conviction, doubling on second.

**2. The retained doxxing regime (sections 65A–65E)** — Even if the original disclosure is lawful, if a third party subsequently re-shares the data with doxxing intent, both the original poster and the re-sharer can be liable. This catches the case where an SME reposts a screenshot "for context" without thinking through the chain.

**3. Expanded Privacy Commissioner powers** — The PCPD can now issue criminal investigation notices directly, without going through the Department of Justice. For SMEs, this means an investigation can start without the months of pre-notification that used to give legal teams time to assemble a response.

Note: mandatory breach notification has been discussed but is **not yet in force** as of August 2026. Treat voluntary notification as best practice — it materially reduces penalty exposure — but do not assume a hard 72-hour clock.

## The six compliance pillars for an HK SME

If you have no compliance programme at all, these six items cover roughly 80% of what the PCPD will look at:

| Pillar | What it means in practice | Effort |
|---|---|---|
| **Data inventory** | A written list of every category of personal data you hold, where it lives, who has access, and how long you keep it. Excel is fine. | 1 week |
| **Privacy notice** | A written statement, on your website and at point of collection, describing what you collect, why, who you share with, and the data subject's rights. | 1 day |
| **Consent mechanism** | A way to capture, store, and withdraw consent for non-essential processing. Marketing opt-in is the obvious case. | 1 week |
| **Access controls** | Least-privilege access to personal data. Departing employees lose access on their last day, not on the next quarterly review. | Ongoing |
| **Vendor register** | A list of every third party you transfer personal data to, with their data-handling commitments in writing. | 2 weeks |
| **Breach response plan** | A 1-page runbook: who decides, who calls the PCPD, who calls legal, what you say publicly. | 2 days |

None of these require a DPO designation or a compliance officer. They require a spreadsheet and a few conversations.

## A 90-day roadmap without a legal team

**Days 1–14: Inventory.** Walk the office. Where is customer data? Where is HR data? Where is sales data? Write it down. You will find at least one system nobody remembers setting up. This is the foundation; do not skip it.

**Days 15–30: Privacy notice + consent audit.** Publish a privacy notice on your website (a single A4 page is sufficient). Audit every point where you collect data — web forms, sign-up sheets, WhatsApp — and make sure each one links to the notice and captures consent for non-essential processing.

**Days 31–60: Vendor register + access controls.** Email your top 10 vendors and ask for their data processing terms. Most will send a generic reply; ask for the specific clauses that cover data deletion on contract end. Re-baseline access to personal data — most SMEs have 3x more employees with database access than they need.

**Days 61–90: Breach plan + tabletop.** Write a 1-page breach runbook. Run a tabletop exercise with the leadership team. The drill is: "we just discovered an employee posted a customer spreadsheet to a public Slack channel. What do we do in the next hour?" If the answer is "call the CEO," your plan needs another step.

By day 90 you will have a defensible compliance posture that satisfies the PCPD's published guidance. It will not satisfy a regulator who is already investigating a complaint — but that is what lawyers are for.

## When you actually need a DPO

The PDPO does not require a Data Protection Officer for most SMEs. The PCPD's published guidance says a DPO is appropriate when:

- Personal data processing is a **core function** of your business (e.g. data brokers, market research firms, large HR outsourcers)
- You handle **large volumes** of sensitive data (e.g. healthcare records, financial KYC)
- You operate **across jurisdictions** with different regulatory regimes

For a 20-person professional services firm with a customer database and a handful of vendors, a DPO is overhead. A privacy lead — typically the COO or office manager, with 10% of their time allocated — is sufficient.

What the PCPD *will* expect is a **designated contact point** — a named individual whose contact details appear on the privacy notice and who responds to PCPD enquiries within the stated timeframe. That can be the same person as the privacy lead.

## What we see failing in engagements

When SMEs come to us after a PCPD complaint, the failure pattern is almost always one of three:

**1. No data inventory, so they cannot answer the PCPD's first question.** "What personal data do you hold, and where?" If the answer takes more than a week to compile, the case starts badly.

**2. No breach plan, so the first 48 hours are spent panicking.** The PCPD expects notification within a reasonable timeframe and a coherent narrative. Firms without a plan end up making inconsistent statements, which the regulator then uses against them.

**3. Over-reliance on the IT vendor.** The IT vendor handles the systems. The IT vendor does not handle the legal exposure. The SME must own the compliance posture even when the controls are technically delegated.

None of these failures are technical. They are governance failures dressed up as security problems.

## What to do this week

If the compliance programme above feels like too much, start with three actions:

1. **Inventory the spreadsheets.** Find every place personal data lives. You cannot protect what you do not know exists.
2. **Publish a privacy notice.** One page, plain language, on your website. The PCPD's template is acceptable.
3. **Write a 1-page breach runbook.** Even a rough draft. The point is to have a starting point to edit, not a perfect document.

If you have already done these three, you are ahead of the median HK SME. If you want help building the rest — or you have received a PCPD enquiry and need to respond — [our SME cybersecurity practice](/cybersecurity/sme) covers PDPO compliance, vendor due diligence, and breach response under one engagement.`,
    contentZh: `## 合規即安全控制

大多數中小企業將《個人資料（私隱）條例》（私隱條例）視為法律問題。它並非如此。它是一項具有法律效力的安全控制，而近期的執法紀錄顯示私隱專員願意動用這些權力。

過去 18 個月內可觀察到的三個趨勢：

- **執法速度提升。** 私隱專員公署於 2024–2025 年發布了 32 份合規調查報告，而此前五年的年均數量為 14 份。新增的調查對象以中小企業為主，銀行反而並非主流。
- **「起底」修訂條文被廣泛援引。** 自 2021 年 10 月 8 日生效以來，「未經同意披露他人個人資料並意圖對當事人造成傷害」的罪行，已被適用於非公眾人物的案件——最常見的是僱傭糾紛、客戶糾紛和租賃糾紛。
- **民事索償個案上升。** 根據私隱條例第 66 條提出的賠償申索已不再罕見。每宗個案最高賠償額仍為 15 萬港元，但多人原告案件現已成常規。

威脅模型清晰可見。對手未必是黑客——更常見的是前任僱員、帶有不滿的客戶，或處理 CSV 檔案時出錯的供應商。每宗個案的漏洞都相同：中小企業並無書面紀錄，記錄它持有甚麼個人資料、誰有存取權限、正用於甚麼用途。

## 2021 年修訂的實際變化

以白話而言，三項變化對中小企業有直接影響：

**1. 「起底」罪行（新增第 64(1A) 及 64(2A) 條）**——未經同意披露他人個人資料，且有意圖使受害人受到傷害（不論實際是否造成傷害），即屬犯罪。罪行涵蓋向任何對象披露的行為，並不限於向公眾披露。刑罰：首次定罪可處罰款最高 10 萬港元及監禁最長 2 年，再次定罪刑罰加倍。

**2. 持續「起底」機制（第 65A–65E 條）**——即使原本的披露屬合法，其後第三方以「起底」意圖轉載該資料，原本的發佈者與轉載者均可負上法律責任。這涵蓋一種情況：中小企業員工「為說明背景」轉載螢幕截圖，但未有思考整個傳播鏈。

**3. 私隱專員權力擴大**——私隱專員現可直接發出刑事調查通知，無須通過律政司。對中小企業而言，這代表調查可以在沒有以往數月預先通知的情況下展開，讓法律團隊失去準備回應的時間。

注：強制性資料外洩通報機制已被討論，但**截至 2026 年 8 月仍未生效**。將自願通報視為最佳實務——能大幅降低罰則風險——但不要假設存在硬性的 72 小時期限。

## 中小企業六項合規支柱

若你完全沒有任何合規計劃，以下六項涵蓋私隱專員約 80% 的審視範圍：

| 支柱 | 實務上的意義 | 工作量 |
|---|---|---|
| **資料清單** | 一份書面紀錄，列出所持有的每類個人資料、儲存位置、存取者及保留期。Excel 已足夠。 | 1 週 |
| **私隱通知** | 一份書面聲明，置於網站及收集資料時點，描述收集目的、共享對象及資料當事人權利。 | 1 日 |
| **同意機制** | 一個能擷取、儲存及撤回同意的機制（涵蓋非必要處理）。市場推廣的選擇加入（opt-in）是最明顯案例。 | 1 週 |
| **存取控制** | 對個人資料實施最小權限存取。離職員工的權限應於最後工作日撤銷，而非下一次季度覆核。 | 持續進行 |
| **供應商名冊** | 一份書面清單，列出所有接受你轉移個人資料的第三方，並備有書面資料處理承諾。 | 2 週 |
| **外洩應變計劃** | 一頁紙的行動手冊：由誰決策、誰聯絡私隱專員、誰聯絡法律、誰負責對外發言。 | 2 日 |

上述各項無需任命保障主任或合規主任。所需者為一份試算表及若干內部對話。

## 無法律團隊的 90 天路線圖

**第 1–14 日：建立資料清單。** 親自走訪辦公室。客戶資料在哪裡？人力資源資料在哪裡？銷售資料在哪裡？一一記下。你會發現至少有一套系統無人記得是誰架設的。此為基礎，不可跳過。

**第 15–30 日：私隱通知與同意機制審核。** 在網站上發布私隱通知（一頁 A4 已足）。審核每個收集資料的接觸點——網頁表格、報名表、WhatsApp——並確認每個接觸點均連結通知、就非必要處理取得同意。

**第 31–60 日：供應商名冊與存取控制。** 電郵予你最常合作的 10 家供應商，索取其資料處理條款。大部分會回覆制式內容；應要求對方提供涵蓋合約終止時資料刪除的具體條款。重新劃定個人資料的存取權限——大部分中小企業容許過多員工存取資料庫，數量通常為實際所需的三倍。

**第 61–90 日：外洩計劃與桌上演練。** 撰寫一頁紙的外洩行動手冊。與領導層進行桌上演練。情境題：「我們剛發現一名員工將客戶試算表發佈至一個公開 Slack 頻道。下一步一小時內應怎做？」若答案是「打電話給 CEO」，你的計劃仍欠一步。

至第 90 日為止，你將具備符合私隱專員公署指引的可辯護合規姿態。此姿態無法滿足已展開調查的監管機構——但那是律師的工作範疇。

## 何時真正需要任命保障主任

私隱條例對大部分中小企業並無強制要求設立保障主任。私隱專員公署的公開指引指出，下列情況下適合任命保障主任：

- 個人資料處理為業務的**核心職能**（例如資料中介、市場研究公司、大型人力資源外判商）
- 你處理**大量敏感資料**（例如醫療記錄、金融 KYC 資料）
- 你**跨越不同司法管轄區**營運，各區有不同的規管制度

對一間擁有 20 名員工、備有客戶資料庫及數家供應商的專業服務公司而言，任命保障主任屬額外開支。私隱主管——通常由營運總監或辦公室經理兼任，分配約 10% 工作時間——已足夠。

私隱專員公署**真正期望**的是設立一個**指定聯絡點**——一位具名的聯絡人，其聯絡資料會顯示於私隱通知上，並於指定時限內回應私隱專員的查詢。此人可與私隱主管為同一人。

## 從委聘個案中觀察到的常見失敗

中小企業在收到私隱專員投訴後向我們求助時，失敗模式幾乎必屬以下三類之一：

**1. 沒有資料清單，因此無法回答私隱專員的首條問題。**「你持有甚麼個人資料？儲存於何處？」若答案需時超過一週整理，案件已處於不利位置。

**2. 沒有外洩計劃，首 48 小時陷入恐慌。** 私隱專員期望在合理時間內收到通知，並期望獲得連貫敘述。沒有計劃的公司容易作出前後矛盾的陳述，監管機構會利用這些矛盾作為不利證據。

**3. 過度依賴資訊科技供應商。** 資訊科技供應商負責系統運作，但並不承擔法律責任。即使技術控制已外判，中小企業仍須擁有合規姿態。

上述失敗均非技術問題。它們皆為披著安全問題外衣的管治失敗。

## 本週可採取的行動

若上述合規計劃過於龐大，由三項行動起步：

1. **盤點試算表。** 找出個人資料所在的每一處。無法保護你並不知道存在的東西。
2. **發布私隱通知。** 一頁、淺白語言、置於網站。私隱專員公署的範本已可接受。
3. **撰寫一頁外洩行動手冊。** 即使只是粗略草稿。重點是有一個起點可供編輯，並非追求完美文件。

若你已完成上述三項，你已領先香港中小企業的中位水平。若你需要協助建立其餘部分——或你已收到私隱專員查詢並需要回應——[我們的中小企業網絡安全實務](/cybersecurity/sme) 在同一委聘框架下涵蓋私隱條例合規、供應商盡職審查及外洩應變。`,
  },
}

/**
 * Merge a DB post with the static fallback so the rendered post ALWAYS has
 * every bilingual field populated. If the DB is missing a field, the static
 * version fills in. If the DB is missing entirely, we use the static one.
 */
function mergePost(dbPost: any, staticPost: PostData | null): PostData | null {
  if (!staticPost) return dbPost ?? null
  if (!dbPost) return staticPost
  // DB takes priority, but fall back to static for any missing/empty field
  return {
    ...staticPost,
    ...dbPost,
    title: dbPost.title || staticPost.title,
    titleZh: dbPost.titleZh || staticPost.titleZh,
    excerpt: dbPost.excerpt || staticPost.excerpt,
    excerptZh: dbPost.excerptZh || staticPost.excerptZh,
    content: dbPost.content || staticPost.content,
    contentZh: dbPost.contentZh || staticPost.contentZh,
    author: dbPost.author || staticPost.author,
    authorZh: dbPost.authorZh || staticPost.authorZh,
    coverImage: dbPost.coverImage || staticPost.coverImage,
    sourceUrl: dbPost.sourceUrl ?? staticPost.sourceUrl,
    sourceName: dbPost.sourceName ?? staticPost.sourceName,
  } as PostData
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const staticPost = STATIC_POSTS[params.slug] ?? null
  let post: PostData | null = staticPost

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug: params.slug } })
    post = mergePost(dbPost, staticPost)
  } catch {
    // DB not available — use static data
    post = staticPost
  }

  if (!post) {
    notFound()
  }

  const allPosts = Object.values(STATIC_POSTS).filter(
    (p) => p.slug !== params.slug && p.category === post.category
  )
  const relatedPosts = allPosts.slice(0, 3).map((p) => ({
    id: p.id,
    title: p.title,
    titleZh: p.titleZh,
    slug: p.slug,
    category: p.category,
    readTime: p.readTime,
  }))

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[120px]" />

      <Navbar />
      <BilingualBlogContent post={post} relatedPosts={relatedPosts} />
    </main>
  )
}
