import { LucideIcon } from "lucide-react";

interface StyleIconTextProps {
  icon: LucideIcon;
  size?: number;
  light?: boolean;
  text: string;
  onclick?:(data:any)=>void
}

const StyledIconText = ({ icon:Icon, size = 30, light=false, text, onclick }: StyleIconTextProps) => {

    const style={
    iconContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
        padding: '4px 8px',
        cursor: 'pointer',
        backgroundColor: light ? 'var(--primary-color)' : 'var(--icons-background-color)',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor:  'var(--icons-background-hover-color)',
        },
    },
    icon: {
        flexShrink: 0,
        width: size * 0.7,
        color: light ? 'var(--icons-light-color)' : 'var(--icons-color)',
    },
    text: {
        marginLeft: '8px',
        fontSize: size * 0.6,
        color: light ? 'var(--text-header-color)' : 'var(--text-body-color)',
    }
}

  return (
    <span  style={style.iconContainer} onClick={onclick}>
    
      <Icon style={style.icon} strokeWidth={3}  />
      <span style={style.text}>{text}</span>
    </span>
  );
};



export default StyledIconText;
