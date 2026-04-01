'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'
import styles from './RichTextEditor.module.css'

export default function RichTextEditor({ value, onChange, disabled }) {
  const [sourceMode, setSourceMode] = useState(false)
  const [sourceHtml, setSourceHtml] = useState('')

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || '',
    editable: !disabled,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. when edit data loads)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value !== current) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  // Sync disabled state
  useEffect(() => {
    if (!editor) return
    editor.setEditable(!disabled)
  }, [disabled, editor])

  function toggleSource() {
    if (!sourceMode) {
      // entering source mode: snapshot current HTML
      setSourceHtml(editor.getHTML())
      setSourceMode(true)
    } else {
      // leaving source mode: push textarea HTML back into editor
      editor.commands.setContent(sourceHtml, false)
      onChange(sourceHtml)
      setSourceMode(false)
    }
  }

  function ToolBtn({ onClick, title, active, children }) {
    return (
      <button
        type="button"
        title={title}
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        className={`${styles.toolBtn} ${active ? styles.toolBtnActive : ''}`}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  return (
    <div className={`${styles.wrap} ${disabled ? styles.disabled : ''}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <ToolBtn
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor?.isActive('bold')}
        >
          <strong>B</strong>
        </ToolBtn>

        <ToolBtn
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor?.isActive('italic')}
        >
          <em>I</em>
        </ToolBtn>

        <ToolBtn
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor?.isActive('underline')}
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </ToolBtn>

        <div className={styles.divider} />

        <ToolBtn
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor?.isActive('bulletList')}
        >
          &#8226;&#8212;
        </ToolBtn>

        <ToolBtn
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive('orderedList')}
        >
          1&#8212;
        </ToolBtn>

        <div className={styles.divider} />

        <ToolBtn
          title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor?.isActive('paragraph')}
        >
          ¶
        </ToolBtn>

        <ToolBtn
          title="Clear Formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          active={false}
        >
          T&#x0336;
        </ToolBtn>

        <div className={styles.divider} />

        <button
          type="button"
          title="Toggle HTML source"
          onMouseDown={(e) => { e.preventDefault(); toggleSource(); }}
          className={`${styles.toolBtn} ${sourceMode ? styles.toolBtnActive : ''}`}
          disabled={disabled}
        >
          &lt;/&gt;
        </button>
      </div>

      {/* Editor / Source toggle */}
      {sourceMode ? (
        <textarea
          className={styles.source}
          value={sourceHtml}
          onChange={(e) => setSourceHtml(e.target.value)}
          disabled={disabled}
          rows={8}
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} className={styles.editorContent} />
      )}
    </div>
  )
}
