type TContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return (
    <div className="min-h-screen w-full mx-auto space-y-2">{children}</div>
  );
};

export default Container;
