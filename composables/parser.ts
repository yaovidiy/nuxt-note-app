const rules = [
  // Headlines
  [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
  [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
  [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
  [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
  [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
  [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],

  // Blockquotes
  [/\>\>\> ([^\n]+)/g, '<blockquote><blockquote><blockquote>$1</blockquote></blockquote></blockquote>'],
  [/\> \> \> ([^\n]+)/g, '<blockquote><blockquote><blockquote>$1</blockquote></blockquote></blockquote>'],
  [/\>\> ([^\n]+)/g, '<blockquote><blockquote>$1</blockquote></blockquote>'],
  [/\> \> ([^\n]+)/g, '<blockquote><blockquote>$1</blockquote></blockquote>'],
  [/\> ([^\n]+)/g, '<blockquote>$1</blockquote>'],

  // Text decorations
  [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
  [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  [/__([^_]+)__/g, "<b>$1</b>"],
  [/_([^_`]+)_/g, "<i>$1</i>"],
  [/([^\n]+\n?)/g, "<p>$1</p>"],

  // Link
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>',
  ],

  // Code
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<pre><code>$2</code></pre>',
  ],

  // List
  [/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>"],
  [/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>"],
  [/([^\n]+)(\-)([^\n]+)/g, "<ul><li>$3</li></ul>"],

  // Image
  [
    /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
    '<img src="$2" alt="$1" title="$3" />',
  ],


]

export function useParse(mardown: string): string {
  if (!mardown) {
    return ''
  }

  let html = JSON.parse(JSON.stringify(mardown))

  rules.forEach(([rule, template]) => {
    html = html.replace(rule, template)
  })

  return html
}