import { LucideIcon } from "lucide-react";
import '../style/icon.css'


interface StyleIconProps {
  icon: LucideIcon;
  size?: number;
  light?: boolean;
  title?: string;
  onClick?:(data:any)=>void
}

const StyledIcon = ({
  icon: Icon,
  size = 30,
  light = false,
  title,
  onClick
}: StyleIconProps) => {

  const style = {
    iconContainer: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: light
        ? "var(--primary-color)"
        : "var(--icons-background-color)",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "var(--icons-background-hover-color)",
      },
    },
    icon: {
      flexShrink: 0,
      width: size * 0.7,
      color: light ? "var(--icons-light-color)" : "var(--icons-color)",
    },
  };

  return (
    <span
      style={style.iconContainer}
      className="icon"
      title={title}
      onClick={onClick}
    >
      <Icon style={style.icon} strokeWidth={3} />
    </span>
  );
};

export default StyledIcon;
