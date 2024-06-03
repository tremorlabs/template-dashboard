import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/data-table"
import { transactions } from "@/data/data"

export default function Example() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Details
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={transactions} columns={columns} />
      </div>
    </>
  )
}
