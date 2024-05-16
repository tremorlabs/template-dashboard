import { RiAddLine } from "@remixicon/react"
import { columns } from "@/components/ui/data-table/columns"
import { transactions } from "@/data/transactions"
import { DataTable } from "@/components/ui/data-table/data-table"
import { Button } from "@/components/Button"
import { RiSettings2Line, RiDownloadLine } from "@remixicon/react"

export default function Example() {
    return (
        <>
            <h1 className="text-lg font-semibold text-gray-900">Details</h1>
            <div className="mt-10">
                <DataTable data={transactions} columns={columns} />
            </div>
        </>
    )
}