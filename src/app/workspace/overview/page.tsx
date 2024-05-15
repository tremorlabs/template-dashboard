import { Filterbar } from "@/components/ui/Filterbar"
import { Button } from "@/components/Button"
import { RiAddLine } from "@remixicon/react"
import { Card } from "@/components/ui/Cards"

const categories = [
    {
        name: "Sales",
        value: 1324,
        type: "currency",
    },
    {
        name: "Profit",
        value: 93324,
        type: "currency",
    },
    {
        name: "Users",
        value: 123,
        type: "unit",
    },
]

export default function Example() {
    return (
        <>
            <div className="border-b pb-4">
                <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
                <div className="flex items-center justify-between mt-4">
                    <Filterbar />
                    <div className="flex items-center gap-x-2">
                        <Button variant="secondary">
                            Edit
                        </Button>
                        <Button className="gap-x-1">
                            Add
                            <RiAddLine className="-mr-1 size-5 shrink-0" aria-hidden={true} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((item) => (
                    <Card key={item.name} title={item.name} value={item.value} type={item.type} />
                ))}
            </div>
        </>
    )
}