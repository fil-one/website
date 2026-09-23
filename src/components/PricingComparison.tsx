import Table from "@/components/Table";
import { bandedCost, type Competitor } from "@/lib/pricing";

export type { Competitor };

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
// the storage/egress colour rules live in exactly one place. Deliberately
// restrained: neutral zinc for every figure (no green/red), with weight marking
// the Fil One row and brand-600 reserved for its total.
const storageClass = (r: ComparisonRow) =>
  r.isFilOne ? "text-zinc-950 font-semibold" : "text-zinc-600 font-normal";

const egressClass = (r: ComparisonRow) =>
  r.isFilOne ? "text-zinc-950 font-semibold" : "text-zinc-600 font-normal";

const ProviderLabel = ({ row, className = "" }: { row: ComparisonRow; className?: string }) => (
  <div className={`flex items-center gap-2 flex-wrap${className ? ` ${className}` : ""}`}>
    <span className={`text-body-lg ${row.isFilOne ? "font-semibold" : "font-medium"} text-zinc-950`}>
      {row.name}
    </span>
    {row.region && <span className="font-sans text-small text-zinc-600">{row.region}</span>}
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
      const storage = bandedCost(storedTB, c.storagePricePerTB, c.storageTiers);
      const freeEgressTB = (c.freeEgressTB ?? 0) + (c.freeEgressMultiplier ?? 0) * storedTB;
      const billableEgressTB = Math.max(0, egressTB - freeEgressTB);
      const egress = bandedCost(billableEgressTB, c.egressPricePerTB, c.egressTiers);
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
              r.isFilOne ? "bg-zinc-50 border border-zinc-300" : "bg-white border border-black/[0.07]"
            }`}
          >
            <ProviderLabel row={r} className="mb-3" />
            <div className="grid grid-cols-2 gap-y-2 text-body-sm">
              <span className="text-zinc-600">Storage</span>
              <span className={`text-right ${storageClass(r)}`}>${r.storage.toFixed(2)}</span>
              <span className="text-zinc-600">Egress</span>
              <span className={`text-right ${egressClass(r)}`}>${r.egress.toFixed(2)}</span>
              <span className="text-zinc-600 font-semibold pt-2 border-t border-black/[0.07] mt-1">Total / month</span>
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
            <Table.Row key={r.name} className={r.isFilOne ? "bg-zinc-50" : "bg-transparent"}>
              <Table.Cell>
                <ProviderLabel row={r} />
              </Table.Cell>
              <Table.Cell className={`text-body ${storageClass(r)}`}>${r.storage.toFixed(2)}</Table.Cell>
              <Table.Cell className={`text-body ${egressClass(r)}`}>${r.egress.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <span
                  className={
                    r.isFilOne
                      ? "text-body-lg font-semibold text-brand-600"
                      : "text-body-lg font-normal text-zinc-600"
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
