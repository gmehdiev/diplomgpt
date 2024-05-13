import clsx from "clsx";
import cls from "./Input.module.scss";
import { FC, ForwardedRef, InputHTMLAttributes, forwardRef, memo, useState } from "react";
import { EyeIcon } from "../../../../public/icons/auth/eye.icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  icon?: JSX.Element;
  isPassword?: boolean;
  error?: string
  ref?: ForwardedRef<HTMLInputElement>;
}

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const { className, isPassword, label, type, icon, error, ...other } = props;
  const [seePassword, setSeePassword] = useState(false);
  return (
    <div>
      <label className={clsx(cls.label)}>{label}</label>
      <div className={clsx(cls.InputBox)}>
        <div className={clsx(cls.icon)}>{icon}</div>
        <input
          {...other}
          ref={ref}
          className={clsx(cls.Input)}
          type={seePassword ? "text" : type}
        />
        {isPassword && (
          <button
            className={clsx(cls.passwordButton)}
            onClick={() => setSeePassword((prev) => !prev)}
            type="button"
          >
            <EyeIcon />
          </button>
        )}
        {error && <p className={clsx(cls.p)}>{error}</p>}
      </div>
    </div>
  );
});
