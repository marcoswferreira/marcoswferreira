import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { highlight } from 'sugar-high';

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <p className="text-sm leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-sm">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-sm">{children}</ol>,
          li: ({ children }) => <li className="text-sm">{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className="text-sky-500 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-4 text-sm text-zinc-600 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');
            
            if (!inline) {
              const highlightedCode = highlight(code);
              return (
                <div className="my-6">
                  <pre className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 overflow-x-auto text-xs sm:text-sm">
                    <code
                      {...props}
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  </pre>
                </div>
              );
            }

            return (
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-sm" {...props}>
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
