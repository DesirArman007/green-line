"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import RichTextEditor from '@/components/Admin/RichTextEditor/RichTextEditor';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '../packages/AdminPackages.module.css'; // Reusing form styles

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);
  
  // Category-specific states
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
    if (data) {
      setBlogs(data);
      // Extract unique non-empty categories, trimmed and sorted alphabetically
      const cats = data
        .map((b: any) => b.category)
        .filter((c: any) => typeof c === 'string' && c.trim() !== '')
        .map((c: string) => c.trim());
      const uniqueCats = Array.from(new Set(cats)).sort();
      setExistingCategories(uniqueCats);
    }
    setIsLoading(false);
  };

  const handleEdit = (blog: any) => {
    setCurrentBlog(blog);
    setIsDropdownOpen(false);
    setIsEditing(true);
  };

  const handleDelete = async (blog: any) => {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      const { error } = await supabase.from('blogs').delete().eq('id', blog.id);
      if (!error) {
        const { data: { user } } = await supabase.auth.getUser();
        await logAuditAction('DELETE', 'blogs', blog.id, user?.email, { title: blog.title });
        fetchBlogs();
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentBlog({ title: '', excerpt: '', content: '', read_time: '', author: '', image_url: '', date: '', category: '' });
    setIsDropdownOpen(false);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (currentBlog.id) {
      const { error } = await supabase.from('blogs').update(currentBlog).eq('id', currentBlog.id);
      if (!error) {
        await logAuditAction('UPDATE', 'blogs', currentBlog.id, user?.email, { title: currentBlog.title });
        setIsEditing(false);
        fetchBlogs();
      }
    } else {
      const { data, error } = await supabase.from('blogs').insert([currentBlog]).select();
      if (!error && data) {
        await logAuditAction('CREATE', 'blogs', data[0].id, user?.email, { title: currentBlog.title });
        setIsEditing(false);
        fetchBlogs();
      }
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Blogs
          </button>
        ) : (
          <h1>Blogs</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Cover Image</label>
            <ImageUpload bucket="media" folder="blogs" currentImage={currentBlog.image_url} onUploadSuccess={(url) => setCurrentBlog({ ...currentBlog, image_url: url })} dimensions="1200 x 630 px (Landscape)" />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}><label>Title</label><input required maxLength={100} value={currentBlog.title} onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })} /></div>
            <div className={styles.formGroup}><label>Author</label><input required maxLength={50} value={currentBlog.author} onChange={e => setCurrentBlog({ ...currentBlog, author: e.target.value })} /></div>
            <div className={styles.formGroup}><label>Date</label><input required maxLength={30} value={currentBlog.date} onChange={e => setCurrentBlog({ ...currentBlog, date: e.target.value })} /></div>
            
            <div className={styles.formGroup} style={{ position: 'relative' }}>
              <label>Category</label>
              <input
                required
                maxLength={30}
                placeholder="Type or select a category"
                value={currentBlog.category || ''}
                onChange={e => {
                  setIsTyping(true);
                  setCurrentBlog({ ...currentBlog, category: e.target.value });
                }}
                onFocus={() => {
                  setIsDropdownOpen(true);
                  setIsTyping(false);
                }}
                onBlur={() => {
                  // Small timeout to allow mousedown click on item to fire before input blur closes dropdown
                  setTimeout(() => {
                    setIsDropdownOpen(false);
                    setIsTyping(false);
                  }, 200);
                }}
                autoComplete="off"
              />
              {isDropdownOpen && (
                (() => {
                  const filtered = !isTyping
                    ? existingCategories
                    : existingCategories.filter(cat => 
                        cat.toLowerCase().includes((currentBlog.category || '').toLowerCase())
                      );
                  const showAddNewSuggestion = isTyping && 
                    currentBlog.category && 
                    !existingCategories.some(cat => cat.toLowerCase() === currentBlog.category.trim().toLowerCase());
                  
                  return (filtered.length > 0 || showAddNewSuggestion) ? (
                    <div className={styles.categoryDropdown}>
                      {filtered.map(cat => (
                        <div
                          key={cat}
                          className={styles.categoryDropdownItem}
                          onMouseDown={() => {
                            setCurrentBlog({ ...currentBlog, category: cat });
                            setIsDropdownOpen(false);
                            setIsTyping(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                      {showAddNewSuggestion && (
                        <div
                          className={styles.categoryDropdownItem}
                          onMouseDown={() => {
                            setCurrentBlog({ ...currentBlog, category: currentBlog.category.trim() });
                            setIsDropdownOpen(false);
                            setIsTyping(false);
                          }}
                          style={{ borderTop: '1px solid var(--admin-border)', fontWeight: 'bold', color: 'var(--admin-accent)' }}
                        >
                          + Add new category: "{currentBlog.category}"
                        </div>
                      )}
                    </div>
                  ) : null;
                })()
              )}
            </div>

            <div className={styles.formGroup}><label>Read Time</label><input maxLength={20} value={currentBlog.read_time} onChange={e => setCurrentBlog({ ...currentBlog, read_time: e.target.value })} /></div>
          </div>

          <div className={styles.formGroup}>
            <label>Excerpt (Short summary)</label>
            <textarea required rows={3} value={currentBlog.excerpt} onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })} className={styles.textarea} />
          </div>

          <div className={styles.formGroup}>
            <label>Full Content</label>
            <RichTextEditor content={currentBlog.content} onChange={(html) => setCurrentBlog({ ...currentBlog, content: html })} />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save Blog</button>
          </div>
        </form>
      ) : (
        <DataTable data={blogs} columns={columns} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
