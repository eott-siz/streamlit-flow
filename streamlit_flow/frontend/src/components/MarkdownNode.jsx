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

function MarkdownNode(
    data,
    sourcePosition = false, sourceHandles = 0,
    targetPosition = false, targetHandles = 0
) {
    const sourcePos = sourcePosition && (handlePosMap[sourcePosition] || Position.Right);
    const targetPos = targetPosition && (handlePosMap[targetPosition] || Position.Left);

    return (
        <>
            {sourcePos && sourceHandles > 0 && (
                <Handle type="source" position={sourcePos} isConnectable />
            )}
            {sourcePos && sourceHandles > 1 && (
                <Handle type="source" position={sourcePos} isConnectable />
            )}
            {sourcePos && sourceHandles > 2 && (
                <Handle type="source" position={sourcePos} isConnectable />
            )}
            {sourcePos && sourceHandles > 3 && (
                <Handle type="source" position={sourcePos} isConnectable />
            )}
            <div className="markdown-node">
                <MemoizedMarkdown content={data.content} />
            </div>
            {targetPos && targetHandles > 0 && (
                <Handle type="target" position={targetPos} isConnectable />
            )}
            {targetPos && targetHandles > 1 && (
                <Handle type="target" position={targetPos} isConnectable />
            )}
            {targetPos && targetHandles > 2 && (
                <Handle type="target" position={targetPos} isConnectable />
            )}
            {targetPos && targetHandles > 3 && (
                <Handle type="target" position={targetPos} isConnectable />
            )}
        </>
    );
}

const MarkdownInputNode = ({ data, sourcePosition }) => {
    return MarkdownNode(data, sourcePosition, 1, false, 0)
};

const MarkdownOutputNode = ({ data, targetPosition }) => {
    return MarkdownNode(data, false, 0, targetPosition, 1)
};

const MarkdownDefaultNode = ({ data, sourcePosition, targetPosition }) => {
    return MarkdownNode(data, sourcePosition, 1, targetPosition, 1)
};

const MarkdownMultihandleNode = ({
    data,
    sourcePosition, sourceHandles,
    targetPosition, targetHandles
}) => {
    return MarkdownNode(data, sourcePosition, sourceHandles, targetPosition, targetHandles)
};

export { MarkdownInputNode, MarkdownOutputNode, MarkdownDefaultNode, MarkdownMultihandleNode }