"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, 
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Quote, Minus, Eye, Edit2
} from 'lucide-react';
import styles from './RichTextEditor.module.css';
import { useEffect, useState, useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Re-sync content if it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    isActive, 
    onClick, 
    icon: Icon, 
    title,
    disabled = false
  }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${styles.toolbarBtn} ${isActive ? styles.isActive : ''} ${disabled ? styles.isDisabled : ''}`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        {!isPreview && (
          <div className={styles.toolbarScroll}>
            {/* History */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton 
                onClick={() => editor.chain().focus().undo().run()} 
                disabled={!editor.can().chain().focus().undo().run()}
                icon={Undo} title="Undo" 
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().redo().run()} 
                disabled={!editor.can().chain().focus().redo().run()}
                icon={Redo} title="Redo" 
              />
            </div>

            {/* Typography */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton isActive={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={Heading1} title="Heading 1" />
              <ToolbarButton isActive={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={Heading2} title="Heading 2" />
              <ToolbarButton isActive={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={Heading3} title="Heading 3" />
            </div>

            {/* Formatting */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton isActive={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={Bold} title="Bold" />
              <ToolbarButton isActive={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={Italic} title="Italic" />
              <ToolbarButton isActive={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={UnderlineIcon} title="Underline" />
              <ToolbarButton isActive={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={Strikethrough} title="Strikethrough" />
            </div>

            {/* Alignment */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton isActive={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={AlignLeft} title="Align Left" />
              <ToolbarButton isActive={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={AlignCenter} title="Align Center" />
              <ToolbarButton isActive={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={AlignRight} title="Align Right" />
              <ToolbarButton isActive={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} icon={AlignJustify} title="Justify" />
            </div>

            {/* Lists & Block */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton isActive={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={List} title="Bullet List" />
              <ToolbarButton isActive={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={ListOrdered} title="Numbered List" />
              <ToolbarButton isActive={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={Quote} title="Blockquote" />
              <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={Minus} title="Horizontal Rule" />
            </div>

            {/* Media */}
            <div className={styles.toolbarGroup}>
              <ToolbarButton isActive={editor.isActive('link')} onClick={setLink} icon={LinkIcon} title="Link" />
              <ToolbarButton onClick={addImage} icon={ImageIcon} title="Image" />
            </div>
          </div>
        )}
        
        <div style={{ flex: 1 }}></div>

        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`${styles.previewBtn} ${isPreview ? styles.isActive : ''}`}
        >
          {isPreview ? <Edit2 size={16} /> : <Eye size={16} />}
          <span>{isPreview ? 'Edit' : 'Preview'}</span>
        </button>
      </div>

      <div className={styles.editorContentWrapper}>
        {isPreview ? (
          <div 
            className="prose-content" 
            dangerouslySetInnerHTML={{ __html: content || '<p>Nothing to preview.</p>' }} 
          />
        ) : (
          <EditorContent editor={editor} className="prose-content editor-inner-wrapper" />
        )}
      </div>
    </div>
  );
}
