import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployeeSchema, type CreateEmployee } from "@elysia-monorepo/shared";
import { useAppForm } from "../../../lib/form.lib";
import { api } from "../../../lib/eden-client.lib";

export const Route = createFileRoute("/(dashboard)/employee/create")({
  component: CreateEmployeePage
});

function CreateEmployeePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateEmployee) => {
      const { data: result, error } = await api.employees.post(data);
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate({ to: "/" });
    }
  });

  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      position: "",
      department: "",
      joinDate: "",
      status: "active"
    } as CreateEmployee,
    validators: { onChange: createEmployeeSchema },
    onSubmit: ({ value }) => mutation.mutate(value)
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="fullName" children={(field) => <field.TextField label="Full name" />} />
      <form.AppField name="email" children={(field) => <field.TextField label="Email" />} />
      <form.AppField name="position" children={(field) => <field.TextField label="Position" />} />
      <form.AppField name="department" children={(field) => <field.TextField label="Department" />} />
      <button type="submit" disabled={mutation.isPending}>
        Save
      </button>
    </form>
  );
}
