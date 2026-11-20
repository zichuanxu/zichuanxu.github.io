---
title: "How Lauren Tan learned to trust an overnight merge"
description: "Notes from AI Engineer CODE 2026 on what the Grok Bot team built before it let coding agents test releases and merge their own fixes."
---

In October, Lauren Tan shipped 3,127 pull requests. Many went into production while she was asleep. The detail that caught my attention in her AI Engineer talk was how long it took her to feel comfortable with that arrangement: about six months. By then the Grok Bot team had changed what an agent could import, given it a way to operate the desktop app, and taught it how to compare a release with the build users already had. [Lauren Tan, *All Code Is Slop (Except Mine)* — recording and slides](https://ai.engineer/talks/O_zcc6Xl12g-all-code-is-slop-except-mine).

## Which decisions should a reviewer have to make twice?

Tan opens with an inverted pyramid. Its widest layer is the codebase itself. A framework API can settle a design question for everyone who calls it. One layer down, a lint rule can catch a mistake while the author still has the offending line open. Closer to the tip are questions that need a running system, a written explanation, or someone's judgment. I read the diagram as a way to spend the next hour of engineering time. If three reviewers have already given the same advice, where could the fourth author encounter it before opening a PR?

<figure>
  <a href="https://ai.engineer/api/talk-essay-media/c094802d6073e6ab31aad6a7406c807a88afd34efea9b445be9196cc365761dc"><img src="https://ai.engineer/api/talk-essay-media/c094802d6073e6ab31aad6a7406c807a88afd34efea9b445be9196cc365761dc" alt="Inverted pyramid with codebase and static analysis at the wide end and human review at the narrow, higher-cost end." style="display:block;width:100%;height:auto" loading="lazy"></a>
  <figcaption>Tan's inverse trust pyramid. The downward arrow marks the rising cost of catching a problem. Slide from Lauren Tan at AI Engineer CODE 2026. <a href="https://www.youtube.com/watch?v=O_zcc6Xl12g&amp;t=122s">Watch at 2:02</a>.</figcaption>
</figure>

Take a keystroke in an Electron app. The renderer needs time to process the input and draw the result. At Cursor, agents had imported main-process code into the renderer, where a long task could leave the interface stuttering. In Dune, Grok Bot's desktop framework, the two processes have separate directories. A dependency check rejects imports across that boundary. Shared types have a home of their own. An agent can discover the mistake on its first attempt, even if nobody who remembers the original slowdown is awake. [Dune's process boundaries, 6:09](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=369s).

Tan also showed what happens when the repository teaches the opposite lesson. At Cursor, deferring an update with a timer fixed a flicker. The patch came with a comment explaining why the delay was necessary. The next author found a plausible, approved example to copy. Within weeks the pattern had reached a shared module, and Tan counted 183 timers. Creating and discarding them added garbage-collection work that users could feel. Her order of operations for an existing codebase is worth borrowing: block new instances first, then clean up the examples that keep inviting imitation. [The timer history, 7:22](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=442s).

## What would the user see?

A dependency check can protect the renderer. It can't tell whether clicking Settings opens the right panel. Grok Bot gives its agents a feature map written from the user's point of view and a reusable command-line driver for the running application. In Tan's slide, the agent can click Settings by its accessible name, read the resulting interface state, and save a screenshot. Someone reviewing the patch can follow the same path.

<figure>
  <a href="https://ai.engineer/api/talk-essay-media/0a57dd9b23616685acb085340c05e2583095347dc8f0ddb0fea3b4f5943aa210"><img src="https://ai.engineer/api/talk-essay-media/0a57dd9b23616685acb085340c05e2583095347dc8f0ddb0fea3b4f5943aa210" alt="A feature map sits beside three commands that open Settings, inspect the interface, and save a screenshot." style="display:block;width:100%;height:auto" loading="lazy"></a>
  <figcaption>The map identifies the feature the user meant. The commands give the agent a repeatable way to reach it. Slide from Lauren Tan at AI Engineer CODE 2026. <a href="https://www.youtube.com/watch?v=O_zcc6Xl12g&amp;t=601s">Watch at 10:01</a>.</figcaption>
</figure>

The harder question is what one successful run leaves out. A notification can arrive on two devices in different orders. A recording shows one of those orders. The team modeled notification delivery in TLA+ to explore others and check whether a required property still held. For a custom virtualized list, they used Lean to reason about algorithm properties related to scroll jitter. Both examples explain why Tan says she spends most of her tokens on verification. The specific 70% figure she shows comes from another engineer, Cindy Sridharan. [Verification experiments, 10:48](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=648s) · [The token breakdown, 11:51](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=711s).

## Fifty findings, three new regressions

Near the end of the talk, Tan shows what happens when Grok Bot cuts a release. The release starts a cloud project. Agents exercise the new build, try combinations of user actions, and can open and merge fixes for the bugs they find. In the Linux run on screen, the agents reported 50 distinct findings. When they checked the previous build, 47 of those problems were already there. That left three newly observed regressions for the release team to inspect first. The old build answered a question that another hour of testing the new one couldn't: which failures arrived with this release? [Release workflow and Linux results, 15:11](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=911s).

The October numbers deserve the same care. Tan's 3,127 PRs were part of the team's 10,926. The team's revert chart reads 0.47%. Tan speaks about reverted PRs, while the slide labels reverted commits, and a bug repaired in a follow-up patch can escape either count. I found the client measurements easier to interpret. From May to the talk, the team measured cold startup falling from 2,304 to 1,395 milliseconds and median typing time in a long conversation falling from 8.4 to 2.9 milliseconds. Idle memory went the other way, from 488 to 545 MiB. Those measurements describe changes someone could experience on the same desktop. [Team delivery, reverts, and client performance, 13:32](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=812s).

The first thing I'd borrow for my own projects is that old-build comparison. For a report that switching conversations leaves the wrong row highlighted, I'd ask for the same A → B → A sequence on both revisions, with the title, selected row, and messages visible. If the old build never shows the bug, a clean recording of the patch tells me little. If the first recording captures the failure and the second shows it gone, I have a reason to merge that particular change. That's a small enough version of Tan's overnight workflow to try on one PR.
