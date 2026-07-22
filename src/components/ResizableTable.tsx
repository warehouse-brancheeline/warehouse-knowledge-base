import React, { useRef, useEffect, useState } from 'react';

interface ResizableTableProps {
  children: React.ReactNode;
}

export const ResizableTable: React.FC<ResizableTableProps> = ({ children }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [resizing, setResizing] = useState(false);
  const [currentCol, setCurrentCol] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing || currentCol === null) return;
      const diff = e.clientX - startX;
      const newWidth = Math.max(30, startWidth + diff);
      const col = table.querySelectorAll('colgroup col')[currentCol] as HTMLTableColElement;
      if (col) col.style.width = newWidth + 'px';
      // Juga set lebar sel jika perlu
      const cells = table.querySelectorAll(`tbody tr td:nth-child(${currentCol + 1})`);
      cells.forEach((cell) => {
        (cell as HTMLElement).style.width = newWidth + 'px';
      });
    };

    const handleMouseUp = () => {
      setResizing(false);
      setCurrentCol(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, currentCol, startX, startWidth]);

  const handleMouseDown = (e: React.MouseEvent, colIndex: number) => {
    const table = tableRef.current;
    if (!table) return;
    const col = table.querySelectorAll('colgroup col')[colIndex] as HTMLTableColElement;
    if (!col) return;
    setResizing(true);
    setCurrentCol(colIndex);
    setStartX(e.clientX);
    setStartWidth(col.offsetWidth || 100);
    e.preventDefault();
  };

  return (
    <div style={{ overflowX: 'auto', position: 'relative' }}>
      <table ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <colgroup>
          {Array.from({ length: 3 }).map((_, i) => (
            <col key={i} style={{ width: '100px' }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {Array.from({ length: 3 }).map((_, i) => (
              <th key={i} style={{ position: 'relative', border: '1px solid #ccc', padding: '8px' }}>
                Kolom {i + 1}
                <div
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    top: 0,
                    width: '8px',
                    height: '100%',
                    cursor: 'col-resize',
                    background: 'transparent',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, i)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Data 1</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Data 2</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Data 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
