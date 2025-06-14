"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import DocumentInput from "./document-input";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  UnderlineIcon,
  TextIcon,
  Trash2Icon,
  Undo2Icon,
  StrikethroughIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import useEditorStore from "@/store/use-edit-store";

export default function Navbar() {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  const onSaveAsJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, "document.json");//TODO: Use Document Name
  };

  const onSaveAsHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, "document.html");//TODO: Use Document Name
  };

  const onSaveAsText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, "document.txt");//TODO: Use Document Name
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" height={36} width={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                File
              </MenubarTrigger>
              <MenubarContent className="print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileIcon className="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={onSaveAsJSON}>
                      <FileJsonIcon className="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveAsHTML}>
                      <GlobeIcon className="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem onClick={()=>window.print()}>
                      <BsFilePdf className="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem onClick={onSaveAsText}>
                      <FileTextIcon className="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <Trash2Icon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print<MenubarShortcut>⌘+P or Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo2Icon className="size-4 mr-2" />
                  Undo<MenubarShortcut>⌘+Z or Ctrl+Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().redo().run()}
                >
                  <Redo2Icon className="size-4 mr-2" />
                  Redo<MenubarShortcut>⌘+Y or Ctrl+Y</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 1, cols: 1 })}
                    >
                      1 x 1
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 2, cols: 2 })}
                    >
                      2 x 2
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 3, cols: 3 })}
                    >
                      3 x 3
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 4, cols: 4 })}
                    >
                      4 x 4
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 5, cols: 5 })}
                    >
                      5 x 5
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                      <BoldIcon className="size-4 mr-2" />
                      Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                    >
                      <ItalicIcon className="size-4 mr-2" />
                      Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                    >
                      <UnderlineIcon className="size-4 mr-2" />
                      Underline <MenubarShortcut>Ctrl+U or ⌘+U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                    >
                      <StrikethroughIcon className="size-4 mr-2" />
                      <span>Strikethrough&nbsp;&nbsp;</span>{" "}
                      <MenubarShortcut>Ctrl+5 or ⌘+Shift+X</MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem
                  onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                >
                  <RemoveFormattingIcon className="size-4 mr-2" />
                  Remove Formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
}
