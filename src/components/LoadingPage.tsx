import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <LoadingSpinner size={60} />
  </div>
);

export default LoadingPage;
