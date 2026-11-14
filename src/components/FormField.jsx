export default function FormField({
  id, label, as = 'input', type = 'text', value, onChange, error, hint, optional = false, ...rest
}) {
  const Tag = as;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field ${error ? 'field-error' : ''}`}>
      <label htmlFor={id}>
        {label}{optional && <span className="optional"> (optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="hint">{hint}</p>}
      <Tag
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="error-text">
          <span aria-hidden="true">⚠ </span>{error}
        </p>
      )}
    </div>
  );
}