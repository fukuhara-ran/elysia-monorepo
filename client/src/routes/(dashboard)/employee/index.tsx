import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { Employee } from "@elysia-monorepo/shared";
import { DataTable } from "../../../components/data-table/data-table";
import { api } from "../../../lib/eden-client.lib";

export const Route = createFileRoute("/(dashboard)/employee/")({
  component: EmployeeListPage
});

const columns: ColumnDef<Employee>[] = [
  { accessorKey: "fullName", header: "Name" },
  { accessorKey: "position", header: "Position" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "status", header: "Status" }
];

function EmployeeListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await api.employees.get();
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>loading...</div>;

  const employees = (data ?? []).map((employee) => ({
    ...employee,
    createdAt: employee.createdAt.toISOString(),
    updatedAt: employee.updatedAt.toISOString()
  }));

  return <DataTable columns={columns} data={employees} />;
}
