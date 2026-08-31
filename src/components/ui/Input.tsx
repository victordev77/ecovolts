import { forwardRef } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, FieldProps & InputHTMLAttributes<HTMLInputElement>>(function Input(
  { label, error, className = "", ...props },
  ref,
) {
  return (
    <label className={`field ${className}`.trim()}>
      <span>{label}</span>
      <input ref={ref} {...props} />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
});

export const Select = forwardRef<HTMLSelectElement, FieldProps & SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { label, error, children, className = "", ...props },
  ref,
) {
  return (
    <label className={`field ${className}`.trim()}>
      <span>{label}</span>
      <select ref={ref} {...props}>
        {children}
      </select>
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ label, error, className = "", ...props }, ref) {
    return (
      <label className={`field ${className}`.trim()}>
        <span>{label}</span>
        <textarea ref={ref} {...props} />
        {error ? <small className="field-error">{error}</small> : null}
      </label>
    );
  },
);
