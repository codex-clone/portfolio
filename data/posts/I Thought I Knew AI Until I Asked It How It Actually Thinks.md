---
title: "I Thought I Knew AI Until I Asked It How It Actually Thinks"
date: "2026-02-01"
author: "Prashant Choudhary"
excerpt: "The uncomfortable truth about using AI for 12 months without understanding its cognitive process—and the exact framework that puts you in the top 0.01% of users."
tags: ["ai", "prompt-engineering", "llm", "productivity", "tutorial", "machine-learning"]
published: true
image: "/images/blog/ai-thinking-process.jpg"
readingTime: 12
---

# I Thought I Knew AI Until I Asked It How It Actually Thinks

I've been using ChatGPT, Claude, and Gemini for over a year. I built side projects with them. I automated my workflows. I even made business decisions based on their outputs.

**Here's the embarrassing part:** I had no clue how they actually worked.

I treated AI like a magic vending machine—put words in, get answers out. Don't ask questions about the mechanics. Just trust the black box.

That changed when I came across a Reddit post that stopped me cold. The author described asking Gemini one simple question: *"Explain your thinking process to me."*

What came back wasn't corporate AI fluff. It was a technical breakdown that made me realize I'd been driving a Ferrari like it was a rental Camry.

According to Google's own metrics, less than 0.01% of users actually understand these mechanics. 

This article is your shortcut into that 0.01%.

---

## The "AI Illiterate" Reality Check

Let's be honest—none of these companies teach you how their models work. There's no "Start Here" manual. No "About Me" section explaining the cognitive architecture. Just a blinking cursor and the pressure to figure it out yourself.

Most of us learn by trial and error. We craft prompts through vibes and superstition. We say "please" to the chatbot (don't lie, you've done it) and hope for the best.

But here's the thing: **AI doesn't think like you do. At all.**

When you read "How do I scale my SaaS?", you understand meaning through context, intent, and prior knowledge. You picture growth curves, maybe a dashboard, perhaps that stressful pitch meeting you're prepping for.

When an AI reads the same sentence, it sees numbers. Just numbers. Your poetic question about scaling gets shredded into mathematical fragments, weighed against probability distributions, and reconstructed through statistical prediction.

Understanding this gap is what separates casual users from people who actually weaponize AI.

---

## The 5 Stages of an AI "Thought"

When you hit enter on a prompt, the model runs through a specific pipeline. Knowing these stages lets you engineer your inputs instead of guessing.

### Stage 1: Tokenization (The Deconstruction)

**What's happening:** Your text enters a digital shredder. The model doesn't see words—it sees tokens. These are fragments of words, subwords, or sometimes entire short words.

The sentence "Scaling a startup is hard" might become: ["Sc", "aling", " a", " start", "up", " is", " hard", "."]

Each token gets converted into a mathematical vector—a list of numbers that represent its position in a multi-dimensional space. This isn't poetic "AI imagination." This is linear algebra happening at nanosecond speed.

**The analogy:** Think of it like taking apart a Lego castle. You don't see the castle anymore—you see 10,000 individual plastic bricks, each with specific connection points and measurements. The model is going to weigh and measure each brick before deciding how to rebuild something from it.

**Why you should care:** Poorly structured prompts create token confusion. Long, meandering sentences dilute the signal. If your most important instruction gets buried in token #847, the model's attention has already drifted.

---

### Stage 2: Self-Attention (The Context Map)

**What's happening:** This is the core innovation that made modern AI possible. The model calculates "attention scores" between every single token in your prompt. It asks, mathematically: "How much should token #3 influence token #27?"

The algorithm uses three matrices—Query (Q), Key (K), and Value (V)—to map relationships:
- **Query:** What is this token looking for?
- **Key:** What does this token offer?
- **Value:** What information does this token actually carry?

The dot product of Q and K gives a similarity score. Softmax normalizes these into weights. Multiply by V, sum it up, and you have a context-aware embedding.

**The analogy:** Imagine drawing invisible strings between every word in your sentence. Some strings are thick steel cables (strong relationships), others are dental floss (weak connections). "Bank" gets a thick cable to "money" in financial contexts, but a thin string to "money" when you're talking about riverside fishing.

**Why you should care:** This is why prompt structure matters more than prompt length. Strategic placement of key terms in your first two sentences dramatically weights the output. Leading with context is mathematically superior to burying it.

---

### Stage 3: Context Retrieval (The Memory Landscape)

**What's happening:** The model doesn't "know" facts like you do. It has no database to query, no filing cabinet to open. Instead, it navigates a compressed mathematical landscape of probabilities learned during training.

