import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface StyleIconProps {
  icon: LucideIcon;
  size?: number;
  light?: boolean;
  title?: string;
}

const StyledIcon = ({
  icon: Icon,
  size = 30,
  light = false,
  title,
}: StyleIconProps) => {
  const [hover, setHover] = useState(false);

  const style = {
    iconContainer: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: hover?size*1.2:size,
      height: hover?size*1.115:size,
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
      title={title}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Icon style={style.icon} strokeWidth={3} />
    </span>
  );
};

export default StyledIcon;
