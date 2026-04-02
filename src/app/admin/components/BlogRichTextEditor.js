'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect, useRef, useState } from 'react'
import styles from './RichTextEditor.module.css'
import blogStyles from './BlogRichTextEditor.module.css'

export default function BlogRichTextEditor({ value, onChange, disabled }) {
  const [sourceMode,    setSourceMode]    = useState(false)
  const [sourceHtml,    setSourceHtml]    = useState('')
  const [imgUploading,  setImgUploading]  = useState(false)
  const imgInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
    ],
    content: value || '',
    editable: !disabled,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value !== current) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(!disabled)
  }, [disabled, editor])

  function toggleSource() {
    if (!sourceMode) {
      setSourceHtml(editor.getHTML())
      setSourceMode(true)
    } else {
      editor.commands.setContent(sourceHtml, false)
      onChange(sourceHtml)
      setSourceMode(false)
    }
  }

  function setLink() {
    const url = window.prompt('Enter URL:', editor.getAttributes('link').href || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  async function handleImageFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    // reset so same file can be re-selected
    e.target.value = ''

    setImgUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed.')
      editor.chain().focus().setImage({ src: data.url }).run()
    } catch (err) {
      alert(err.message)
    } finally {
      setImgUploading(false)
    }
  }

  function ToolBtn({ onClick, title, active, children }) {
    return (
      <button
        type="button"
        title={title}
        onMouseDown={(e) => { e.preventDefault(); onClick() }}
        className={`${styles.toolBtn} ${active ? styles.toolBtnActive : ''}`}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  return (
    <div className={`${styles.wrap} ${disabled ? styles.disabled : ''}`}>
      {/* Hidden file input for image upload */}
      <input
        ref={imgInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={handleImageFileChange}
      />

      <div className={styles.toolbar}>
        <ToolBtn title="Bold"      onClick={() => editor.chain().focus().toggleBold().run()}      active={editor?.isActive('bold')}>      <strong>B</strong> </ToolBtn>
        <ToolBtn title="Italic"    onClick={() => editor.chain().focus().toggleItalic().run()}    active={editor?.isActive('italic')}>    <em>I</em>         </ToolBtn>
        <ToolBtn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')}> <span style={{ textDecoration: 'underline' }}>U</span> </ToolBtn>

        <div className={styles.divider} />

        <ToolBtn title="Bullet List"   onClick={() => editor.chain().focus().toggleBulletList().run()}  active={editor?.isActive('bulletList')}>  &#8226;&#8212; </ToolBtn>
        <ToolBtn title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')}> 1&#8212;        </ToolBtn>

        <div className={styles.divider} />

        <ToolBtn title="Paragraph"        onClick={() => editor.chain().focus().setParagraph().run()} active={editor?.isActive('paragraph')}> ¶ </ToolBtn>
        <ToolBtn title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().run()} active={false}> T&#x0336; </ToolBtn>

        <div className={styles.divider} />

        {/* Link */}
        <ToolBtn title="Insert / Edit Link" onClick={setLink} active={editor?.isActive('link')}>
          <span className={blogStyles.toolIcon}>🔗</span>
        </ToolBtn>

        {/* Image — triggers file upload */}
        <button
          type="button"
          title={imgUploading ? 'Uploading…' : 'Insert Image (upload)'}
          onMouseDown={(e) => { e.preventDefault(); if (!disabled && !imgUploading) imgInputRef.current?.click() }}
          className={styles.toolBtn}
          disabled={disabled || imgUploading}
        >
          <span className={blogStyles.toolIcon}>{imgUploading ? '⏳' : '🖼'}</span>
        </button>

        <div className={styles.divider} />

        {/* HTML source toggle */}
        <button
          type="button"
          title="Toggle HTML source"
          onMouseDown={(e) => { e.preventDefault(); toggleSource() }}
          className={`${styles.toolBtn} ${sourceMode ? styles.toolBtnActive : ''}`}
          disabled={disabled}
        >
          &lt;/&gt;
        </button>
      </div>

      {sourceMode ? (
        <textarea
          className={styles.source}
          value={sourceHtml}
          onChange={(e) => setSourceHtml(e.target.value)}
          disabled={disabled}
          rows={10}
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} className={`${styles.editorContent} ${blogStyles.blogEditor}`} />
      )}
    </div>
  )
}
