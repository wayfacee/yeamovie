import { useEffect } from "react";
import { toast } from "@/shared/hooks";
import { type MovieDtoV13 } from "@/shared/adapters";
import { ToastAction } from "@/shared/ui/toast";
import { Link } from "react-router-dom";

interface Props {
  data?: MovieDtoV13[];
  isLoading: boolean;
  isFetching: boolean;
}

export const useTabsEffect = ({ data, isLoading, isFetching }: Props) => {
  useEffect(() => {
    if (data && data.length === 0 && !isLoading && !isFetching) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Похоже вы израсходовали дневной лимит...",
        action: (
          <ToastAction altText="Связаться" asChild>
            <Link target="_blank" to="https://t.me/wayfaceee">
              Связаться
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [data, isLoading, isFetching]);
};
