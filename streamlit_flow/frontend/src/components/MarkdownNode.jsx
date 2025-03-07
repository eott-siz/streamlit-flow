import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

const handlePosMap = {
    'top': Position.Top,
    'right': Position.Right,
    'bottom': Position.Bottom,
    'left': Position.Left,
};

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeHighlight, rehypeRaw, rehypeKatex];

const MemoizedMarkdown = memo(({ content }) => (
    <Markdown
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
    >
        {content}
    </Markdown>
));

function MarkdownNode(data, sourcePosition = false, targetPosition = false) {
    const sourcePos = sourcePosition && (handlePosMap[sourcePosition] || Position.Right);
    const targetPos = targetPosition && (handlePosMap[targetPosition] || Position.Left);

    return (
        <>
            {sourcePos && (
                <Handle type="source" position={sourcePos} isConnectable />
            )}
            <div className="markdown-node">
                <MemoizedMarkdown content={data.content} />
            </div>
            {targetPos && (
                <Handle type="target" position={targetPos} isConnectable />
            )}
        </>
    );
}

const MarkdownInputNode = ({ data, sourcePosition }) => {
    return MarkdownNode(data, sourcePosition, false)
};

const MarkdownOutputNode = ({ data, targetPosition }) => {
    return MarkdownNode(data, false, targetPosition)
};

const MarkdownDefaultNode = ({ data, sourcePosition, targetPosition }) => {
    return MarkdownNode(data, sourcePosition, targetPosition)
};

export { MarkdownInputNode, MarkdownOutputNode, MarkdownDefaultNode }