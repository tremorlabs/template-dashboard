import { RiAddLine } from "@remixicon/react"
import { columns } from "@/components/ui/data-table/columns"
import { transactions } from "@/data/transactions"
import { DataTable } from "@/components/ui/data-table/data-table"
import { Button } from "@/components/Button"
import { RiSettings2Line, RiDownloadLine } from "@remixicon/react"

export default function Example() {
    return (
        <>
            <h1 className="text-xl font-semibold text-gray-900">Details</h1>
            <div className="flex items-center justify-end mt-4">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="gap-x-2 font-semibold">
                        <RiDownloadLine className="-ml-0.5 size-4 shrink-0" aria-hidden={true} />
                        Export
                    </Button>
                    <Button variant="secondary" className="gap-x-2 font-semibold">
                        <RiSettings2Line className="-ml-0.5 size-4 shrink-0" aria-hidden={true} />
                        Edit
                    </Button>
                </div>
            </div>
            <div className="mt-4">
                <DataTable data={transactions} columns={columns} />
            </div>
        </>
    )
}