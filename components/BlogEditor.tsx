"use client";
import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Upload,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { fixHtmlForMdx } from "@/lib/html-utils";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialExcerpt?: string;
  initialCoverImage?: string;
  onSave: (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => void;
  isSaving: boolean;
}

export default function BlogEditor({
  initialTitle = "",
  initialContent = "",
  initialExcerpt = "",
  initialCoverImage = "",
  onSave,
  isSaving,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  
  // Add constants for character limits
  const TITLE_MAX_LENGTH = 100;
  const EXCERPT_MAX_LENGTH = 200;

  // Add handlers to limit input length
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= TITLE_MAX_LENGTH) {
      setTitle(value);
    }
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= EXCERPT_MAX_LENGTH) {
      setExcerpt(value);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] max-w-none p-4",
      },
    },
  });

  const handleSave = () => {
    if (!editor) return;
    onSave({
      title,
      content: fixHtmlForMdx(editor.getHTML()),
      excerpt,
      coverImage,
    });
  };

  const addImage = () => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl("");
    setShowImageInput(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCoverImage(data.url);
        }
      } else {
        console.error("Cover image upload failed");
      }
    } catch (error) {
      console.error("Error uploading cover image:", error);
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = "";
      }
    }
  };

  const addLink = () => {
    if (!editor || !linkUrl) return;
    
    if (editor.state.selection.empty && !linkText) {
      return;
    }
    
    if (editor.state.selection.empty && linkText) {
      editor
        .chain()
        .focus()
        .insertContent(linkText)
        .setTextSelection({
          from: editor.state.selection.from - linkText.length,
          to: editor.state.selection.from
        })
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    
    setLinkUrl("");
    setLinkText("");
    setShowLinkInput(false);
  };

  const handleLinkButtonClick = () => {
    if (editor && !editor.state.selection.empty) {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to
      );
      setLinkText(selectedText);
    }
    setShowLinkInput(!showLinkInput);
    if (showImageInput) {
      setShowImageInput(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Název příspěvku</Label>
        <Input
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Zadejte název příspěvku"
          className="mt-1"
          maxLength={TITLE_MAX_LENGTH}
        />
        <div className="text-xs text-gray-500 mt-1">
          {title.length}/{TITLE_MAX_LENGTH} znaků
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Krátký popis</Label>
        <Input
          id="excerpt"
          value={excerpt}
          onChange={handleExcerptChange}
          placeholder="Zadejte krátký popis příspěvku"
          className="mt-1"
          maxLength={EXCERPT_MAX_LENGTH}
        />
        <div className="text-xs text-gray-500 mt-1">
          {excerpt.length}/{EXCERPT_MAX_LENGTH} znaků
        </div>
      </div>

      <div>
        <Label htmlFor="coverImage">Úvodní obrázek</Label>
        <div className="flex mt-1 gap-2">
          <Input
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="URL úvodního obrázku (volitelné)"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => coverFileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Nahrát
          </Button>
          <input
            type="file"
            ref={coverFileInputRef}
            onChange={handleCoverImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        {coverImage && (
          <div className="mt-2">
            <img
              src={coverImage}
              alt="Cover preview"
              className="max-h-40 rounded-md"
            />
          </div>
        )}
      </div>

      <div>
        <Label>Obsah příspěvku</Label>
        <div className="border rounded-md mt-1 overflow-hidden">
          <div className="bg-gray-50 p-2 border-b flex flex-wrap gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? "bg-gray-200" : ""}
              title="Nadpis 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? "bg-gray-200" : ""}
              title="Nadpis 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-gray-200" : ""}
              title="Tučné"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-gray-200" : ""}
              title="Kurzíva"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
              title="Odrážkový seznam"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
              title="Číslovaný seznam"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setShowImageInput(!showImageInput)}
              title="Vložit obrázek z URL"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="Nahrát obrázek"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Zpět"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Znovu"
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleLinkButtonClick}
              className={editor?.isActive("link") ? "bg-gray-200" : ""}
              title="Vložit odkaz"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>

          {showImageInput && (
            <div className="p-2 bg-gray-50 border-b flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Vložte URL obrázku"
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                onClick={addImage}
                disabled={!imageUrl}
              >
                Vložit
              </Button>
            </div>
          )}

          {showLinkInput && (
            <div className="p-2 bg-gray-50 border-b flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Text odkazu (volitelné)"
                  className="flex-1"
                />
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="URL odkazu"
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addLink}
                  disabled={!linkUrl}
                >
                  Vložit
                </Button>
              </div>
            </div>
          )}

          <div className="editor-content-wrapper">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving || !title || !excerpt || isUploading}
          className="bg-brand-600 hover:bg-brand-700 text-white"
        >
          {isSaving ? "Ukládání..." : "Uložit příspěvek"}
        </Button>
      </div>
    </div>
  );
} 