Your prompt creates a specific "shape" in this high-dimensional vector space. The model finds regions where similar shapes exist and follows probability gradients toward likely completions.

**The analogy:** You're not looking up an answer in an encyclopedia. You're following a scent through a fog. The scent is strongest in certain directions based on the mathematical pattern of your prompt. The model follows its nose through statistical space.

**Why you should care:** If your prompt doesn't create the right "shape," you get generic outputs. Vague prompts land in the blurry middle of probability space where safe, average answers live. Specific prompts create distinct shapes that navigate to precise regions of the model's training distribution.

---

### Stage 4: Inference & Sampling (The Construction)

**What's happening:** Token by token, the model builds your response through autoregressive prediction. It doesn't write the whole paragraph at once. It predicts: "Given everything so far, what's the next most likely token?" Then it appends that token and repeats. One hundred times per second.

This is sophisticated statistical autocomplete, not reasoning. But the scale creates an emergent property that resembles cognition.

Temperature controls randomness—low temperature (0.1-0.3) gives deterministic, focused outputs. High temperature (0.8-1.0) introduces creative noise.

**The analogy:** It's like playing high-speed "complete the sentence" while also maintaining coherence across hundreds of future predictions. You're not just guessing the next word—you're guessing the next word in a way that makes the sentence after that, and the paragraph after that, statistically likely to be coherent.

**Why you should care:** This is why "thinking step by step" works. When you force the model to generate intermediate tokens (reasoning chains), those tokens act as anchors. The model has to commit to specific logic early, which constrains and improves the final output. Without these anchors, it can drift into contradictions.

---

### Stage 5: Alignment & Safety (The Filter)

**What's happening:** Before you see the text, it passes through behavioral conditioning layers. This isn't a simple keyword filter added at the end—it's integrated throughout generation via RLHF (Reinforcement Learning from Human Feedback) and Constitutional AI.

During training, human labelers ranked outputs. The model learned to predict these rankings. Now it generates text that would score highly on "helpfulness" and "harmlessness" metrics.

Constitutional AI (pioneered by Anthropic) uses explicit principles—like "choose the response least likely to enable illegal activity"—to guide AI self-critique and revision before training.

**The analogy:** Imagine an editor standing over the writer's shoulder—not just proofreading at the end, but influencing word choices in real-time based on a rulebook of principles.

**Why you should care:** Alignment can over-filter useful outputs. Understanding that "I cannot help with that" is often a statistical safety prediction—not a deterministic rule—helps you rephrase requests. The model isn't refusing because it "knows" something is wrong; it's refusing because the safety weights assigned high probability to "rejection" for that prompt shape.

---

## The ABC Framework: How to Actually Use This

Knowing the mechanism is useless without application. Here's the chronological order for crafting prompts that hack each stage:

### A — Anchor the Attention

**The rule:** Start with a clear role. The first 50 tokens buy disproportionate attention real estate because of how self-attention weights decay across long sequences.

**Template structure:**
```

Act as a [specific expert with niche specialization]. 
Your task is to [concrete deliverable]. 
Approach this using [named methodology or framework].

```

**Bad:** "Help me with marketing."
**Good:** "Act as a B2B SaaS growth lead who specializes in PLG (Product-Led Growth) for developer tools. Your task is to audit my onboarding flow. Approach this using the 'Aha Moment' framework from Mixpanel's growth team."

The second version creates a precise vector space location. The first version drifts into generic "marketing advice" probability soup.

---

### B — Define the Vector Early

**The rule:** Give context immediately. The more data in the first few "bricks" of the conversation, the more accurate the attention mechanism becomes.

**The Context Block technique:**
```

CONTEXT:
- Current ARR: 50K
- Target customer: Series A fintech CTOs  
- Constraint: Cannot use paid acquisition (burn rate critical)
- Previous attempt: Content marketing (0 conversions)
- Tone: Direct, no fluff, acknowledge reality

REQUEST: [Your actual ask]

```

This front-loading ensures the模型 navigates to the correct probability region immediately. Buried context gets lost in the attention decay.

---

### C — Force the Step-by-Step

**The rule:** Explicitly request intermediate reasoning. This generates tokens that serve as working memory.

**The Chain-of-Thought forcing:**
```

Before answering:
1. Identify the 3 most critical variables in my situation
2. List 2-3 edge cases I probably haven't considered  
3. Evaluate each approach against my constraints
4. Recommend the optimal path with explicit reasoning

Then provide your answer.

```

