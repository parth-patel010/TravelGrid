const Spinner = ({ fullScreen = true, message = '', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 
      'fixed inset-0 min-h-screen' : 
      'min-h-[200px]'} bg-white/80 z-50 ${className}`}
    >
      {/* Spinner with your existing animation */}
      <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Optional message */}
      {message && (
        <p className="mt-4 text-pink-600 font-medium max-w-xs text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default Spinner;