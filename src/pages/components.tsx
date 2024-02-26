import React from "react";
import NavigationBar from "~/components/navigationBar";
import PageWrapper from "~/components/pageWrapper";
import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const ComponentsPage = () => {
  return (
    <PageWrapper>
      <div className="ml-2 flex h-auto flex-col">
        <NavigationBar>
          <div></div>
        </NavigationBar>
      </div>

      <div className="h-full w-full rounded-xl bg-neutral-900 p-6">
        <div className="flex flex-col gap-4 ">
          <div>
            <h1 className="pb-2">buttons</h1>
            <div className="flex gap-2">
              <Button>Button</Button>
              <Button variant="secondary">Button</Button>
              <Button variant="destructive">Button</Button>
              <Button variant="outline">Button</Button>
              <Button variant="link">Button</Button>
            </div>
            <h1> Button sizes </h1>
            <div className="flex gap-2">
              <Button size="sm">sm</Button>
              <Button>normal</Button>
              <Button size="lg">Biggi</Button>
              <Button size="icon">I</Button>
            </div>
          </div>
          <div>
            <h1 className="pb-2">inputs</h1>
            <div className="flex gap-2">
              <Combobox></Combobox>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ComponentsPage;
