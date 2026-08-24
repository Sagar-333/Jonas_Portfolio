import clsx from "clsx";

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  href,
  download,
  target,
  onClick,
}) => {
  const content = (
    <>
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase font-semibold">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </>
  );

  const classes = clsx(
    "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black transition-all duration-300",
    containerClass?.includes("bg-") ? "" : "bg-[#459cce]",
    containerClass
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        download={download}
        target={target}
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button id={id} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
