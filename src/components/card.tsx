

const Card = ({text,color,size}:{text:string,color:string,size:string}) => {

    const cardStyle = {
        width: size,
        height: size,
        border: `3px solid ${color}`,
        borderRadius: '10px',
        boxShadow: '0 0px 1px var(--shadow-color)',
        fontSize: '1.5rem',
        color: color,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={cardStyle} className="card_container">
            {text}
        </div>
    );
}

export default Card;
