export type TabItem<T extends string> = {
  value: T;
  label: string;
};

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: Array<TabItem<T>>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={tab.value === value ? "is-active" : ""}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
