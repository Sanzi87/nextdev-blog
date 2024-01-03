import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function generateCodeBlock(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const match = /language-(\w+)/.exec(props.className || '');
  return match ? (
    <SyntaxHighlighter
      style={dracula}
      language={match[1]}
      showLineNumbers
      customStyle={{
        maxWidth: 'calc(100vw - 50px)',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      {String(props.children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={props.className}>{props.children}</code>
  );
}

function noPreWrap(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >
) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{props.children}</>;
}

export default function MarkdownBlock({ children }: { children: string }) {
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
