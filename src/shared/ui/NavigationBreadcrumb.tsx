import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui";
import { Link } from "react-router-dom";

interface PathItem {
  id: number;
  name: string;
  to?: string;
  onClick?: () => void;
}

interface Props {
  paths: PathItem[];
  className?: string;
}

/**
 * переиспользуемый комп., который мб заюзан в фичах, стр.
 */
export const NavigationBreadcrumb: React.FC<Props> = React.memo(
  ({ paths, className }) => {
    const renderBreadcrumbItem = ({ id, name, to, onClick }: PathItem) =>
      to ? (
        <React.Fragment key={id}>
          <BreadcrumbSeparator className="scale-x-[-1]" />

          <BreadcrumbItem>
            <Link to={to} className="text-base">
              {name}
            </Link>
          </BreadcrumbItem>
        </React.Fragment>
      ) : (
        <BreadcrumbItem key={id}>
          <BreadcrumbSeparator className="scale-x-[-1]" />

          <BreadcrumbLink
            onClick={onClick}
            className="text-base cursor-pointer"
          >
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );

    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>{paths.map(renderBreadcrumbItem)}</BreadcrumbList>
      </Breadcrumb>
    );
  },
);
