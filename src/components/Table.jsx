import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * columns: Array<{ key: string, header: string, align?: 'left'|'center', render?: (row) => ReactNode }>
 * data: Array<object>
 * label: string  e.g. "products" or "categories"
 */
export default function Table({ columns, data, label = 'items', emptyMessage = 'No data found.' }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="overflow-x-auto max-w-full">
                <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap ${
                                        col.align === 'center' ? 'text-center' : 'text-left'
                                    } ${
                                        col.key === 'actions' ? 'sticky right-0 bg-gray-50' : ''
                                    }`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-10 text-center text-sm text-gray-400"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr
                                    key={row.id ?? index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`px-6 py-4 ${col.align === 'center' ? 'text-center' : ''} ${
                                                col.key === 'actions' ? 'sticky right-0 bg-white shadow-[-4px_0_6px_-6px_rgba(0,0,0,0.15)]' : ''
                                            }`}
                                        >
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                <span className="text-sm text-gray-500">
                    Showing 1 to {data.length} of {data.length} {label}
                </span>
                <div className="flex items-center gap-1">
                    <button className="rounded border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
                        1
                    </button>
                    <button className="rounded border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
