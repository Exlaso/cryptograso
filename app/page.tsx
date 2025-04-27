import CipherNavigation from "@/components/cipher-navigation";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight gradient mb-4">
          Cryptography Tools
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl">
          A collection of classical cipher implementations for educational purposes
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <CipherNavigation />
      </div>
    </main>
  );
}
