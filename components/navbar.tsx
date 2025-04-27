import { ciphers } from "@/components/cipher-navigation";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className=" bg-primary/80 sticky top-0 w-full backdrop-blur-2xl text-primary-foreground">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="gradient text-xl"
        >
          CRYPTOGRASO
        </Link>
        <div />
        <div>
          <ul className="flex gap-4 *:hover:underline *:underline-offset-2">
            {ciphers.map(cipher => (
              <li className="nav-item" key={cipher.path}>
                <Link className="nav-link" href={cipher.path}>{cipher.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
