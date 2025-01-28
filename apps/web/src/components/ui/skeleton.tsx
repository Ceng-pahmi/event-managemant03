import { cn } from '../../lib/utils'; // Adjusted import path

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-accent', className)} // Updated to use blue accent
      {...props}
    />
  );
}

export { Skeleton };
