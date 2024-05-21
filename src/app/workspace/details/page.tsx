
import { columns } from "@/components/ui/data-table/columns";
import { transactions } from "@/data/data";
import { DataTable } from "@/components/ui/data-table/data-table";

export default function Example() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Details</h1>
      <div className="mt-10">
        <DataTable data={transactions} columns={columns} />
      </div>
    </>
  );
}
