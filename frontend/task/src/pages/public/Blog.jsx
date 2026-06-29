import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from 'react-icons/fi'
import api from '../../services/api'
import './Blogs.css'

const CATEGORIES = ['AI Trends', 'Development', 'Cybersecurity', 'Cloud', 'Company Updates', 'General']
const STATUS_TABS = ['All', 'Published', 'Draft']

const EMPTY_FORM = {
  title: '',
  content: '',
  thumbnail: '',
  tags: '',
  category: 'General',
  status: 'draft',
}

const Blogs = () => {
  const [blogs, setBlogs]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch]             = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [saving, setSaving]       = useState(false)
  const [formError, setFormError] = useState('')

  const fetchBlogs = () => {
    setLoading(true)
    api.get('/blogs', { params: { limit: 100 } })
      .then(({ data }) => setBlogs(data.blogs || []))
      .catch(() => setError('Could not load blogs.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const filtered = blogs.filter((b) => {
    const statusOk =
      statusFilter === 'All' ||
      (statusFilter === 'Published' && b.status === 'published') ||
      (statusFilter === 'Draft' && b.status === 'draft')
    const searchOk = b.title?.toLowerCase().includes(search.toLowerCase())
    return statusOk && searchOk
  })

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (blog) => {
    setEditingId(blog._id)
    setForm({
      title: blog.title || '',
      content: blog.content || '',
      thumbnail: blog.thumbnail || '',
      tags: (blog.tags || []).join(', '),
      category: blog.category || 'General',
      status: blog.status || 'draft',
    })
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!form.title.trim() || !form.content.trim()) {
      setFormError('Title and content are required.')
      return
    }

    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }

    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload)
      } else {
        await api.post('/blogs', payload)
      }
      setModalOpen(false)
      fetchBlogs()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save the post.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    try {
      await api.delete(`/blogs/${id}`)
      setBlogs((prev) => prev.filter((b) => b._id !== id))
    } catch {
      setError('Could not delete the post.')
    }
  }

  return (
    <div className="admin-blogs">

      <div className="admin-blogs-head">
        <div>
          <h1>Blogs</h1>
          <p>Create, edit, and publish posts.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <FiPlus /> New post
        </button>
      </div>

      <div className="admin-blogs-toolbar">
        <div className="tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              className={`tab ${statusFilter === tab ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="admin-blogs-search">
          <FiSearch />
          <input
            className="input"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading && (
        <div className="admin-blogs-list">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton admin-blog-skeleton" />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="empty">
          <div className="empty-icon">—</div>
          <p>No posts match these filters.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="admin-blogs-list">
          {filtered.map((blog) => (
            <div key={blog._id} className="admin-blog-row card">

              <div className="admin-blog-info">
                <div className="admin-blog-row-head">
                  <span className="badge badge-blue">{blog.category}</span>
                  <span className={`badge ${blog.status === 'published' ? 'badge-green' : ''}`}>
                    {blog.status}
                  </span>
                </div>
                <h3 className="admin-blog-title">{blog.title}</h3>
                <div className="admin-blog-meta">
                  <span>{blog.author?.name || 'Unknown author'}</span>
                  <span className="dot">•</span>
                  <span>{blog.views ?? 0} views</span>
                  {blog.publishedAt && (
                    <>
                      <span className="dot">•</span>
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="admin-blog-actions">
                <button className="icon-btn" onClick={() => openEdit(blog)} aria-label="Edit post">
                  <FiEdit2 />
                </button>
                <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(blog._id)} aria-label="Delete post">
                  <FiTrash2 />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-head">
              <h2>{editingId ? 'Edit post' : 'New post'}</h2>
              <div className="close-btn" onClick={closeModal}>
                <FiX />
              </div>
            </div>

            {formError && <div className="error-box">{formError}</div>}

            <form className="form-stack" onSubmit={handleSubmit}>

              <div className="form-field">
                <label>Title</label>
                <input
                  className="input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Post title"
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Category</label>
                  <select className="input" name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select className="input" name="status" value={form.status} onChange={handleChange}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Thumbnail URL</label>
                <input
                  className="input"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-field">
                <label>Tags (comma separated)</label>
                <input
                  className="input"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="react, nodejs, ai"
                />
              </div>

              <div className="form-field">
                <label>Content</label>
                <textarea
                  className="input admin-blog-textarea"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write the post..."
                  rows={8}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save changes' : 'Publish'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default Blogs