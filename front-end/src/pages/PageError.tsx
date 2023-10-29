type Props = {
  error: string;
};

const PageError = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-600">{props.error}</p>
    </div>
  );
};

export default PageError;
