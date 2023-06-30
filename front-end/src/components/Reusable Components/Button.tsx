import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../helper/functions";
const buttonVariants = cva("text-white font-bold py-2 px-4 rounded", {
  variants: {
    variant: {
      default: "bg-blue-500 hover:bg-blue-700 text-white font-bold",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-2 leading-4 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
const Button: FC<ButtonProps> = ({ size, variant, className, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
export default Button;
