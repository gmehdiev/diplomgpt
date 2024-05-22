import { InlineMath, BlockMath } from "react-katex";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'katex/dist/katex.min.css';
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import RemarkMathPlugin from "remark-math";

interface Markdown {
    content: string
}


export const preprocessLaTeX = (content: string) => {
    const blockProcessedContent = content.replace(
        /\\\[(.*?)\\\]/gs,
        (_, equation) => `$$${equation}$$`,
    );
    const inlineProcessedContent = blockProcessedContent.replace(
        /\\\((.*?)\\\)/gs,
        (_, equation) => `$${equation}$`,
    );
    return inlineProcessedContent;
};

export const Markdown = (props: Markdown) => {
    const { content } = props;
    const segment = preprocessLaTeX(content);

    return <ReactMarkdown
        remarkPlugins={[remarkMath, RemarkMathPlugin]}
        rehypePlugins={[rehypeKatex]}
    >{segment}</ReactMarkdown>

};