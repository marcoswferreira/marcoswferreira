import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { highlight } from 'sugar-high';

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h1 id={id}>{children}</h1>;
          },
          h2: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return <h3 id={id}>{children}</h3>;
          },
          pre: ({ children }: any) => {
            const codeProps = children?.props || {};
            const className = codeProps.className || '';
            const codeText = String(codeProps.children || children).replace(/\n$/, '');
            const highlightedCode = highlight(codeText);

            return (
              <div className="not-prose my-6">
                <pre className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 overflow-x-auto text-xs sm:text-sm">
                  <code
                    className={className}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            );
          },
          code({ className, children, ...props }: any) {
            return (
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono text-sky-600 dark:text-sky-400 before:hidden after:hidden" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
