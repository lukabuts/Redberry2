const LoadingCard = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
      <div className="w-12 h-12 border-4 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingCard;
