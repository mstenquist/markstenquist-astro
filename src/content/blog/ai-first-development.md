---
title: 'Why I Build AI-First Now'
description: 'After 15 years of web development, AI has fundamentally changed how I approach every new project. Here is what that shift looks like in practice.'
pubDate: 'Mar 15 2025'
---

For fifteen years I followed roughly the same process: gather requirements, sketch wireframes, write code, ship, iterate. The tools changed (jQuery to React, REST to GraphQL, Heroku to Vercel) but the loop stayed the same.

That loop is broken now, and I mean that in the best way.

## What "AI-first" actually means

It doesn't mean slapping a chatbot onto an existing product. It means the AI is the product's core engine, not a feature bolted on after launch.

With [TallyQuote](https://tallyquote.com), a client describes the job they need done. The AI drafts a proposal for the contractor, they adjust what they want, and send it in minutes. The client signs, suggests a time, and the contractor has a booked job. Without the language model, there is no product. The entire value proposition collapses.

This is different from "AI-enhanced." An AI-enhanced invoicing tool might auto-suggest descriptions. An AI-first tool starts from the assumption that proposals should draft themselves.

## What changes in practice

**Architecture decisions happen earlier.** You need to think about token budgets, latency, and failure modes before writing your first component. A streaming response that takes 4 seconds feels fast. A blocking request that takes 4 seconds feels broken.

**Prototyping is absurdly fast.** I can go from idea to working proof-of-concept in a day. Not a mockup, a functional prototype that processes real input. The gap between "I wonder if this would work" and "let me show you" has collapsed.

**The hard problems shift.** The challenge isn't "can we build this" anymore. It's "how do we make this reliable enough that people trust it with their business?" Prompt engineering, output validation, graceful degradation: these are the new hard problems.

## The tools I reach for

My current stack for AI-first projects:

- **Next.js + TypeScript** for the application shell
- **Claude API** for complex reasoning tasks (estimates, proposals, analysis)
- **Vercel AI SDK** for streaming responses
- **Postgres (Neon)** for structured data
- **Stripe** for billing

The surprising thing is how little the frontend stack has changed. React is still React. The revolution is happening in what sits between the user's input and the rendered output.

## What I got wrong early on

I initially treated AI outputs as trusted data. They're not. They're suggestions that need validation, formatting, and sometimes correction. Building that validation layer (the part that catches when the model hallucinates a line item or misinterprets a measurement) is where the real engineering happens.

The contractors using TallyQuote don't care about the AI. They care that proposals go out fast and clients book on the spot. The technology is invisible when it works, and that's the goal.
