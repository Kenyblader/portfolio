import "../style/blenderAnimation.css";

const SplitTextAnimation = ({text}: {text:string}) => {
  return (
    <div className="text-center">
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className="letter"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {
                letter===" "?<p className="blank">#</p>:letter
            } 
          </span>
        ))}
    </div>
  );
};


export default SplitTextAnimation;