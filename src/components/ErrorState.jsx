export default function ErrorState({ message, onRetry }) {
  return (
    <div className="empty-state error-state" role="alert">
      <h2>We couldn’t load the menu</h2>
      <p>{message}</p>
      <p>Please try again. Your cart is safe.</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>Try again</button>
    </div>
  );
}