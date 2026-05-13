const INJECTION_PATTERNS: RegExp[] = [
  /<\|im_start\|>/gi,
  /<\|im_end\|>/gi,
  /<\/?(system|user|assistant)>/gi,
  /\[\[INST\]\]/gi,
  /\[\[\/INST\]\]/gi,
  /\bignore (?:all )?(?:previous|prior) instructions?\b/gi,
];

export function sanitizeUserText(input: string, maxLength = 2000): string {
  let cleaned = input.normalize('NFKC');
  for (const pattern of INJECTION_PATTERNS) {
    cleaned = cleaned.replace(pattern, '[REDACTED]');
  }
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  if (cleaned.length > maxLength) cleaned = cleaned.slice(0, maxLength) + '…';
  return cleaned;
}
