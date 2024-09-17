const MainTitleCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center">
      <h1 className="text-deepBlue text-3xl font-bold">{children}</h1>
    </div>
  );
};

export default MainTitleCard;
