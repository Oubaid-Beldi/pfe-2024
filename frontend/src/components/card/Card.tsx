import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: string;
};

const Card = ({ children, style }: Props) => {
  return (
    <div className={`${style} shadow-lg rounded-lg bg-gray-100 p-10`}>
      {children}
    </div>
  );
};
export default Card;
