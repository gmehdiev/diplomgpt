import { InlineMath, BlockMath } from "react-katex";
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import 'katex/dist/katex.min.css';

interface Markdown {
    content: string
}
interface Segment {
    type: 'text' | 'katex_inline' | 'katex_block';
    content: string;
}

const parseContent = (content: string): Segment[] => {
    const inlineKatexRegex = /\$(.+?)\$/g;
    const blockKatexRegex = /\$\$(.+?)\$\$/gs;

    const segments: Segment[] = [];

    let lastIndex = 0;

    content.replace(blockKatexRegex, (match, katexContent, offset) => {
        if (offset > lastIndex) {
            const textContent = content.slice(lastIndex, offset);
            const inlineSegments = textContent.split(inlineKatexRegex).map<Segment>((part, index) => ({
                type: index % 2 === 0 ? 'text' : 'katex_inline' as const,
                content: part,
            }));
            segments.push(...inlineSegments);
        }
        segments.push({
            type: 'katex_block' as const,
            content: katexContent,
        });
        lastIndex = offset + match.length;
        return match;
    });

    const remainingContent = content.slice(lastIndex);
    if (remainingContent) {
        const inlineSegments = remainingContent.split(inlineKatexRegex).map<Segment>((part, index) => ({
            type: index % 2 === 0 ? 'text' : 'katex_inline' as const,
            content: part,
        }));
        segments.push(...inlineSegments);
    }

    return segments;
};

export const Markdown = (props: Markdown) => {
    const { content } = props
    const segments = parseContent(content);
    // console.log(segments)
    // console.log(content)
    return segments.map((segment, index) => {
        if (segment.type === 'text') {
            return (
                <ReactMarkdown
                    key={index}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {segment.content}
                </ReactMarkdown>
            );
        } else if (segment.type === 'katex_inline') {
            return <InlineMath key={index}>{segment.content}</InlineMath>;
        } else if (segment.type === 'katex_block') {
            return <BlockMath key={index}>{segment.content}</BlockMath>;
        }
        return null;
    })
}


