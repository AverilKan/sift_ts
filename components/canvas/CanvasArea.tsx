// components/CanvasArea/CanvasArea.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';

interface Node {
  x: number;
  y: number;
  id: number;
  name: string;
}

interface Line {
  start: number;  
  end: number;    
  correlation: number;
}

const CanvasArea: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [draggedNodeIndex, setDraggedNodeIndex] = useState<number | null>(null);

  const addNode = () => {
    const name = prompt("Please enter the node name:");
    if (name) {
      setNodes(prevNodes => {
        const newNode = { x: 100, y: 50 * (prevNodes.length + 1), id: prevNodes.length, name };
        const newLines = prevNodes.map((node, index) => ({
          start: index,
          end: prevNodes.length,
          correlation: 0
        }));
        setLines(prevLines => [...prevLines, ...newLines]);
        return [...prevNodes, newNode];
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    nodes.forEach((node, index) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if the click is within the node circle
      if (Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 10) {
        setDragging(true);
        setDraggedNodeIndex(index);
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging && draggedNodeIndex !== null) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setNodes(prevNodes => prevNodes.map((node, index) => index === draggedNodeIndex ? { ...node, x, y } : node));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDraggedNodeIndex(null);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 

    // Draw all lines
    lines.forEach(line => {
      const startNode = nodes[line.start];
      const endNode = nodes[line.end];
      ctx.beginPath();
      ctx.moveTo(startNode.x, startNode.y);
      ctx.lineTo(endNode.x, endNode.y);
      ctx.stroke();
      // Draw correlation number
      const midX = (startNode.x + endNode.x) / 2;
      const midY = (startNode.y + endNode.y) / 2; 
      ctx.fillText(`Correlation: ${line.correlation}`, midX, midY);
    });

    // Draw all nodes
    nodes.forEach(node => {
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(node.name, node.x, node.y + 20);  
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    draw(context);
  }, [nodes, lines]);

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <canvas ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={(e) => e.preventDefault()} />
    </div>
  );
};

export default CanvasArea;
