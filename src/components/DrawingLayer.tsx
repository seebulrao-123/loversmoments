import React, { useRef, useEffect, useCallback } from 'react';
import { DrawingStroke, DrawingTool, DrawingPoint } from '../types';

interface DrawingLayerProps {
  width: number;
  height: number;
  strokes: DrawingStroke[];
  currentTool: DrawingTool;
  currentColor: string;
  currentSize: number;
  currentOpacity: number;
  isDrawMode: boolean;
  onStrokeComplete: (stroke: DrawingStroke) => void;
}

export const DrawingLayer: React.FC<DrawingLayerProps> = ({
  width,
  height,
  strokes,
  currentTool,
  currentColor,
  currentSize,
  currentOpacity,
  isDrawMode,
  onStrokeComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const currentPointsRef = useRef<DrawingPoint[]>([]);
  const activePointerIdRef = useRef<number | null>(null);

  // Helper to render a full stroke onto a 2D canvas context
  const renderStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: DrawingStroke) => {
    const { tool, color, size, opacity, points } = stroke;
    if (points.length === 0) return;

    ctx.save();

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = size * 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    ctx.globalCompositeOperation = 'source-over';

    if (tool === 'highlighter') {
      ctx.globalAlpha = Math.min(0.38, opacity);
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 2.8;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'bevel';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (tool === 'pencil') {
      ctx.globalAlpha = opacity * 0.75;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, size * 0.75);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Subtle pencil tooth
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        // minor jitter for graphite texture
        const jx = (Math.random() - 0.5) * 0.4;
        const jy = (Math.random() - 0.5) * 0.4;
        ctx.lineTo(points[i].x + jx, points[i].y + jy);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (tool === 'brush') {
      ctx.globalAlpha = opacity * 0.85;
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 1.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 0.35;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (tool === 'fountain') {
      // Authentic calligraphy fountain pen:
      // Stroke width adapts based on velocity/distance between consecutive points
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;

      if (points.length < 2) {
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Speed-based dynamic thickness
        // Slower movements = richer, thicker ink; faster flicks = tapered calligraphic tail
        const velocity = Math.min(dist / 6, 2.5);
        const dynamicWidth = Math.max(1.2, size * (1.35 - velocity * 0.38));

        ctx.lineWidth = dynamicWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();
      return;
    }

    // Default regular pen
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.stroke();
    ctx.restore();
  }, []);

  // Redraw all strokes whenever strokes array or dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    for (const stroke of strokes) {
      renderStroke(ctx, stroke);
    }
  }, [width, height, strokes, renderStroke]);

  // Pointer event handlers - Unified mouse, touch, and stylus to prevent duplicate strokes!
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    activePointerIdRef.current = e.pointerId;
    isDrawingRef.current = true;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pt: DrawingPoint = {
      x,
      y,
      pressure: e.pressure > 0 ? e.pressure : 0.5,
      time: Date.now(),
    };

    currentPointsRef.current = [pt];

    // Live preview point
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.scale(dpr, dpr);
      renderStroke(ctx, {
        id: 'temp',
        tool: currentTool,
        color: currentColor,
        size: currentSize,
        opacity: currentOpacity,
        points: [pt],
      });
      ctx.restore();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const points = currentPointsRef.current;
    const lastPt = points[points.length - 1];
    if (lastPt) {
      const dx = x - lastPt.x;
      const dy = y - lastPt.y;
      if (dx * dx + dy * dy < 2.5) return; // ignore micro-jitter
    }

    const pt: DrawingPoint = {
      x,
      y,
      pressure: e.pressure > 0 ? e.pressure : 0.5,
      time: Date.now(),
    };

    points.push(pt);

    // Live render segment
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.scale(dpr, dpr);
      renderStroke(ctx, {
        id: 'temp',
        tool: currentTool,
        color: currentColor,
        size: currentSize,
        opacity: currentOpacity,
        points: points.slice(-3),
      });
      ctx.restore();
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }

    isDrawingRef.current = false;
    activePointerIdRef.current = null;

    const finalPoints = [...currentPointsRef.current];
    currentPointsRef.current = [];

    if (finalPoints.length > 0) {
      const newStroke: DrawingStroke = {
        id: 'stroke_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        tool: currentTool,
        color: currentColor,
        size: currentSize,
        opacity: currentOpacity,
        points: finalPoints,
      };
      onStrokeComplete(newStroke);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        touchAction: 'none',
      }}
      className={`absolute inset-0 z-20 ${
        isDrawMode ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
    />
  );
};
