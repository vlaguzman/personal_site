import { getCredentials } from "@/data/credentials";

export function CredibilityStrip() {
  return (
    <div className="credibility">
      <ul className="credibility-list wrap" aria-label="Track record">
        {getCredentials().map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
