import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  /** Min table width before the container scrolls horizontally */
  minWidth?: number;
  /** Extra classes on the scroll container (e.g. `hidden md:block`) */
  className?: string;
}

/**
 * Foundational data table. Owns the shared chrome — a rounded, bordered,
 * elevated scroll container wrapping a collapsed <table> — so tables across
 * the site look consistent. Compose with the Table.Head/Body/Row/HeadCell/Cell
 * sub-components, which carry the standard header, divider, and cell-padding
 * styles. Per-cell content, alignment, and color stay with the caller via
 * `className`, so irregular tables (conditional colors, multi-element cells)
 * are still expressible.
 */
const Table = ({ children, minWidth = 520, className = "" }: TableProps) => (
  <div
    className={`overflow-x-auto border border-black/[0.07] rounded-2xl bg-white shadow-elevated${
      className ? ` ${className}` : ""
    }`}
  >
    <table className="w-full font-sans" style={{ minWidth, borderCollapse: "collapse" }}>
      {children}
    </table>
  </div>
);

const Head = ({ children }: { children: ReactNode }) => <thead>{children}</thead>;

const Body = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;

const Row = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <tr className={className}>{children}</tr>
);

const HeadCell = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <th
    className={`text-left px-5 py-4 text-[12px] font-medium uppercase tracking-[0.06em] text-zinc-500 border-b border-black/[0.07]${
      className ? ` ${className}` : ""
    }`}
  >
    {children}
  </th>
);

const Cell = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <td className={`px-5 py-5 border-b border-black/[0.07]${className ? ` ${className}` : ""}`}>{children}</td>
);

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeadCell = HeadCell;
Table.Cell = Cell;

export default Table;
