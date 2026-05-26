/**
 * WYSIWYG rich-text editor for HTML content.
 * Built on Tiptap (ProseMirror). Outputs clean HTML to onChange.
 * @license CC BY-NC-SA 4.0
 */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

/**
 * @param {{ value: string, onChange: Function }} props
 */
export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }), // StarterKit v3 bundles Link; disable to avoid duplicate
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  /** Toolbar button — uses onMouseDown to keep editor focused. */
  const Btn = ({ onClick, active, title, children }) => (
    <button
      type="button"
      title={title}
      className={`rte-btn${active ? ' active' : ''}`}
      onMouseDown={e => { e.preventDefault(); onClick(); }}
    >
      {children}
    </button>
  );

  const handleLink = () => {
    const prev = editor.getAttributes('link').href ?? '';
    const url  = window.prompt('Link URL', prev || 'https://');
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const chain = () => editor.chain().focus();

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Text formatting">

        <Btn onClick={() => chain().toggleBold().run()}    active={editor.isActive('bold')}    title="Bold (Ctrl+B)"><b>B</b></Btn>
        <Btn onClick={() => chain().toggleItalic().run()}  active={editor.isActive('italic')}  title="Italic (Ctrl+I)"><i>I</i></Btn>
        <Btn onClick={() => chain().toggleStrike().run()}  active={editor.isActive('strike')}  title="Strikethrough"><s>S</s></Btn>
        <Btn onClick={() => chain().toggleCode().run()}    active={editor.isActive('code')}    title="Inline code">{'<>'}</Btn>

        <span className="rte-sep" aria-hidden="true" />

        <Btn onClick={() => chain().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</Btn>
        <Btn onClick={() => chain().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</Btn>

        <span className="rte-sep" aria-hidden="true" />

        <Btn onClick={() => chain().toggleBulletList().run()}  active={editor.isActive('bulletList')}  title="Bullet list">• List</Btn>
        <Btn onClick={() => chain().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1. List</Btn>

        <span className="rte-sep" aria-hidden="true" />

        <Btn onClick={() => chain().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">" "</Btn>
        <Btn onClick={() => chain().setHorizontalRule().run()} active={false} title="Horizontal rule">— HR</Btn>

        <span className="rte-sep" aria-hidden="true" />

        <Btn onClick={handleLink} active={editor.isActive('link')} title="Insert / edit link">Link</Btn>
        {editor.isActive('link') && (
          <Btn onClick={() => chain().unsetLink().run()} active={false} title="Remove link">✕ Link</Btn>
        )}

      </div>
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
