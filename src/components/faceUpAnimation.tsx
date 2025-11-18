import '../style/faceUpAnimation.css'

const FadeUpAnimation = ({text}: {text:string}) => {
  return (
    <div className="text-center space-y-6">
      <p className="text-2xl md:text-3xl text-purple-300 fade-up-2">
        {text}
      </p>
    </div>
  );
};

export default FadeUpAnimation; 
