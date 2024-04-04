'use client';
import { Spinner } from "@/components/ui/spinner";
import { Window } from "@/components/window";
import Link from "next/link";
import React, { Suspense } from 'react';



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

function NotFound() {
  return (
    <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">File Not found {":("}</h1>
      </div>
    </Window>
  );
}

function Cv() {
  return (
    <Window>
      <div className="h-full w-full relative rounded-md">
        <Suspense fallback={<Spinner />}>
        <object
          className="relative h-full w-full"
          data="/CV.pdf"
          type="application/pdf"
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
            <p className="text-black">If you encounter a problem loading the CV, <Link className="italic underline text-slate-700" href={'/CV.pdf'} target="_blank" rel="noopener noreferrer">view it here.</Link></p>
          </div>
        </object>
        </Suspense>
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
    case "CV":
      return <Cv />;
    default:
      return <NotFound />;
  }
}