**Why this works:** Without step-by-step, the model tries to jump to the answer in one prediction pass. With it, you get reasoning chains that self-correct. The intermediate tokens act as anchors preventing drift.

---

## The Three Gold Rules of Token Economics

### Rule 1: Tokens Are Currency, Not Infinite

Every word "spends" computational focus. A 500-word preamble leaves less capacity for your actual solution. The model has a context window (usually 4K-128K tokens), but attention quality degrades regardless of window size.

**The test:** If I only read your first sentence, would I know exactly what you want? If not, rewrite.

---

### Rule 2: Context Windows Are Amnesic

AI has no memory of you between sessions. If you don't put it in the prompt, it doesn't exist. That brilliant insight from three messages ago? Gone from working memory unless you explicitly reference it.

**The fix:** Start major requests with a context summary block. Pretend you're briefing a new contractor who hasn't heard of your project.

---

### Rule 3: Iteration Beats Perfection

The first output is a draft. The second refines. The third nails it.

**The Correction Token technique:**
1. Get first response
2. Identify specific drift: "You focused on enterprise sales, but my constraint is SMB self-serve"
3. Restart with corrected prompt incorporating the fix

Don't try to course-correct within the same conversation if the model has gone down the wrong path. Start fresh—the accumulated context is now polluted.

---

## The "Meta" Prompts You Should Actually Use

Here are copy-paste templates based on the framework above:

### For Understanding the Process
```

Explain your thinking process step-by-step from tokenization through final output. 
Break down how you're weighing different parts of my prompt. 
Use analogies a non-technical person would understand. 
Then apply this understanding to solve: [INSERT REQUEST]

```

### For Debugging Attention
```

Before answering, tell me which 5 words or phrases in my prompt are receiving 
the highest attention weights in your processing. Explain why. 
Then provide your solution with that awareness: [REQUEST]

```

### For Token Optimization
```

Show me how you would tokenize this request mentally. 
Identify any ambiguities in my phrasing that could create token confusion 
or attention drift. Then answer optimized for clarity: [REQUEST]

```

### For Complex Reasoning
```

Think through this out loud. Generate 3 alternative interpretations of what 
I might be asking (cover edge cases). Address all 3 briefly, then provide 
your primary answer to my core intent with confidence scoring: [REQUEST]

```

---

## The Uncomfortable Implications

Understanding this process changes how you view AI outputs:

**Hallucinations aren't bugs; they're features of the architecture.** When the model follows a probability scent that leads to a region where accurate data is sparse, it confidently generates plausible-sounding tokens anyway. It's doing exactly what it's designed to do—predict likely sequences.

**Fluency ≠ Accuracy.** The model generates confident prose because confidence is correlated with fluency in its training data. It has no mechanism for "doubt" unless you explicitly prompt for uncertainty quantification.

**Your prompts are probabilistic steering, not deterministic commands.** You're not programming; you're navigating a statistical landscape with weighted suggestions.

---

## The Real "Top 1%" Skill

It's not about fancy prompting tricks. It's about **AI literacy**.

Most users are functionally illiterate—treating these systems like magic oracles. The top performers understand they're navigating probability distributions through token manipulation.

When you get garbage output, you don't blame the model. You diagnose:
- Was my tokenization creating ambiguity?
- Did I bury the context too deep?
- Did I fail to anchor the attention properly?
- Is this a temperature issue (too random) or a context issue (too vague)?

---

## What To Do With This Information

**This week:** Use the "Process Prompt" on your next important AI interaction. Watch how the output changes when the model has to make its reasoning explicit.

**This month:** Implement the ABC Framework on three critical workflows. Document the before/after quality difference.

**This quarter:** Build a personal prompt library using the Gold Rules. Share it with your team. Most organizations use AI at 10% capacity because nobody taught them the operating manual.

---

## Final Thought

I spent a year making decisions based on outputs I didn't understand, from a process I couldn't explain. That was dumb. But common.

The AI companies won't teach you this—they want usage volume, not user sophistication. Understanding the mechanism is your competitive advantage. While others vibe-check their prompts, you'll engineer results.

Knowledge isn't just power here. It's the difference between being the person who asks AI for answers, and the person who knows how to make AI give the right answers.

---

**Further Reading:**
- "Attention Is All You Need" (Vaswani et al., 2017) - The original transformer paper
- Constitutional AI (Anthropic, 2022) - Technical breakdown of safety alignment
- "Deep Reinforcement Learning from Human Preferences" (Christiano et al., 2017) - RLHF foundations

**Try this:** Send this article to that one colleague who still treats AI like a magic 8-ball. They'll hate you for it, then thank you later.
