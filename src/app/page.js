import StripeDemo from "./components/StripeDemo";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Stripe Payment Demo</h1>
      </header>
      <main>
        <StripeDemo />
      </main>
      <footer>
        <p>&copy; 2024 Stripe Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}
