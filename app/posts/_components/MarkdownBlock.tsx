import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';

// Inline code component for single backticks
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        backgroundColor: '#263E52',
        padding: '0.2em 0.4em',
        borderRadius: '4px',
        fontSize: '0.95em',
        display: 'inline',
      }}
    >
      {children}
    </code>
  );
}

// Code block component for triple backticks
function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  // Convert children to string and trim any trailing newlines
  const code = Array.isArray(children)
    ? children
        .map((child) => (typeof child === 'string' ? child : String(child)))
        .join('')
        .trimEnd()
    : String(children).trimEnd();

  return (
    <div className='relative'>
      <SyntaxHighlighter
        style={lucario}
        language={language}
        showLineNumbers
        customStyle={{
          maxWidth: 'calc(100vw - 50px)',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <CopyButton code={code} />
    </div>
  );
}

export default function MarkdownBlock({ children }: { children: string }) {
  if (!children) {
    return <p>No content provided.</p>;
  }

  return (
    <div className='container'>
      <Markdown
        className='prose prose-invert break-words text-gray-100 prose-p:break-words prose-p:text-justify prose-a:break-all prose-img:h-1/6'
        components={{
          code({ inline, className, children }) {
            // Fallback check if `inline` is undefined
            const isInline = inline ?? !/\n/.test(children.toString());

            return isInline ? (
              <InlineCode>{children}</InlineCode>
            ) : (
              <CodeBlock className={className}>{children}</CodeBlock>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
