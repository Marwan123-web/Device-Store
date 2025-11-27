// DynamicTable.tsx
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";

interface DynamicTableProps<TData> {
  data: TData[];
  config?: {
    columns?: ColumnDef<TData>[];
    enableRowExpansion?: boolean;
    subRowsKey?: string;
    title?: string;
  };
}

const DynamicTable = <TData extends Record<string, any>>({
  data,
  config = {},
}: DynamicTableProps<TData>) => {
  const {
    columns: customColumns,
    enableRowExpansion,
    subRowsKey = "orderItems",
    title = "Data",
  } = config;

  const defaultColumns = useMemo(() => {
    if (!data.length) return [];

    const firstRowKeys = Object.keys(data[0]);

    return firstRowKeys.map((key) => ({
      accessorKey: key,
      header:
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      cell: (info) => {
        const value = info.getValue();
        if (typeof value === "number") return `$${value}`;
        if (typeof value === "string" && !isNaN(Date.parse(value))) {
          return new Date(value).toLocaleDateString();
        }
        return value;
      },
    })) as ColumnDef<TData>[];
  }, [data]);

  const columns = customColumns || defaultColumns;

  const table = useReactTable({
    data,
    columns,
    getSubRows: (row) =>
      subRowsKey && row[subRowsKey as keyof TData]
        ? (row[subRowsKey as keyof TData] as TData[])
        : [],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...(enableRowExpansion && {
      meta: { enableRowExpansion },
    }),
  });

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length} className="p-0">
                      <div className="bg-gray-50 border-t">
                        {row.subRows?.map((subRow) => (
                          <div
                            key={subRow.id}
                            className="px-6 py-4 border-b border-gray-100 grid grid-cols-12 gap-4 items-center"
                          >
                            <div className="col-span-2">
                              {"product" in (subRow.original as any) &&
                              (subRow.original as any).product?.img ? (
                                <img
                                  src={(subRow.original as any).product.img}
                                  alt={
                                    (subRow.original as any).product?.title ||
                                    ""
                                  }
                                  className="w-12 h-12 object-contain rounded-lg"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <span className="text-xs text-gray-500">
                                    Item
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="col-span-6">
                              <p className="font-medium text-gray-900 truncate">
                                {"product" in (subRow.original as any)
                                  ? (subRow.original as any).product?.title
                                  : JSON.stringify(subRow.original)}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {"product" in (subRow.original as any)
                                  ? (
                                      subRow.original as any
                                    ).product?.description?.slice(0, 100) +
                                    "..."
                                  : ""}
                              </p>
                            </div>
                            <div className="col-span-4 text-right">
                              <p className="text-sm font-semibold">
                                {"price" in (subRow.original as any)
                                  ? `$${(subRow.original as any).price} × ${
                                      (subRow.original as any).quantity || 1
                                    }`
                                  : ""}
                              </p>
                              <p className="text-xs text-gray-500">
                                {"product" in (subRow.original as any)
                                  ? (subRow.original as any).product?.category
                                  : ""}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
