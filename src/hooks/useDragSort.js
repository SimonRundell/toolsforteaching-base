/**
 * Provides native HTML5 drag-and-drop reordering for list items.
 *
 * Usage:
 *   const { overIdx, dragProps } = useDragSort(items, onReorder);
 *   // Spread dragProps(i) onto each draggable element.
 *   // Apply a 'drag-over' class when overIdx === i.
 *
 * @param {Array}    items      The current ordered list
 * @param {Function} onReorder  Called with the reordered array on drop
 */
import { useRef, useState } from 'react';

export function useDragSort(items, onReorder) {
  const srcIdx = useRef(null);
  const [overIdx, setOverIdx] = useState(null);

  /** Returns drag event props to spread onto a draggable element at position idx. */
  const dragProps = (idx) => ({
    draggable: true,
    onDragStart: () => { srcIdx.current = idx; },
    onDragOver:  (e) => { e.preventDefault(); setOverIdx(idx); },
    onDrop: (e) => {
      e.preventDefault();
      const src = srcIdx.current;
      setOverIdx(null);
      srcIdx.current = null;
      if (src === null || src === idx) return;
      const next = [...items];
      const [moved] = next.splice(src, 1);
      next.splice(idx, 0, moved);
      onReorder(next);
    },
    onDragEnd: () => { setOverIdx(null); srcIdx.current = null; },
  });

  return { overIdx, dragProps };
}
