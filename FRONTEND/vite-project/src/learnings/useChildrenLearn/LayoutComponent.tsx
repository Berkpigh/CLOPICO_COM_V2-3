import { ReactNode } from "react";

type PropsWithChildren<P = unknown> = P & {children: ReactNode}
//type MonPropsCustomWithChildren = PropswithChildren & { item: string };

export const LayoutComponent = (props: PropsWithChildren) => {
  return (
        
        <div className="my_left">
          {props.children}
        </div>
  );
};

