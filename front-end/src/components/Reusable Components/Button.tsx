import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../helper/functions";
const buttonVariants = cva("text-white font-bold rounded", {
  variants: {
    variant: {
      default: "bg-blue-500 hover:bg-blue-700 text-white font-bold",
      exit: "bg-red-600 rounded-full text-white font-bold",
    },
    size: {
      default: "h-10 py-2 px-4  leading-none",
      sm: "h-9 px-2 leading-4 rounded-md",
      lg: "h-11 px-8 rounded-md",
      very_sm: "h-8 rounded-md leading-none",
    },
    animation: {
      pressAnimation: "transform active:scale-75 transition-transform",
    },
    focus: {
      default:
        " outline-none focus:ring-4 shadow-md shadow-gray-500 focus:ring-white",
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
const Button: FC<ButtonProps> = ({
  size,
  variant,
  className,
  animation,
  focus,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, focus, animation, className })
      )}
      {...props}
    />
  );
};
export default Button;
