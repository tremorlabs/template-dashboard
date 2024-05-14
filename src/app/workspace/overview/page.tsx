const categories = [
    {
        name: "Sales",
        value: 1324
    },
    {
        name: "Revenue",
        value: 93324
    },
    {
        name: "Users",
        value: 123
    },
]

export default function Example() {
    return (
        <>
            <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((item) => (
                    <div key={item.name} className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
                        <h3 className="text-sm text-gray-500">{item.name}</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>
        </>
    )
}