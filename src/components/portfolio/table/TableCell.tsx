interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export function TableCell({ children, align = 'left', className = '' }: TableCellProps) {
  const alignClass = align === 'right' ? 'text-right' : 
                    align === 'center' ? 'text-center' : 
                    'text-left';

  return (
    <td className={`whitespace-nowrap py-4 px-3 text-sm ${alignClass} ${className}`}>
      {children}
    </td>
  );
}