const showMessage = (message: string | object) =>
  typeof message === "string" ? message : JSON.stringify(message);

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="errorMessage">
      Something went wrong: <pre>{showMessage(message)}</pre>
    </div>
  );
}
