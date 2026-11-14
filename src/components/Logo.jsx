// Original logo: a bow inside a blush badge with gold outline.
// aria-hidden: the café name beside it already provides the text.
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill="#f8e4e6" stroke="#b8975a" strokeWidth="1.5" />
      <path d="M24 24 C16 14 8 16 9 24 C8 32 16 34 24 24 Z" fill="#9e4a5b" />
      <path d="M24 24 C32 14 40 16 39 24 C40 32 32 34 24 24 Z" fill="#9e4a5b" />
      <circle cx="24" cy="24" r="4" fill="#7f3a49" />
      <path d="M22 28 L18 38 M26 28 L30 38" stroke="#7f3a49" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}