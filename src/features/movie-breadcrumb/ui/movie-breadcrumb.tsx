import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  withMain?: boolean;
  className?: string;
}

export const MovieBreadcrumb: React.FC<Props> = React.memo(
  ({ withMain, className }) => {
    const navigate = useNavigate();

    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbSeparator className="scale-x-[-1]" />

          {withMain && (
            <>
              <BreadcrumbItem>
                <Link className="text-base" to="/">
                  Главная
                </Link>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="scale-x-[-1]" />
            </>
          )}

          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(-1)}
              className="text-base cursor-pointer"
            >
              Назад
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
);
