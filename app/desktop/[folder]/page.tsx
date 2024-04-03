import { Window } from "@/components/window";

function PageContent({ title }: Readonly<{ title: string }>) {
  return (
    <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">This is a simple example of a dynamic route.</p>
      </div>
    </Window>
  );
}

export default function Page({ params }: Readonly<{ params: { folder: string } }>) {
  switch (params.folder) {
    case "projects":
      return <PageContent title="Projects" />;
    case "studies":
      return <PageContent title="Studies" />;
    case "about":
      return <PageContent title="About" />;
    default:
      return <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">File Not found {":("}</h1>
      </div>
    </Window>;
  }
}
