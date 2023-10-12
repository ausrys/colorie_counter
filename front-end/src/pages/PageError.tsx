type Props = {
  error: string;
};
const PageError = (props: Props) => {
  return (
    <div>
      <h1>404</h1>
      <p>{props.error}</p>
    </div>
  );
};
export default PageError;
