import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import "./errorfallback.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <main className="error-fallback-container">
      <div className="error-fallback-content">
        <Heading Variant="h1" text="Something went wrong! 🤔" />
        <p>{error.message}</p>

        <Button
          variation="primary"
          size="large"
          text="Try Again"
          onClick={resetErrorBoundary}
        />
      </div>
    </main>
  );
};

export default ErrorFallback;
