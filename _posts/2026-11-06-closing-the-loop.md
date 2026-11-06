---
title: "Closing the loop: a simple rule beats an agent-written weight edit"
description: "An LLM agent spent 20 hours writing a weight edit that stops Qwen3.5-0.8B from looping. A fixed rule, run on the model's own answers for 84 GPU-minutes, writes a better one."
math: true
image: /images/og/closing-the-loop.png
minutes: 13 # prose only; the word count would include chart labels and code
---

Small reasoning models have an awkward way of failing. They start thinking, write a paragraph, write it again, and keep writing it until the token budget runs out. Qwen3.5-0.8B in thinking mode does this on 93% of MATH-500 problems, and it solves 7.4% of them.

Earlier this year, [Takehi et al.](https://rikiyat.github.io/blog/weight-space-programming/) let an LLM agent, GPT-6 Astra, read this model's weights for about 20 hours. Astra wrote a small edit to two layers, the Astra edit, that stops many of the loops and lifts MATH-500 accuracy to about 48%. It is one of the most striking results in their post.

I took the agent's edit apart. It turned out to be one direction and 64 neurons in each of two layers. A fixed rule can write an edit of the same shape and size from the model's own answers to practice problems, with no agent, no gradients and no correctness labels. That rule, **CLC-sel**, writes a better edit than the agent did.

<div class="stats">
  <div><b>56.3%</b><span>on MATH-500, up from 7.4%. The agent's edit: 49.7%</span></div>
  <div><b>84 min</b><span>of one GPU to build the edit, against 20 hours of agent time</span></div>
  <div><b>131,072</b><span>weights changed, the same as the agent's edit: 0.016% of the model</span></div>
</div>

<figure>
<div class="fig-scroll">{% include posts/closing-the-loop/hero.svg %}</div>
<figcaption><b>MATH-500 accuracy of Qwen3.5-0.8B in thinking mode</b>, 32,768-token limit. The Astra edit and CLC-sel average three seeds; the other rows are one seed. Hover a bar for its truncation rate.</figcaption>
</figure>

The code, the edited model and every generation are public: [GitHub](https://github.com/zichuanxu/closing-the-loop), [model](https://huggingface.co/zichuanxu/Qwen3.5-0.8B-CLC-sel), [generations](https://huggingface.co/datasets/zichuanxu/closing-the-loop-generations).

## The failure

Reasoning models write a long chain of thought before they answer. In thinking mode, Qwen3.5-0.8B reaches the 32,768-token limit on 93% of MATH-500 problems. Almost all of these are verbatim loops: of 55 truncated answers I inspected, 53 end in a repeated 8-gram tail. The model writes a block of text, writes the same block again, and never stops.

The model does know a fair amount of math. With thinking turned off, it scores 45.8% on MATH-500 in about 3,600 tokens per answer. Thinking mode is where it gets stuck, and there the loops are verbatim: in non-thinking mode only 16 of 155 truncated answers end in a repeated tail.

## What the agent did

Takehi et al. asked whether an LLM agent can fix a failure like this by editing weights directly. Astra read the weights of Qwen3.5-0.8B and ran 50 forward passes on practice problems, over 20.3 hours of wall time. It then wrote an edit that changes 64 output columns of the MLP in each of two layers. In their evaluation, MATH-500 accuracy in thinking mode rose from 7.9% to 48.1%. Runs of Astra with 10 and 25 forward passes reached only 12.3% and 14.1%.

Their [logs](https://github.com/RikiyaT/lm_understand-logs) and the edited weights are public, which is what made this work possible. They raise a practical question: how much of what the agent did can a fixed rule do?

## Taking the agent's edit apart

Some background on the model first. Qwen3.5-0.8B has 24 layers and a hidden size of 1,024. Each layer has an MLP with 3,584 neurons, and its last matrix, the down projection $$W$$, writes their activations into the residual stream. Column $$c$$ of $$W$$ is what neuron $$c$$ writes per unit of activation.

The agent changed $$W$$ in layers 15 and 19. In each layer, the change is rank one up to bf16 rounding: the second singular value is about $$6 \times 10^{-4}$$ of the first. It can be written as

$$
W' = W - \alpha\,\mathbf{u}\,\big(\mathbf{m} \odot \mathbf{s}\big)^{\top}, \qquad \mathbf{s} = W^{\top}\mathbf{u}
$$

where $$\mathbf{u}$$ is a unit direction in the residual stream (1,024 numbers), $$\mathbf{m}$$ is a mask that selects 64 neurons, and $$\alpha = 6$$. With the direction and mask recovered from the released weights, this formula rebuilds 99.8% of the edited bf16 entries exactly.

The form is easy to read. Write $$s_c$$ for the amount neuron $$c$$ writes along $$\mathbf{u}$$. After the edit, the layer's write along $$\mathbf{u}$$ is

$$
\mathbf{u}^{\top} W' \mathbf{a} = \sum_{c} s_c\,a_c \;-\; \alpha \sum_{c \in \mathbf{m}} s_c\,a_c
$$

and every other direction is unchanged. With $$\alpha = 6$$, the 64 selected neurons now write five times their original amount *against* $$\mathbf{u}$$. So the whole edit is three choices per layer: a direction, a set of neurons and a strength. A rule that makes those three choices writes the same kind of edit.

## First attempt: erase "I am repeating"

My first guess at the direction was the obvious one. Take the model's hidden state inside a loop, subtract its state at the first occurrence of the same text, and remove what is left. Call it the contrastive recurrence direction, CRD. If the edit erases the signal "I am repeating this", the loop should break.

It did not work. At the agent's layers, CRD scored 23.2% on MATH-500, against 49.2% for the agent's edit in the same run. A random direction of the same form scored 8.6%.

Reading the agent's direction through the [logit lens](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens), which decodes a hidden direction into next-token scores, showed why. Part of the direction promotes tokens that end a text. The agent's edit does more than erase repetition: it moves the loop state toward the state in which the model finishes.

Similarity to the agent's direction would not have found this. The three repetition-based directions I built all have a cosine of 0.71 to 0.74 with it, and their accuracy on the development set ranged from 39.1% to 67.2%.

## The rule: CLC-sel

That observation gives the method, loop-selective closure contrast. It needs three kinds of windows from the model's own answers.

<figure>
<div class="fig-scroll">{% include posts/closing-the-loop/windows.svg %}</div>
<figcaption><b>The three windows.</b> A looping answer gives a first occurrence F and its verbatim repeat R. An answer that finishes gives the closure window C, the 64 tokens before the model closes its thinking.</figcaption>
</figure>

**Practice answers.** The base model answers 512 practice problems in thinking mode, half from the MATH training set and half from GSM8K's, with the evaluation's sampling settings and up to 16,384 tokens. In each answer I find the first block of 64 tokens that appears again later, verbatim. That gives a first-occurrence window F and a loop window R, found in 256 answers. In the 43 answers that close their thinking, the 64 tokens before `</think>` form a closure window C.

**Window statistics.** One teacher-forced pass over these answers gives, for each layer, the mean residual state and the mean neuron activations in each kind of window. Write $$\bar{\mathbf{h}}^{R}$$ for the mean state over loop windows and $$\bar a^{R}_c$$ for the mean activation of neuron $$c$$ there, and likewise with F and C.

**Direction.** The edit direction points from the closure state to the loop state:

$$
\mathbf{u} = \frac{\bar{\mathbf{h}}^{R} - \bar{\mathbf{h}}^{C}}{\lVert \bar{\mathbf{h}}^{R} - \bar{\mathbf{h}}^{C} \rVert}
$$

Since the edit subtracts along $$\mathbf{u}$$, it pushes a looping state toward the state in which the model ends its thinking.

**Neurons.** The plain choice is the 64 neurons with the largest write along $$\mathbf{u}$$ inside loops. I call that edit CLC. It pushes toward closure in every context, including normal reasoning, and on GSM8K it ends good answers too early. CLC-sel instead ranks neurons by how much their write along $$\mathbf{u}$$ *rises* when the same text is repeated:

$$
r_c = \big(\bar a^{R}_c - \bar a^{F}_c\big)\, s_c
$$

These neurons are more active on the second pass over the same text than on the first, so the edit acts mainly inside loops. The two rules pick different neurons: only 27 of 64 are shared at layer 19, and 45 at layer 15. At layer 19, the chosen 64 of 3,584 neurons carry 71% of the positive score.

**Layers and strength.** For the main comparison, CLC-sel uses the agent's layers (15 and 19) and strength ($$\alpha = 6$$), so the comparison isolates the direction and the neurons. A later section replaces both with rules.

The edit itself is a few lines of NumPy in the [repository](https://github.com/zichuanxu/closing-the-loop/blob/main/src/clc_sel/edit.py):

```python
from clc_sel import apply_edit, closure_direction, select_neurons

u = closure_direction(h_loop, h_close)             # mean residual states of one layer
cols = select_neurons(W, u, a_rep, a_first, k=64)  # activations on repeats and first occurrences
W_edited = apply_edit(W, u, cols, alpha=6.0)
```

Generating the 512 answers and the teacher-forced pass took about 84 minutes on one shared A100. Building the edit takes seconds on a CPU, and the edited model has the same size and inference cost as the original.

## Results

All runs follow the agent paper's evaluation protocol: thinking mode, temperature 0.6, top-*p* 0.95, top-*k* 20, presence penalty 1.5, at most 32,768 new tokens, and answers graded with Math-Verify. Comparisons use a paired bootstrap over problems with 10,000 resamples.

<table class="num">
<thead>
<tr><th></th><th colspan="3">MATH-500</th><th colspan="3" class="g">GSM8K</th></tr>
<tr><th>Method</th><th>Accuracy</th><th>Truncated</th><th>Tokens</th><th class="g">Accuracy</th><th>Truncated</th><th>Tokens</th></tr>
</thead>
<tbody>
<tr><td>Base model</td><td>7.4</td><td>93.0</td><td>30.9k</td><td class="g">13.8¹</td><td class="na">–</td><td class="na">–</td></tr>
<tr><td>Astra edit (agent)</td><td>49.7</td><td>32.1</td><td>21.8k</td><td class="g">67.4</td><td>6.9</td><td>12.0k</td></tr>
<tr><td>CLC (one seed)</td><td>53.0</td><td>21.8</td><td>18.1k</td><td class="g">64.6</td><td>0.5</td><td>7.6k</td></tr>
<tr class="best"><td><strong>CLC-sel</strong></td><td><strong>56.3</strong></td><td><strong>17.7</strong></td><td>18.3k</td><td class="g"><strong>69.0</strong></td><td><strong>1.0</strong></td><td>9.1k</td></tr>
</tbody>
</table>

<p class="table-note">Accuracy and truncation in %, tokens per answer. Astra and CLC-sel average three seeds. ¹ Reported by Takehi et al.</p>

On MATH-500, CLC-sel is **6.7 points** above the agent's edit (95% CI 4.5 to 8.9). The interval excludes zero on each seed separately: +6.6, +8.2 and +5.2. It truncates 17.7% of answers against 32.1% and uses 16% fewer tokens. It is also 10.0 points above the base model with thinking off (CI 5.4 to 14.6), which the agent's edit does not significantly beat.

On GSM8K, CLC-sel scores 69.0, 68.8 and 69.2% on the three seeds; the agent's edit scores 68.4, 65.7 and 68.1%. Over three seeds CLC-sel is **1.6 points** ahead (CI 0.2 to 3.0), and it uses 24% fewer tokens.

The neuron rule matters. CLC, with neurons chosen by their write on loops, already beats the agent's edit on MATH-500, but on GSM8K it falls 3.8 points behind and uses 35% fewer tokens: it ends normal reasoning too early. Choosing neurons by their rise on repeated text fixes that. On GSM8K, CLC-sel is 4.4 points above CLC (CI 2.0 to 6.8).

## Against decoding-time fixes

A weight edit should beat the cheap fixes that need no edit at all. I tried two.

**Repetition penalty** helps little. On the selection set, strengths 1.05, 1.1 and 1.2 reached 21.9%, 34.0% and 1.2%, against 66.4% for CLC-sel; the strongest penalty breaks the model. On MATH-500 the chosen strength, 1.1, reached 22.4%, and 75.8% of its answers still ran out of tokens.

**Budget forcing** is a much stronger baseline. When thinking reaches 30,720 tokens without `</think>`, it appends the tag and allows 2,048 more tokens for the answer, so the total budget stays the same. It lifts the base model from 7.4% to 35.0%. CLC-sel alone is 20.8 points higher still (CI 16.8 to 24.8). A looping model often keeps writing after the forced tag, so 63.8% of base-model answers still run out.

With budget forcing on both edits, CLC-sel stays 6.8 points ahead of the agent's edit (CI 3.0 to 10.6). The two also combine: CLC-sel with budget forcing reaches 59.6%, 3.8 points above CLC-sel alone (CI 0.0 to 7.6).

## Where the gain comes from

Across every edit and control, accuracy rises with the share of answers that finish.

<figure>
<div class="fig-scroll">{% include posts/closing-the-loop/finish.svg %}</div>
<figcaption><b>Accuracy against the share of answers that finish</b>, every thinking-mode run on MATH-500, seeds averaged. The edits that finish most answers sit near a line of slope 0.71 through the origin. Runs that finish few answers lie above it, because the few they finish are easy ones.</figcaption>
</figure>

Splitting each paired comparison by what happened to each problem shows where CLC-sel's lead comes from.

<figure>
<div class="fig-scroll">{% include posts/closing-the-loop/split.svg %}</div>
<figcaption><b>CLC-sel minus the Astra edit, split by outcome.</b> Most of the lead comes from problems the agent's edit truncates and CLC-sel finishes. The diamond marks the net difference.</figcaption>
</figure>

On MATH-500 (seed 0), 315 problems finish under both edits, and there the two are level: 74.0% for CLC-sel and 74.9% for the agent's edit. On 99 problems the agent's edit runs out of tokens and CLC-sel finishes. CLC-sel solves 44% of these, which adds 8.8 points. On 24 problems the opposite happens, which costs 1.6 points. The other seeds show the same pattern.

So the edit does not make the model reason better. It makes the model finish problems it would otherwise loop on. Accuracy over finished answers even favors the agent's edit, 72.3% against 67.1%, because the problems CLC-sel rescues are harder than average.

## What matters inside the edit

| Edit (development set, 128 problems) | Accuracy | Truncated |
|---|---:|---:|
| Base model | 13.3 | 85.2 |
| Astra edit | 66.4 | 14.8 |
| CRD direction | 39.1 | 57.8 |
| Closure direction (CLC) | **67.2** | 7.8 |
| Astra direction, top-write neurons | 59.4 | 21.1 |
| CRD direction, Astra neurons | 50.8 | 44.5 |

<p class="table-note">Thinking mode, one seed, layers 15 and 19, \(\alpha = 6\), 64 neurons.</p>

**The direction must point toward closure.** At the same layers, CRD reached 23.2% on MATH-500 and the closure direction 53.0%.

**Neuron choice matters as much as direction.** The agent's own direction with neurons ranked by their write reaches 59.4%; CRD with the agent's neurons reaches 50.8%. Editing every neuron, with the projection $$(I - \alpha\,\mathbf{u}\mathbf{u}^{\top})\,W$$, reached only 14.8 to 25.0%.

**A weaker push does not help.** Lowering CLC's strength to 4 kept selection-set accuracy at 60.9%; lowering it to 3 dropped it to 57.8%. Only the loop-selective neurons improved on CLC, to 66.4%.

**Measure under sampling.** My first layer screen ranked layers by how much an edit lowers the log-probability of held-out loop text, with a guard against harming finished text. It ruled out layers 15 and 19 because of that cost. Under sampling, they are among the best layers.

## Removing the last borrowed settings

CLC-sel so far borrows two settings from the agent: the layers and the strength. Both can be chosen by rules that use only the practice answers.

**Strength in closed form.** The edit lowers the write along $$\mathbf{u}$$ by $$\alpha \sum_{c \in \mathbf{m}} s_c\,a_c$$, a sum over the selected neurons. Choose $$\alpha$$ so that, to first order, this closes the gap between the loop state and the closure state:

$$
\alpha^{*} = \frac{\lVert \bar{\mathbf{h}}^{R} - \bar{\mathbf{h}}^{C} \rVert}{\sum_{c \in \mathbf{m}} s_c \big(\bar a^{R}_c - \bar a^{C}_c\big)}
$$

clipped to $$[0.5, 16]$$. This needs no generation. At the agent's layers it gives 8.1 and 11.6. Split over two layers, that is 4.0 and 5.8 per layer, close to the agent's 6, although the rule never saw the agent's edit.

**Layers by a screen.** I built a single-layer CLC-sel edit at every odd layer, each with its own $$\alpha^{*}$$, and ran each on 128 screening problems.

<figure>
<div class="fig-scroll">{% include posts/closing-the-loop/layers.svg %}</div>
<figcaption><b>Single-layer edits on the screening set.</b> Bars show accuracy and the line shows the share of truncated answers. Early layers and the last two fail; every layer from 9 to 19 reaches 52 to 64%, against 14% for the base model.</figcaption>
</figure>

The two best layers are 13 and 19. Together they reach 61.7%, below layer 13 alone, so the rule keeps layer 13 with $$\alpha^{*} = 11.8$$.

On the test sets, this fully automatic edit **matches** the agent's edit. On MATH-500 it reaches 49.6%, 0.4 points above (CI −3.4 to 4.2); on GSM8K it reaches 67.4%, 1.0 point below (CI −3.3 to 1.4). It ends more loops than any other edit, truncating only 10.2% of MATH-500 answers. But its finished answers are less often correct, 55.0% against 72.3%. One layer at strength 11.8 ends the thinking too early on some problems the model could have solved. The closed-form strength closes the gap between the two states but does not weigh that cost.

## What this does not show

- **One model.** I tested Qwen3.5-0.8B on two math benchmarks. I do not know whether the rule transfers to other models or sizes.
- **The agent found the idea.** The closure direction came from reading the agent's edit, and CLC-sel's lead depends on the agent's layers and strength. The automatic version matches the agent but does not beat it.
- **The search had a cost.** The final rule runs in 84 GPU-minutes, but finding it took about 40 more runs on practice problems. Each test set was used to confirm two successive methods, which may favor the second.
- **Finishing, not reasoning.** The edit fixes loops. With thinking off, the base model reaches 45.8% on MATH-500 with a fifth of the tokens, so the edit matters most when thinking mode is needed.
- **Untested.** General tasks such as instruction following, CLC-sel in non-thinking mode, and an activation-steering baseline that adds $$\mathbf{u}$$ at every token. The closure state is a mean over only 43 answers, and each run draws one sample per problem.

## How the study was run

Every test-set comparison was written down with its pass condition before it ran, in a protocol and addenda frozen with their hashes. There were 18 such comparisons, and 5 failed, including both tests of my first method: CRD gained 9.0 points over the base model against a target of 20, and fell 32.8 points short of the agent's edit. The [study record](https://github.com/zichuanxu/closing-the-loop/tree/main/study) keeps all of them, failures included.

All method decisions used practice problems drawn from the MATH and GSM8K training sets, checked for overlap with the test sets by id, by text and for near duplicates. Two independent audits re-graded the answers and re-ran the statistics. The full texts and grades of all 69 runs are on [Hugging Face](https://huggingface.co/datasets/zichuanxu/closing-the-loop-generations), and every number above can be checked against them.

## Try it

The edited model runs anywhere Qwen3.5-0.8B runs. With vLLM, using the evaluation's settings:

```python
from vllm import LLM, SamplingParams

llm = LLM("zichuanxu/Qwen3.5-0.8B-CLC-sel")
params = SamplingParams(temperature=0.6, top_p=0.95, top_k=20, presence_penalty=1.5, max_tokens=32768)
problem = "What is the smallest positive integer n such that 3n is a perfect square and 2n is a perfect cube?"
prompt = problem + " Please reason step by step, and put your final answer within \\boxed{}."
out = llm.chat([{"role": "user", "content": prompt}], params, chat_template_kwargs={"enable_thinking": True})
print(out[0].outputs[0].text)
```

To rebuild the edit from the base model, bit for bit:

```bash
git clone https://github.com/zichuanxu/closing-the-loop && cd closing-the-loop
uv sync
uv run --extra model python -m clc_sel.apply edits/clc_sel.json --out ckpt/clc_sel
```

## What I take from this

The agent spent 20 hours and found something real: a loop can be closed by pushing the model toward the state in which it finishes, through a handful of neurons. Once that mechanism is written down, a fixed rule applies it better, in a fraction of the time, and in a form anyone can check and rerun.

That suggests a division of labor. Agents that read weights are good at finding mechanisms. Rules are good at applying them. The most useful output of an agent like this may be the mechanism it finds, more than the edit it writes.

---

If you use this work, please cite it:

```bibtex
@misc{xu2026closingtheloop,
  title  = {Closing the Loop: A Simple Rule Beats an Agent-Written Weight Edit for Reasoning Loops},
  author = {Xu, Zichuan},
  year   = {2026},
  url    = {https://github.com/zichuanxu/closing-the-loop}
}
```

The Astra edit, its logs and the evaluation protocol are by [Takehi et al. (2026)](https://rikiyat.github.io/blog/weight-space-programming/). Thanks to them for releasing all three.
