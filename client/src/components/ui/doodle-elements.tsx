export default function DoodleElements() {
  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-6 h-6 doodle-heart animate-float"></div>
      <div className="absolute top-40 right-20 w-5 h-5 doodle-star animate-tilt"></div>
      <div className="absolute bottom-40 left-20 w-4 h-4 doodle-heart animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-6 h-6 doodle-star animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-5 h-5 doodle-heart animate-tilt" style={{ animationDelay: '3s' }}></div>
    </>
  );
}
