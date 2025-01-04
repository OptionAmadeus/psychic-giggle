interface TableHeaderProps {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

export function TableHeader({
  children,
  align = "left",
  className = "",
}: TableHeaderProps) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <th
      className={`py-3.5 px-3 text-sm font-semibold text-gray-900 ${alignClass} ${className}`}
    >
      {children}
    </th>
  );
}
