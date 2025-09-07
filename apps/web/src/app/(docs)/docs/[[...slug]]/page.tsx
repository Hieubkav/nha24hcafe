import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { baseOptions } from "@/lib/layout.shared";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const p = await params;
  const page = source.getPage(p.slug);
  if (!page) notFound();
  const MDXContent = page.data.body;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(source, page),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<Metadata> {
  const p = await params;
  const page = source.getPage(p.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
