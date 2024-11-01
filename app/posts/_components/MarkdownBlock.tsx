import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';

function generateCodeBlock(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const match = /language-(\w+)/.exec(props.className || '');
  const language = match ? match[1] : 'text';
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
        {String(props.children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyButton code={String(props.children).replace(/\n$/, '')} />
    </div>
  );
}

function noPreWrap(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >
) {
  return <>{props.children}</>;
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
          code: generateCodeBlock,
          pre: noPreWrap,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
