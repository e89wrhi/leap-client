import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, LibraryBig, LucideIcon } from 'lucide-react';
import { FC } from 'react';

export interface BreadcrumbItemProps {
  href?: string;
  label: string;
  icon?: LucideIcon; // Optional Lucide icon for this breadcrumb
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <Home className="size-4 shrink-0" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon ?? LibraryBig;

          return (
            <BreadcrumbItem key={index}>
              {/* separator as span, not li */}
              <BreadcrumbSeparator className="mx-1" />

              {isLast ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  {Icon && <Icon className="size-4 shrink-0" />}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href || '#'}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
