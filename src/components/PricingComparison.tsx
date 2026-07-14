import Table from "@/components/Table";

export interface Competitor {
  name: string;
  region: string | null;
  storagePricePerTB: number;
  egressPricePerTB: number;
  apiPer1M: number;
  isFilOne: boolean;
}

interface PricingComparisonProps {
  competitors: Competitor[];
  /** TB of data stored per month */
  storedTB: number;
  /** TB of egress per month */
  egressTB: number;
}

/** One competitor with its monthly costs resolved for the current inputs. */
type ComparisonRow = Competitor & {
  storage: number;
  egress: number;
  total: number;
};

// Semantic classes shared by both layouts (mobile cards + desktop table), so
// the storage/egress colour rules live in exactly one place.
const storageClass = (r: ComparisonRow) =>
  r.isFilOne ? "text-zinc-950 font-semibold" : "text-zinc-600 font-normal";

const egressClass = (r: ComparisonRow) =>
  `${r.isFilOne ? "font-semibold" : "font-normal"} ${
    r.egress === 0 ? "text-success-600" : r.isFilOne ? "text-zinc-950" : "text-danger-600"
  }`;

const ProviderLabel = ({ row, className = "" }: { row: ComparisonRow; className?: string }) => (
  <div className={`flex items-center gap-2 flex-wrap${className ? ` ${className}` : ""}`}>
    <span className={`text-[16px] ${row.isFilOne ? "font-bold text-brand-600" : "font-medium text-zinc-950"}`}>
      {row.name}
    </span>
    {row.region && <span className="font-sans text-[13px] text-zinc-500">{row.region}</span>}
  </div>
);

/**
 * Provider cost comparison for the pricing calculator. Resolves each provider's
 * monthly storage/egress/total once, then renders stacked cards on mobile and a
 * <Table> on tablet/desktop from the same rows — so the pricing maths and the
 * conditional colour logic are never duplicated across the two responsive views.
 */
const PricingComparison = ({ competitors, storedTB, egressTB }: PricingComparisonProps) => {
  const rows: ComparisonRow[] = competitors
    .map((c) => {
      const storage = c.storagePricePerTB * storedTB;
      const egress = c.egressPricePerTB * egressTB;
      return { ...c, storage, egress, total: storage + egress };
    })
    .sort((a, b) => a.total - b.total);

  return (
    <>
      {/* Stacked cards on mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((r) => (
          <div
            key={r.name}
            className={`rounded-2xl p-4 font-sans ${
              r.isFilOne ? "bg-brand-50 border border-brand-500/25" : "bg-white border border-black/[0.07]"
            }`}
          >
            <ProviderLabel row={r} className="mb-3" />
            <div className="grid grid-cols-2 gap-y-2 text-[14px]">
              <span className="text-zinc-500">Storage</span>
              <span className={`text-right ${storageClass(r)}`}>${r.storage.toFixed(2)}</span>
              <span className="text-zinc-500">Egress</span>
              <span className={`text-right ${egressClass(r)}`}>${r.egress.toFixed(2)}</span>
              <span className="text-zinc-500 font-semibold pt-2 border-t border-black/[0.07] mt-1">Total / month</span>
              <span
                className={`text-right font-bold pt-2 border-t border-black/[0.07] mt-1 ${
                  r.isFilOne ? "text-brand-600" : "text-zinc-950"
                }`}
              >
                ${r.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table on tablet / desktop */}
      <Table className="hidden md:block">
        <Table.Head>
          <Table.Row>
            {["Provider", "Storage", "Egress", "Total / month"].map((h) => (
              <Table.HeadCell key={h}>{h}</Table.HeadCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row key={r.name} className={r.isFilOne ? "bg-brand-50" : "bg-transparent"}>
              <Table.Cell>
                <ProviderLabel row={r} />
              </Table.Cell>
              <Table.Cell className={`text-base ${storageClass(r)}`}>${r.storage.toFixed(2)}</Table.Cell>
              <Table.Cell className={`text-base ${egressClass(r)}`}>${r.egress.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <span
                  className={
                    r.isFilOne
                      ? "text-[19px] font-bold text-brand-600"
                      : "text-[16px] font-normal text-zinc-600"
                  }
                >
                  ${r.total.toFixed(2)}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default PricingComparison;
