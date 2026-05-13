import { describe, it, expect } from 'vitest';
import { OutlineSchema } from '../stages/outline.js';

describe('OutlineSchema', () => {
  it('accepts a valid outline', () => {
    const valid = {
      h2Sections: [
        { title: 'Définition', intent: 'définir le concept', wordsTarget: 300 },
        { title: 'Coûts', intent: 'lister', wordsTarget: 400 },
        { title: 'Exemples', intent: 'illustrer', wordsTarget: 400 },
        { title: 'FAQ', intent: 'répondre aux questions', wordsTarget: 300 },
      ],
      totalWordsTarget: 1800,
    };
    expect(() => OutlineSchema.parse(valid)).not.toThrow();
  });

  it('rejects fewer than 4 sections', () => {
    expect(() => OutlineSchema.parse({
      h2Sections: [{ title: 'A', intent: 'x', wordsTarget: 100 }],
      totalWordsTarget: 1800,
    })).toThrow();
  });

  it('rejects out-of-range word counts', () => {
    expect(() => OutlineSchema.parse({
      h2Sections: Array(5).fill({ title: 'A', intent: 'x', wordsTarget: 100 }),
      totalWordsTarget: 500,
    })).toThrow();
  });
});
