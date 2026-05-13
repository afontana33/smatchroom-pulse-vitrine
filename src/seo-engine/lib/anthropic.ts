import Anthropic from '@anthropic-ai/sdk';
import { logger } from './logger.js';

export interface UsageTotals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
}

const PRICE_PER_MTOK = {
  'claude-sonnet-4-6':         { input: 3.0, output: 15.0, cacheRead: 0.30, cacheWrite: 3.75 },
  'claude-haiku-4-5-20251001': { input: 1.0, output: 5.0,  cacheRead: 0.10, cacheWrite: 1.25 },
} as const;

export type ModelId = keyof typeof PRICE_PER_MTOK;

export type SystemBlock = {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
};

export function ephemeralCacheBlock(text: string): SystemBlock {
  return { type: 'text', text, cache_control: { type: 'ephemeral' } };
}

export function textBlock(text: string): SystemBlock {
  return { type: 'text', text };
}

export class UsageTracker {
  totals: UsageTotals = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };
  usd = 0;

  record(model: ModelId, usage: Anthropic.Messages.Usage): void {
    const u = usage as Anthropic.Messages.Usage & {
      cache_read_input_tokens?: number | null;
      cache_creation_input_tokens?: number | null;
    };
    const i = u.input_tokens ?? 0;
    const o = u.output_tokens ?? 0;
    const cr = u.cache_read_input_tokens ?? 0;
    const cw = u.cache_creation_input_tokens ?? 0;
    this.totals.inputTokens += i;
    this.totals.outputTokens += o;
    this.totals.cacheReadTokens += cr;
    this.totals.cacheCreationTokens += cw;
    const p = PRICE_PER_MTOK[model];
    this.usd += (i * p.input + o * p.output + cr * p.cacheRead + cw * p.cacheWrite) / 1_000_000;
  }

  snapshot() {
    return { ...this.totals, usd: this.usd };
  }
}

const _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface LLMClient {
  invoke(args: { system: SystemBlock[]; user: string; maxTokens?: number }): Promise<string>;
}

export function makeClient(model: ModelId, tracker: UsageTracker): LLMClient {
  return {
    async invoke({ system, user, maxTokens = 4096 }) {
      const response = await _client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature: 0.4,
        system,
        messages: [{ role: 'user', content: user }],
      });
      tracker.record(model, response.usage);
      logger.debug({ model, usage: tracker.snapshot() }, 'llm call complete');
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      return text;
    },
  };
}
