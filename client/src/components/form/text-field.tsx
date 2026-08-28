import { useFieldContext } from "../../lib/form.lib";

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors[0];

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {error ? <span>{String(error)}</span> : null}
    </div>
  );
}
