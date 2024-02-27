import React, { useState } from "react";
import NavigationBar from "~/components/navigationBar";
import PageWrapper from "~/components/pageWrapper";
import { Button } from "~/components/ui/button";
import { Combobox, ComboxOption } from "~/components/ui/combox";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Checkbox } from "~/components/ui/checkbox";

const ComponentsPage = () => {
  const [input, setInput] = useState("");
  return (
    <PageWrapper>
      <div className="ml-2 flex h-auto flex-col">
        <NavigationBar>
          <div></div>
        </NavigationBar>
      </div>

      <div className="h-full w-full rounded-xl bg-neutral-900 p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="pb-2">buttons</h1>
            <div className="flex gap-2">
              <Button>Button</Button>
              <Button variant="secondary">Button</Button>
              <Button variant="destructive">Button</Button>
              <Button variant="outline">Button</Button>
              <Button variant="link">Button</Button>
            </div>
          </div>
          <div>
            <h1 className="pb-2"> Button sizes </h1>
            <div className="flex gap-2">
              <Button size="sm">sm</Button>
              <Button>normal</Button>
              <Button size="lg">Biggi</Button>
              <Button size="icon">
                <HomeRoundedIcon />
              </Button>
            </div>
          </div>
          <div>
            <h1 className="pb-2">inputs</h1>
            <div className="flex gap-2">
              <Combobox
                options={frameworks}
                isMultiSelect
                onChange={(option) => {
                  console.log(option);
                }}
              ></Combobox>
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

              <Input
                placeholder="bruk meg, plis"
                type="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></Input>
            </div>
          </div>
          <div>
            <h1 className="pb-2">mer input</h1>
            <Checkbox>
              <span>Checkbox</span>
            </Checkbox>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

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

export default ComponentsPage;
