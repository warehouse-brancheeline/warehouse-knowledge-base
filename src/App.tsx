import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search, Plus, Edit2, Trash2, Folder, BookOpen, Shield, FileText, LogOut, Lock, Undo2, Redo2, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, Heading1, Heading2, Heading3, Type, Palette, Highlighter, List, ListOrdered, CheckSquare, Table as TableIcon, Image as ImageIcon, Youtube, Link as LinkIcon, Printer, Share2, Check, ChevronRight, Save, Clock, User, ExternalLink, ChevronDown, Menu, ChevronLeft, Sliders, Sparkles, Frame, RotateCw, FlipHorizontal, FlipVertical, Maximize2, RefreshCw, Crop, Minus, ClipboardPaste, Scissors, Superscript, Subscript, Baseline, Indent, Outdent, Eraser, Shapes, Smile, QrCode, PenTool, Stamp, Layout, Moon, ZoomIn, Ruler, Grid, List as ListIcon, Copy as CopyIcon, Box, Droplet, Circle, ArrowUp, ArrowDown, MousePointer2, PaintBucket, Undo, Redo, Square, Maximize } from 'lucide-react';

// Interfaces
interface Article {
  id: number;
  title: string;
  category: Category;
  desc: string;
  thumbnail: string;
  content: string;
  date: string;
  author: string;
}

type Category = 'SOP' | 'Panduan' | 'Instruksi Kerja' | 'Safety' | 'Form & Template';

const CATEGORIES: Category[] = ['SOP', 'Panduan', 'Instruksi Kerja', 'Safety', 'Form & Template'];

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; icon: string }> = {
  SOP: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: '📄' },
  Panduan: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: '📘' },
  'Instruksi Kerja': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: '📝' },
  Safety: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: '⚠️' },
  'Form & Template': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '📑' },
};

// Seed Articles
const SEED_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'SOP Inbound Penerimaan Barang',
    category: 'SOP',
    desc: 'Standar operasional prosedur untuk proses bongkar muat dan penerimaan barang masuk dari supplier.',
    thumbnail: '',
    content: `
      <h1>SOP Inbound Penerimaan Barang</h1>
      <p><strong>Nomor Dokumen:</strong> SOP-WH-001<br><strong>Versi:</strong> 2.1<br><strong>Departemen:</strong> Logistik &amp; Pergudangan</p>
      
      <h2>1. Tujuan Prosedur</h2>
      <p>Memastikan seluruh proses penerimaan barang (inbound) dari supplier maupun distributor berjalan tertib, aman, terdokumentasi dengan baik, serta sesuai dengan pesanan pembelian (Purchase Order) yang sah.</p>
      
      <blockquote>
        <strong>PENTING:</strong> Segala bentuk penyimpangan fisik barang wajib dilaporkan dalam waktu maksimal 1x24 jam menggunakan Formulir Ketidaksesuaian Barang (FKB).
      </blockquote>

      <h2>2. Langkah Kerja Alur Inbound</h2>
      <ol>
        <li><strong>Jadwal Kedatangan:</strong> Admin gudang memverifikasi jadwal kedatangan truk supplier di sistem antrean (WMS).</li>
        <li><strong>Pemeriksaan Dokumen:</strong> Petugas memeriksa kecocokan Surat Jalan (SJ) dengan Purchase Order (PO). Dokumen wajib dicap dan ditandatangani.</li>
        <li><strong>Bongkar Muat &amp; Penataan:</strong> Sopir memarkir armada di loading dock yang ditentukan. Bongkar muat dilakukan dengan forklift atau pallet jack secara hati-hati.</li>
        <li><strong>Pengecekan Kuantitas &amp; Kualitas:</strong> Barang dihitung, diperiksa kecacatannya, dan dicocokkan dengan manifes SJ.</li>
        <li><strong>Input WMS &amp; Labeling:</strong> Admin mencetak barcode pallet dan menempelkannya sebelum dimasukkan ke dalam sistem stok.</li>
        <li><strong>Put Away (Penyimpanan):</strong> Operator forklift memindahkan pallet ke rak koordinat sesuai arahan sistem WMS.</li>
      </ol>

      <h2>3. Formulir &amp; Checklist Terkait</h2>
      <div class="checklist-item" data-checked="true">
        <input type="checkbox" checked onclick="this.parentElement.setAttribute('data-checked', this.checked ? 'true' : 'false')">
        <span>Checklist Kelengkapan Surat Jalan dan PO</span>
      </div>
      <div class="checklist-item" data-checked="false">
        <input type="checkbox" onclick="this.parentElement.setAttribute('data-checked', this.checked ? 'true' : 'false')">
        <span>Formulir Inspeksi Kerusakan Fisik Barang</span>
      </div>
      <div class="checklist-item" data-checked="false">
        <input type="checkbox" onclick="this.parentElement.setAttribute('data-checked', this.checked ? 'true' : 'false')">
        <span>Lembar Tanda Terima Barang Masuk (LPB)</span>
      </div>

      <h2>4. Standar Layout Penataan Rak Inbound</h2>
      <p>Di bawah ini adalah ilustrasi penataan penempatan muatan agar efisien dan tidak mengganggu alur forklift:</p>
      <span class="media-wrapper layout-block align-center" style="width: 75%;" contenteditable="false">
        <div class="media-toolbar" contenteditable="false">
          <button class="layout-btn active" title="Block">▬</button>
          <div class="sep"></div>
          <button class="size-btn">100%</button>
          <div class="sep"></div>
          <button class="danger" title="Hapus">🗑</button>
        </div>
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="Warehouse shelving diagram">
        <span class="media-caption" contenteditable="true">Gambar 1: Standar penempatan pallet di rak buffer penyimpanan gudang utama.</span>
      </span>
    `,
    date: '2026-07-10',
    author: 'Manager Gudang',
  },
  {
    id: 2,
    title: 'Panduan Keselamatan Gudang (K3)',
    category: 'Safety',
    desc: 'Peraturan keselamatan kerja di area gudang untuk meminimalisir risiko cedera dan kecelakaan fatal.',
    thumbnail: '',
    content: `
      <h1>Panduan Keselamatan Kerja (K3) Pergudangan</h1>
      <p><strong>Nomor Dokumen:</strong> HSE-WH-102<br><strong>Status:</strong> Wajib Dipatuhi oleh Semua Karyawan &amp; Tamu</p>

      <h2>1. Aturan Penggunaan Alat Pelindung Diri (APD)</h2>
      <p>Setiap orang yang memasuki area operasional gudang tanpa terkecuali wajib mengenakan APD standar berikut:</p>
      <ul>
        <li><strong>Safety Helmet (Helm Proyek):</strong> Melindungi kepala dari kejatuhan barang rak tinggi.</li>
        <li><strong>Safety Shoes (Sepatu K3):</strong> Wajib sol baja untuk mencegah tertimpa beban berat.</li>
        <li><strong>High-Visibility Vest (Rompi Reflektif):</strong> Agar mudah terlihat oleh operator forklift.</li>
        <li><strong>Sarung Tangan Pelindung:</strong> Digunakan saat melakukan handling barang kasar atau tajam.</li>
      </ul>

      <blockquote>
        ⚠️ <strong>PERINGATAN KERAS:</strong> Melanggar peraturan penggunaan APD di area aktif forklift akan dikenakan sanksi Surat Peringatan Pertama (SP-1).
      </blockquote>

      <h2>2. Batas Kecepatan Kendaraan &amp; Pejalan Kaki</h2>
      <table>
        <thead>
          <tr>
            <th>Jenis Area Gudang</th>
            <th>Batas Kecepatan Maksimal</th>
            <th>Hak Utama Jalan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loading Dock (Bongkar Muat)</td>
            <td>5 km/jam</td>
            <td>Forklift &amp; Reach Truck</td>
          </tr>
          <tr>
            <td>Gang Racking Utama (Aisle)</td>
            <td>8 km/jam</td>
            <td>Pejalan Kaki (Safety Zone Only)</td>
          </tr>
          <tr>
            <td>Halaman Parkir Luar Gudang</td>
            <td>15 km/jam</td>
            <td>Truk Kontainer</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Video Training Keselamatan Kerja (Safety Induction)</h2>
      <p>Saksikan video instruksi keselamatan kerja berikut sebagai bekal pemahaman operasional harian gudang:</p>
      
      <span class="media-wrapper layout-block align-center" style="width: 80%;" contenteditable="false">
        <div class="media-toolbar" contenteditable="false">
          <button class="layout-btn" title="Block">▬</button>
          <div class="sep"></div>
          <button class="danger" title="Hapus">🗑</button>
        </div>
        <span class="video-container">
          <iframe src="https://www.youtube.com/embed/S20m798Zq-0" allowfullscreen></iframe>
        </span>
        <span class="media-caption" contenteditable="true">Video 1: Video pengantar keselamatan pergudangan global standar OSHA.</span>
      </span>
    `,
    date: '2026-07-15',
    author: 'HSE Coordinator',
  },
  {
    id: 3,
    title: 'Instruksi Kerja Stock Opname Harian',
    category: 'Instruksi Kerja',
    desc: 'Langkah-langkah taktis melakukan stock opname (perhitungan stok fisik) harian menggunakan metode Cycle Counting.',
    thumbnail: '',
    content: `
      <h1>Instruksi Kerja: Stock Opname Harian (Cycle Counting)</h1>
      <p><strong>Nomor Dokumen:</strong> IK-WH-023<br><strong>Metode:</strong> Cycle Counting Terjadwal</p>

      <h2>1. Persiapan Dokumen</h2>
      <p>Sebelum memulai penghitungan di rak, pastikan Anda telah dibekali dengan Lembar Kerja Cycle Count (LKCC) yang dicetak langsung dari sistem WMS pagi ini. Jangan membawa pulpen tinta merah saat menghitung barang.</p>

      <h2>2. Langkah Kerja Penghitungan</h2>
      <ol>
        <li>Kunjungi lokasi lorong rak sesuai urutan di lembar kerja (jangan melompat-lompat lorong).</li>
        <li>Scan barcode rak untuk memverifikasi keakuratan koordinat penyimpanan.</li>
        <li>Hitung fisik barang secara manual: sentuh dan hitung per box (Box/Pcs).</li>
        <li>Tulis hasil hitungan fisik pada LKCC pada kolom "Hitung 1".</li>
        <li>Jika terdapat selisih (discrepancy) &gt; 5%, lakukan hitung ulang bersama pengawas area ("Hitung 2").</li>
      </ol>

      <h2>3. Tindakan Setelah Penghitungan</h2>
      <p>Kembalikan lembar hasil hitung fisik yang telah ditandatangani ke meja Admin Stock Control untuk langsung di-input ke sistem. Jangan menunda penyerahan kertas di hari berikutnya.</p>
    `,
    date: '2026-07-20',
    author: 'Lead Inventory',
  },
];

export default function App() {
  // --- States ---
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Admin & Login states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  
  // Editor States
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  
  // Document Zoom State
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editCategory, setEditCategory] = useState<Category>('SOP');
  const [editDesc, setEditDesc] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [initialEditContent, setInitialEditContent] = useState('');
  
  // Articles & Selected Article References for Auto-Save
  const articlesRef = useRef<Article[]>([]);
  const selectedArticleRef = useRef<Article | null>(null);

  useEffect(() => {
    articlesRef.current = articles;
  }, [articles]);

  useEffect(() => {
    selectedArticleRef.current = selectedArticle;
  }, [selectedArticle]);

  // Sync the innerHTML of contentEditable directly with the selected article or edit state
  // This bypasses React's virtual DOM reconciliation for the editor container,
  // which prevents the cursor from jumping, resets, or typing blocks.
  useEffect(() => {
    if (editorRef.current) {
      if (isEditing) {
        editorRef.current.innerHTML = editorContent;
      } else if (selectedArticle) {
        editorRef.current.innerHTML = selectedArticle.content;
      } else {
        editorRef.current.innerHTML = '';
      }
    }
  }, [isEditing, selectedArticle?.id]);
  
  // Rich Editor Core states
  const [editorContent, setEditorContent] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  
  // Toast notifications
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  // Undo/Redo Stacks
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Drag and Resize Refs & State
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [resizingMedia, setResizingMedia] = useState<{
    element: HTMLElement;
    startX: number;
    startWidth: number;
    parentWidth: number;
  } | null>(null);

  // Color Pickers
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);

  // Contextual Image Formatting states
  const [selectedImageElement, setSelectedImageElement] = useState<HTMLElement | null>(null);
  const [activeRibbonTab, setActiveRibbonTab] = useState<string>('Home');
  const [openImagePopover, setOpenImagePopover] = useState<string | null>(null);
  const [popoverCoords, setPopoverCoords] = useState<{ top: number; left?: number; right?: number } | null>(null);

  // Update popover coords on scroll or resize to keep position aligned
  useEffect(() => {
    if (!openImagePopover) {
      setPopoverCoords(null);
      return;
    }
    const handleScrollOrResize = () => {
      const btn = document.getElementById(`ribbon-btn-${openImagePopover}`);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setPopoverCoords(prev => {
          if (!prev) return null;
          const coords: { top: number; left?: number; right?: number } = {
            top: rect.bottom,
          };
          if (prev.right !== undefined) {
            coords.right = window.innerWidth - rect.right;
          } else {
            coords.left = rect.left;
          }
          return coords;
        });
      }
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, { capture: true });
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [openImagePopover]);
  const [imageWidth, setImageWidth] = useState('60%');
  const [imageHeight, setImageHeight] = useState('auto');
  const [imageRotate, setImageRotate] = useState(0);
  const [imageScaleX, setImageScaleX] = useState(1);
  const [imageScaleY, setImageScaleY] = useState(1);
  const [imageBrightness, setImageBrightness] = useState(100);
  const [imageContrast, setImageContrast] = useState(100);
  const [imageRecolor, setImageRecolor] = useState('none');
  const [imageBorderColor, setImageBorderColor] = useState('#cbd5e1');
  const [imageBorderWidth, setImageBorderWidth] = useState('0px');
  const [imageBorderStyle, setImageBorderStyle] = useState('solid');
  const [imageShadow, setImageShadow] = useState('none');
  const [imageBorderRadius, setImageBorderRadius] = useState('rounded-md');
  const [imageAspectRatio, setImageAspectRatio] = useState('auto');
  const [imageObjectFit, setImageObjectFit] = useState('cover');
  const [imageCaption, setImageCaption] = useState('');

  // --- Initialize App ---
  useEffect(() => {
    // Load articles from localStorage
    const saved = localStorage.getItem('wh_articles');
    if (saved) {
      const parsed = JSON.parse(saved);
      setArticles(parsed);
      if (parsed.length > 0) {
        setSelectedArticle(parsed[0]);
      }
    } else {
      // Seed initial data
      localStorage.setItem('wh_articles', JSON.stringify(SEED_ARTICLES));
      setArticles(SEED_ARTICLES);
      setSelectedArticle(SEED_ARTICLES[0]);
    }

    // Load admin login status from sessionStorage
    const adminSession = sessionStorage.getItem('wh_admin_logged');
    if (adminSession === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // --- Show Toast Notification ---
  const showNotification = useCallback((msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ msg, type });
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- Auto-Save Mechanism in Editor ---
  useEffect(() => {
    const currentSelected = selectedArticleRef.current;
    if (!isEditing || !currentSelected) return;
    
    // Autosave triggers 3 seconds after inactivity
    const saveTimer = setTimeout(() => {
      setAutosaveStatus('saving');
      
      const updatedArticles = articlesRef.current.map((art) => {
        if (art.id === currentSelected.id) {
          return {
            ...art,
            title: editTitle,
            category: editCategory,
            desc: editDesc,
            thumbnail: editThumbnail,
            content: editorContent,
            date: new Date().toISOString().split('T')[0],
          };
        }
        return art;
      });

      setArticles(updatedArticles);
      localStorage.setItem('wh_articles', JSON.stringify(updatedArticles));
      
      // Update selected article reference safely
      const updatedCurrent = updatedArticles.find(a => a.id === currentSelected.id);
      if (updatedCurrent) {
        setSelectedArticle(updatedCurrent);
      }

      setTimeout(() => setAutosaveStatus('saved'), 600);
      setTimeout(() => setAutosaveStatus('idle'), 2000);
    }, 3000);

    return () => clearTimeout(saveTimer);
  }, [editTitle, editCategory, editDesc, editThumbnail, editorContent, isEditing]);

  // --- Undo / Redo implementation ---
  const pushToHistory = useCallback((html: string) => {
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(html);
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  }, [historyStack, historyIndex]);

  // --- Keyboard Handler for Deleting Selected Image ---
  useEffect(() => {
    if (!selectedImageElement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl) {
        const isInput = activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA';
        const isContentEditableText = activeEl.getAttribute('contenteditable') === 'true' && activeEl !== editorRef.current;
        if (isInput || isContentEditableText) {
          return;
        }
      }

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        selectedImageElement.remove();
        setSelectedImageElement(null);
        setActiveRibbonTab('text');
        if (editorRef.current) {
          const html = editorRef.current.innerHTML;
          setEditorContent(html);
          pushToHistory(html);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageElement, pushToHistory]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      const content = historyStack[newIdx];
      setEditorContent(content);
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
      }
      showNotification('Undo Berhasil', 'info');
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      const content = historyStack[newIdx];
      setEditorContent(content);
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
      }
      showNotification('Redo Berhasil', 'info');
    }
  };

  // --- Admin Login & Logout Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('wh_admin_logged', 'true');
      setShowLoginModal(false);
      showNotification('Berhasil Login sebagai Admin', 'success');
    } else {
      showNotification('Username atau password salah!', 'error');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('wh_admin_logged');
    showNotification('Sesi Admin telah berakhir', 'info');
  };

  // --- Delete Article ---
  const handleDeleteArticle = (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel dokumen ini secara permanen?')) return;
    const filtered = articles.filter(a => a.id !== id);
    setArticles(filtered);
    localStorage.setItem('wh_articles', JSON.stringify(filtered));
    showNotification('Dokumen berhasil dihapus', 'success');
    setIsEditing(false);
    if (filtered.length > 0) {
      setSelectedArticle(filtered[0]);
    } else {
      setSelectedArticle(null);
    }
  };

  // --- Create New Article ---
  const handleCreateNew = () => {
    if (!isAdmin) {
      setShowLoginModal(true);
      showNotification('Anda harus login sebagai Admin terlebih dahulu', 'warning');
      return;
    }

    const newArticle: Article = {
      id: Date.now(),
      title: 'Judul Dokumen Baru',
      category: 'SOP',
      desc: 'Masukkan deskripsi singkat tentang isi dokumen pengetahuan di sini.',
      thumbnail: '',
      content: `<h1>Judul Dokumen Baru</h1><p>Mulai tulis konten dokumen pengetahuan atau Standard Operating Procedure (SOP) di sini...</p>`,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
    };

    const updated = [newArticle, ...articles];
    setArticles(updated);
    localStorage.setItem('wh_articles', JSON.stringify(updated));
    setSelectedArticle(newArticle);
    
    // Set Edit states immediately
    setEditTitle(newArticle.title);
    setEditCategory(newArticle.category);
    setEditDesc(newArticle.desc);
    setEditThumbnail(newArticle.thumbnail);
    setEditorContent(newArticle.content);
    setInitialEditContent(newArticle.content);
    
    // Initialize Undo history
    setHistoryStack([newArticle.content]);
    setHistoryIndex(0);

    setActiveRibbonTab('Home'); // Reset ribbon tab ke Home saat buat baru
    setIsEditing(true);
    showNotification('Dokumen baru dibuat. Mode edit aktif.', 'success');
  };

  // --- Start Editing Mode ---
  const handleStartEdit = () => {
    if (!selectedArticle) return;
    setEditTitle(selectedArticle.title);
    setEditCategory(selectedArticle.category);
    setEditDesc(selectedArticle.desc || '');
    setEditThumbnail(selectedArticle.thumbnail || '');
    setEditorContent(selectedArticle.content);
    setInitialEditContent(selectedArticle.content);
    
    // Set history stack
    setHistoryStack([selectedArticle.content]);
    setHistoryIndex(0);

    setActiveRibbonTab('Home'); // Reset ribbon tab ke Home saat mulai edit
    setIsEditing(true);
    showNotification('Mode edit aktif', 'info');
  };

  // --- Save & Close Editor ---
  const handleSaveAndClose = () => {
    if (!selectedArticle) return;
    
    const updatedArticles = articles.map((art) => {
      if (art.id === selectedArticle.id) {
        return {
          ...art,
          title: editTitle.trim() || 'Untitled',
          category: editCategory,
          desc: editDesc.trim(),
          thumbnail: editThumbnail,
          content: editorContent,
          date: new Date().toISOString().split('T')[0],
        };
      }
      return art;
    });

    setArticles(updatedArticles);
    localStorage.setItem('wh_articles', JSON.stringify(updatedArticles));
    
    const saved = updatedArticles.find(a => a.id === selectedArticle.id);
    if (saved) {
      setSelectedArticle(saved);
    }
    
    setIsEditing(false);
    setSelectedImageElement(null);
    setActiveRibbonTab('text');
    showNotification('Seluruh perubahan berhasil disimpan!', 'success');
  };

  // --- Dynamic Image Formatting updates handler ---
  const updateSelectedImage = (updates: {
    width?: string;
    height?: string;
    rotate?: number;
    brightness?: number;
    contrast?: number;
    recolor?: string;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: string;
    shadow?: string;
    borderRadius?: string;
    aspectRatio?: string;
    objectFit?: string;
    caption?: string;
    layout?: 'layout-block' | 'layout-float-left' | 'layout-float-right' | 'layout-inline';
    scaleX?: number;
    scaleY?: number;
  }) => {
    if (!selectedImageElement) return;

    // 1. Update layout on the wrapper span
    if (updates.layout !== undefined) {
      selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center');
      if (updates.layout === 'layout-block') {
        selectedImageElement.classList.add('layout-block', 'align-center');
      } else {
        selectedImageElement.classList.add(updates.layout);
      }
    }

    // 2. Update width on the wrapper span
    if (updates.width !== undefined) {
      selectedImageElement.style.width = updates.width;
      setImageWidth(updates.width);
    }

    // 3. Update the inner img element styles and attributes
    const img = selectedImageElement.querySelector('img');
    if (img) {
      if (updates.height !== undefined) {
        img.style.height = updates.height;
        setImageHeight(updates.height);
      }

      // Rotate & scale (flip/mirror)
      let currentRotate = updates.rotate !== undefined ? updates.rotate : imageRotate;
      let currentScaleX = updates.scaleX !== undefined ? updates.scaleX : imageScaleX;
      let currentScaleY = updates.scaleY !== undefined ? updates.scaleY : imageScaleY;

      if (updates.rotate !== undefined) setImageRotate(updates.rotate);
      if (updates.scaleX !== undefined) setImageScaleX(updates.scaleX);
      if (updates.scaleY !== undefined) setImageScaleY(updates.scaleY);

      let transformParts = [];
      if (currentRotate !== 0) transformParts.push(`rotate(${currentRotate}deg)`);
      if (currentScaleX !== 1) transformParts.push(`scaleX(${currentScaleX})`);
      if (currentScaleY !== 1) transformParts.push(`scaleY(${currentScaleY})`);
      
      img.style.transform = transformParts.join(' ') || 'none';
      img.style.transition = 'transform 0.3s ease, filter 0.2s ease';
      img.setAttribute('data-rotate', currentRotate.toString());
      img.setAttribute('data-scalex', currentScaleX.toString());
      img.setAttribute('data-scaley', currentScaleY.toString());

      // Filter attributes
      let b = updates.brightness !== undefined ? updates.brightness : imageBrightness;
      let c = updates.contrast !== undefined ? updates.contrast : imageContrast;
      let rec = updates.recolor !== undefined ? updates.recolor : imageRecolor;

      if (updates.brightness !== undefined) setImageBrightness(updates.brightness);
      if (updates.contrast !== undefined) setImageContrast(updates.contrast);
      if (updates.recolor !== undefined) setImageRecolor(updates.recolor);

      let filterParts = [`brightness(${b}%)`, `contrast(${c}%)`];
      if (rec === 'grayscale') filterParts.push('grayscale(100%)');
      else if (rec === 'sepia') filterParts.push('sepia(100%)');
      else if (rec === 'invert') filterParts.push('invert(100%)');
      else if (rec === 'hue-90') filterParts.push('hue-rotate(90deg)');
      else if (rec === 'hue-180') filterParts.push('hue-rotate(180deg)');

      img.style.filter = filterParts.join(' ');

      // Borders
      let bc = updates.borderColor !== undefined ? updates.borderColor : imageBorderColor;
      let bw = updates.borderWidth !== undefined ? updates.borderWidth : imageBorderWidth;
      let bs = updates.borderStyle !== undefined ? updates.borderStyle : imageBorderStyle;

      if (updates.borderColor !== undefined) setImageBorderColor(updates.borderColor);
      if (updates.borderWidth !== undefined) setImageBorderWidth(updates.borderWidth);
      if (updates.borderStyle !== undefined) setImageBorderStyle(updates.borderStyle);

      img.style.borderColor = bc;
      img.style.borderWidth = bw;
      img.style.borderStyle = bs;

      // Shadows
      let sh = updates.shadow !== undefined ? updates.shadow : imageShadow;
      if (updates.shadow !== undefined) setImageShadow(updates.shadow);

      const shadowClasses = ['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner'];
      img.classList.remove(...shadowClasses);
      if (sh && sh !== 'none') {
        img.classList.add(sh);
      }

      // Border Radius
      let br = updates.borderRadius !== undefined ? updates.borderRadius : imageBorderRadius;
      if (updates.borderRadius !== undefined) setImageBorderRadius(updates.borderRadius);

      const radiusClasses = ['rounded-none', 'rounded-xs', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'];
      img.classList.remove(...radiusClasses);
      if (br && br !== 'none') {
        img.classList.add(br);
      }

      // Aspect Ratio
      let ar = updates.aspectRatio !== undefined ? updates.aspectRatio : imageAspectRatio;
      if (updates.aspectRatio !== undefined) setImageAspectRatio(updates.aspectRatio);
      img.style.aspectRatio = ar;

      // Object Fit
      let ofit = updates.objectFit !== undefined ? updates.objectFit : imageObjectFit;
      if (updates.objectFit !== undefined) setImageObjectFit(updates.objectFit);
      img.style.objectFit = ofit;
    }

    // Caption
    if (updates.caption !== undefined) {
      setImageCaption(updates.caption);
      let capEl = selectedImageElement.querySelector('.media-caption') as HTMLElement;
      if (updates.caption === '') {
        if (capEl) capEl.remove();
      } else {
        if (!capEl) {
          capEl = document.createElement('span');
          capEl.className = 'media-caption';
          capEl.setAttribute('contenteditable', 'true');
          selectedImageElement.appendChild(capEl);
        }
        capEl.textContent = updates.caption;
      }
    }

    // 4. Propagate updates to outer state & history
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setEditorContent(html);
      pushToHistory(html);
    }
  };

  // --- Rich Text Command Execution helper ---
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const updatedHTML = editorRef.current.innerHTML;
      setEditorContent(updatedHTML);
      pushToHistory(updatedHTML);
    }
  };

  // Check interactive format states
  const checkSelectionFormats = () => {
    const formats: string[] = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('strikeThrough')) formats.push('strikethrough');
    setActiveFormats(formats);
  };

  // --- HTML Media Toolbar Generator helper ---
  const wrapWithMediaHTML = (innerContent: string, width: string = '50%', isVideo: boolean = false) => {
    return `<span class="media-wrapper layout-block align-center" style="width: ${width};" contenteditable="false" data-media-type="${isVideo ? 'video' : 'image'}">
      <div class="media-toolbar" contenteditable="false">
        <button type="button" class="layout-btn" data-action="layout-block" title="Posisikan Tengah (Baris Sendiri)">▬</button>
        <button type="button" class="layout-btn" data-action="layout-float-left" title="Samping Kiri (Teks Kanan)">⬅</button>
        <button type="button" class="layout-btn" data-action="layout-float-right" title="Samping Kanan (Teks Kiri)">➡</button>
        <div class="sep"></div>
        <button type="button" class="size-btn" data-action="w25">25%</button>
        <button type="button" class="size-btn" data-action="w50">50%</button>
        <button type="button" class="size-btn" data-action="w75">75%</button>
        <button type="button" class="size-btn" data-action="w100">100%</button>
        <div class="sep"></div>
        ${!isVideo ? `<button type="button" data-action="rotate" title="Putar Gambar 90°">↻</button>` : ''}
        <button type="button" data-action="caption" title="Beri Keterangan Gambar">💬</button>
        <div class="sep"></div>
        <button type="button" class="danger" data-action="delete" title="Hapus Media">🗑</button>
      </div>
      ${innerContent}
      <span class="resize-handle"></span>
    </span>&nbsp;`;
  };

  // --- Handle Media Interactions (Delegation) ---
  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // Check if clicked inside or on a media wrapper
    const mediaWrapper = target.closest('.media-wrapper') as HTMLElement;
    
    // Remove "selected" from all other wrappers first
    const allWrappers = editorRef.current?.querySelectorAll('.media-wrapper');
    allWrappers?.forEach(w => {
      if (w !== mediaWrapper) {
        w.classList.remove('selected');
      }
    });

    if (mediaWrapper) {
      e.stopPropagation();
      mediaWrapper.classList.add('selected');

      const isImg = mediaWrapper.getAttribute('data-media-type') === 'image';
      if (isImg) {
        setSelectedImageElement(mediaWrapper);
        setActiveRibbonTab('Format');
        const img = mediaWrapper.querySelector('img');
        if (img) {
          // Parse width
          let w = mediaWrapper.style.width || '60%';
          setImageWidth(w);

          // Parse height
          let h = img.style.height || 'auto';
          setImageHeight(h);

          // Parse rotation
          let rot = img.getAttribute('data-rotate') || '0';
          setImageRotate(parseInt(rot));

          // Parse scales
          let scX = img.getAttribute('data-scalex') || '1';
          setImageScaleX(parseFloat(scX));

          let scY = img.getAttribute('data-scaley') || '1';
          setImageScaleY(parseFloat(scY));

          // Parse filter presets
          let filterStr = img.style.filter || '';
          let bMatch = filterStr.match(/brightness\((\d+)%\)/);
          setImageBrightness(bMatch ? parseInt(bMatch[1]) : 100);

          let cMatch = filterStr.match(/contrast\((\d+)%\)/);
          setImageContrast(cMatch ? parseInt(cMatch[1]) : 100);

          if (filterStr.includes('grayscale(100%)')) {
            setImageRecolor('grayscale');
          } else if (filterStr.includes('sepia(100%)')) {
            setImageRecolor('sepia');
          } else if (filterStr.includes('invert(100%)')) {
            setImageRecolor('invert');
          } else if (filterStr.includes('hue-rotate(90deg)')) {
            setImageRecolor('hue-90');
          } else if (filterStr.includes('hue-rotate(180deg)')) {
            setImageRecolor('hue-180');
          } else {
            setImageRecolor('none');
          }

          // Parse border styles
          let bc = img.style.borderColor || '#cbd5e1';
          setImageBorderColor(bc);

          let bw = img.style.borderWidth || '0px';
          setImageBorderWidth(bw);

          let bs = img.style.borderStyle || 'solid';
          setImageBorderStyle(bs);

          // Parse shadow classes
          let shadowClass = 'none';
          const shadowClasses = ['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner'];
          for (const s of shadowClasses) {
            if (img.classList.contains(s)) {
              shadowClass = s;
              break;
            }
          }
          setImageShadow(shadowClass);

          // Parse border radius class
          let brClass = 'rounded-md';
          const radiusClasses = ['rounded-none', 'rounded-xs', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'];
          for (const r of radiusClasses) {
            if (img.classList.contains(r)) {
              brClass = r;
              break;
            }
          }
          setImageBorderRadius(brClass);

          // Parse Aspect Ratio and Object Fit
          let aspect = img.style.aspectRatio || 'auto';
          setImageAspectRatio(aspect);

          let fit = img.style.objectFit || 'cover';
          setImageObjectFit(fit);

          // Parse Caption
          let capEl = mediaWrapper.querySelector('.media-caption');
          setImageCaption(capEl ? capEl.textContent || '' : '');
        }
      } else {
        // Clicked on non-image media (e.g., video) - deselect but keep current tab
        setSelectedImageElement(null);
      }

      // Check for button action inside media toolbar
      const button = target.closest('button');
      if (button && mediaWrapper.contains(button)) {
        const action = button.getAttribute('data-action');
        if (!action) return;

        if (action === 'layout-block') {
          mediaWrapper.classList.remove('layout-inline', 'layout-float-left', 'layout-float-right');
          mediaWrapper.classList.add('layout-block', 'align-center');
          setImageWidth(mediaWrapper.style.width || '60%');
        } else if (action === 'layout-float-left') {
          mediaWrapper.classList.remove('layout-inline', 'layout-block', 'align-center', 'layout-float-right');
          mediaWrapper.classList.add('layout-float-left');
        } else if (action === 'layout-float-right') {
          mediaWrapper.classList.remove('layout-inline', 'layout-block', 'align-center', 'layout-float-left');
          mediaWrapper.classList.add('layout-float-right');
        } else if (action === 'w25') {
          mediaWrapper.style.width = '25%';
          setImageWidth('25%');
        } else if (action === 'w50') {
          mediaWrapper.style.width = '50%';
          setImageWidth('50%');
        } else if (action === 'w75') {
          mediaWrapper.style.width = '75%';
          setImageWidth('75%');
        } else if (action === 'w100') {
          mediaWrapper.style.width = '100%';
          setImageWidth('100%');
        } else if (action === 'rotate') {
          const img = mediaWrapper.querySelector('img');
          if (img) {
            const currentRotation = parseInt(img.getAttribute('data-rotate') || '0');
            const nextRotation = (currentRotation + 90) % 360;
            img.setAttribute('data-rotate', nextRotation.toString());
            img.style.transform = `rotate(${nextRotation}deg)`;
            img.style.transition = 'transform 0.3s ease';
            setImageRotate(nextRotation);
          }
        } else if (action === 'caption') {
          let cap = mediaWrapper.querySelector('.media-caption') as HTMLElement;
          if (!cap) {
            const val = prompt('Masukkan keterangan (caption) media:', 'Gambar: ');
            if (val !== null) {
              cap = document.createElement('span');
              cap.className = 'media-caption';
              cap.setAttribute('contenteditable', 'true');
              cap.textContent = val;
              mediaWrapper.appendChild(cap);
            }
          } else {
            const val = prompt('Ubah keterangan (caption) media:', cap.textContent || '');
            if (val === '') {
              cap.remove();
            } else if (val !== null) {
              cap.textContent = val;
            }
          }
        } else if (action === 'delete') {
          if (window.confirm('Hapus media ini dari dokumen?')) {
            mediaWrapper.remove();
            setSelectedImageElement(null);
            // Keep current ribbon tab after deletion
          }
        }

        // Trigger updates
        if (editorRef.current) {
          const html = editorRef.current.innerHTML;
          setEditorContent(html);
          pushToHistory(html);
        }
      }
    } else {
      // Clicked on empty area of editor - just deselect media but keep current ribbon tab
      setSelectedImageElement(null);
    }
  };

  // --- Resize drag handling ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      const mediaWrapper = target.closest('.media-wrapper') as HTMLElement;
      if (mediaWrapper && editorRef.current) {
        e.preventDefault();
        e.stopPropagation();
        
        setResizingMedia({
          element: mediaWrapper,
          startX: e.clientX,
          startWidth: mediaWrapper.offsetWidth,
          parentWidth: editorRef.current.clientWidth - 48,
        });
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingMedia) return;
      
      const deltaX = e.clientX - resizingMedia.startX;
      const newWidthPx = Math.max(80, Math.min(resizingMedia.parentWidth, resizingMedia.startWidth + deltaX));
      const percent = Math.round((newWidthPx / resizingMedia.parentWidth) * 100);
      
      resizingMedia.element.style.width = `${percent}%`;
    };

    const handleMouseUp = () => {
      if (resizingMedia) {
        // Restore pointer-events on iframe
        const iframe = resizingMedia.element.querySelector('iframe');
        if (iframe) {
          iframe.style.pointerEvents = 'auto';
        }
        
        setResizingMedia(null);
        if (editorRef.current) {
          const html = editorRef.current.innerHTML;
          setEditorContent(html);
          pushToHistory(html);
        }
      }
    };

    if (resizingMedia) {
      // Disable pointer-events on iframe during resize to prevent it from capturing mouse events
      const iframe = resizingMedia.element.querySelector('iframe');
      if (iframe) {
        iframe.style.pointerEvents = 'none';
      }
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingMedia, pushToHistory]);

  // --- Link Insertion ---
  const insertLink = () => {
    const url = prompt('Masukkan tautan URL:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  // --- Table Insertion ---
  const insertTableHTML = () => {
    const rows = parseInt(prompt('Jumlah Baris:', '3') || '3');
    const cols = parseInt(prompt('Jumlah Kolom:', '3') || '3');
    if (isNaN(rows) || isNaN(cols)) return;

    let tableHtml = '<table><thead><tr>';
    for (let c = 1; c <= cols; c++) {
      tableHtml += `<th>Kolom ${c}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let r = 1; r <= rows; r++) {
      tableHtml += '<tr>';
      for (let c = 1; c <= cols; c++) {
        tableHtml += `<td>Data baris ${r} kol ${c}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br></p>';

    editorRef.current?.focus();
    executeCommand('insertHTML', tableHtml);
  };

  // --- YouTube Video Embed ---
  const triggerYoutubeEmbed = () => {
    setShowYoutubeModal(true);
    setYoutubeUrl('');
  };

  const executeYoutubeEmbed = () => {
    if (!youtubeUrl) return;
    
    // Extract ID
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ];
    let videoId = '';
    for (const p of patterns) {
      const match = youtubeUrl.match(p);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      showNotification('Link YouTube tidak valid. Mohon periksa kembali!', 'error');
      return;
    }

    const iframeHtml = `<div class="video-container" style="width: 100%; height: 0; padding-bottom: 56.25%; position: relative;">
      <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
    </div>`;
    
    const wrapper = wrapWithMediaHTML(iframeHtml, '75%', true);
    editorRef.current?.focus();
    executeCommand('insertHTML', wrapper);
    setShowYoutubeModal(false);
    showNotification('Video YouTube berhasil disematkan!', 'success');
  };

  // --- Image Upload Processors ---
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Format file harus berupa gambar!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const imgHtml = `<img src="${base64}" alt="Uploaded image" data-rotate="0">`;
      const wrapper = wrapWithMediaHTML(imgHtml, '60%', false);
      
      editorRef.current?.focus();
      executeCommand('insertHTML', wrapper);
      showNotification('Gambar berhasil diunggah', 'success');
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  // --- Drag and Drop File Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // --- Copy Paste Image & Word Handlers ---
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    let hasImage = false;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          hasImage = true;
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            handleImageFile(file);
          }
          break;
        }
      }
    }

    if (!hasImage) {
      // Clean up MS Word tags if present in standard paste HTML
      const pasteHtml = e.clipboardData?.getData('text/html');
      if (pasteHtml && (pasteHtml.includes('urn:schemas-microsoft-com:office') || pasteHtml.includes('mso-'))) {
        e.preventDefault();
        // Clean up basic mso parameters
        let cleaned = pasteHtml
          .replace(/<o:p>[\s\S]*?<\/o:p>/g, '')
          .replace(/class="Mso[\s\S]*?"/g, '')
          .replace(/style="[\s\S]*?"/g, (match) => {
            // Keep basic alignments, font weight or font colors, strip Mso-specific ones
            if (match.includes('text-align') || match.includes('color') || match.includes('font-weight') || match.includes('background-color')) {
              return match;
            }
            return '';
          });
        
        executeCommand('insertHTML', cleaned);
        showNotification('Teks berhasil disalin & dibersihkan dari Microsoft Word!', 'success');
      }
    }
  };

  // --- Interactive Checklist Clicking in Reading/Viewer Mode ---
  const handleViewerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox') {
      const checkbox = target as HTMLInputElement;
      const checklistItem = checkbox.closest('.checklist-item');
      if (checklistItem && selectedArticle) {
        checklistItem.setAttribute('data-checked', checkbox.checked ? 'true' : 'false');
        
        // Save the updated HTML structure back to storage
        const updatedHtml = editorRef.current ? editorRef.current.innerHTML : '';
        const updatedArticles = articles.map(a => {
          if (a.id === selectedArticle.id) {
            return {
              ...a,
              content: editorRef.current?.innerHTML || a.content,
            };
          }
          return a;
        });
        
        setArticles(updatedArticles);
        localStorage.setItem('wh_articles', JSON.stringify(updatedArticles));
      }
    }
  };

  // --- Copy Shareable Link ---
  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const url = window.location.href;
    navigator.clipboard.writeText(`${url}?doc=${selectedArticle.id}`);
    showNotification('Tautan dokumen berhasil disalin ke papan klip!', 'success');
  };

  // --- Custom Checklist Inserting inside the editor ---
  const insertChecklist = () => {
    const listHtml = `<div class="checklist-item" data-checked="false">
      <input type="checkbox" onclick="this.parentElement.setAttribute('data-checked', this.checked ? 'true' : 'false')">
      <span contenteditable="true">Elemen Checklist Baru (Ubah teks ini...)</span>
    </div><p><br></p>`;
    editorRef.current?.focus();
    executeCommand('insertHTML', listHtml);
  };

  // --- Document printing trigger ---
  const handlePrint = () => {
    window.print();
  };

  // --- Filters data ---
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.desc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getSOPCount = () => articles.filter(a => a.category === 'SOP').length;
  const getPanduanCount = () => articles.filter(a => a.category === 'Panduan' || a.category === 'Instruksi Kerja').length;
  const getSafetyCount = () => articles.filter(a => a.category === 'Safety').length;

  const renderRibbonDropdown = (
    id: string,
    label: string,
    icon: React.ReactNode,
    popoverContent: React.ReactNode,
    alignRight?: boolean
  ) => {
    const isOpen = openImagePopover === id;
    const isActive = (
      (id === 'brightness' && imageBrightness !== 100) ||
      (id === 'contrast' && imageContrast !== 100) ||
      (id === 'recolor' && imageRecolor !== 'none') ||
      (id === 'shadow' && imageShadow !== 'none') ||
      (id === 'borderColor' && imageBorderColor !== '#cbd5e1') ||
      (id === 'borderWidth' && imageBorderWidth !== '0px') ||
      (id === 'borderStyle' && imageBorderStyle !== 'solid') ||
      (id === 'borderRadius' && imageBorderRadius !== 'rounded-md') ||
      (id === 'aspectRatio' && imageAspectRatio !== 'auto') ||
      (id === 'objectFit' && imageObjectFit !== 'cover') ||
      (id === 'position' && selectedImageElement && (selectedImageElement.classList.contains('layout-float-left') || selectedImageElement.classList.contains('layout-float-right') || selectedImageElement.classList.contains('layout-inline'))) ||
      (id === 'rotate' && imageRotate !== 0) ||
      (id === 'flip' && (imageScaleX !== 1 || imageScaleY !== 1)) ||
      (id === 'size' && imageWidth !== '60%')
    );

    return (
      <div className="relative flex items-center h-full">
        <button
          type="button"
          id={`ribbon-btn-${id}`}
          title={label}
          onClick={(e) => {
            if (isOpen) {
              setOpenImagePopover(null);
              setPopoverCoords(null);
            } else {
              const rect = e.currentTarget.getBoundingClientRect();
              const coords: { top: number; left?: number; right?: number } = {
                top: rect.bottom,
              };
              if (alignRight) {
                coords.right = window.innerWidth - rect.right;
              } else {
                coords.left = rect.left;
              }
              setPopoverCoords(coords);
              setOpenImagePopover(id);
            }
          }}
          className={`h-7 px-2.5 rounded-md hover:bg-slate-100 transition-all flex items-center gap-1 border cursor-pointer ${
            isOpen
              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
              : isActive
              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-700 font-semibold shadow-2xs'
              : 'border-transparent text-slate-700 font-medium'
          }`}
        >
          {icon}
          <span className="text-[8px] text-slate-400 ml-0.5">▼</span>
        </button>

        {isOpen && popoverCoords && createPortal(
          <>
            {/* Backdrop for auto-close */}
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setOpenImagePopover(null); setPopoverCoords(null); }} />
            {/* Popover content panel (rendered with fixed positioning to escape overflow scrolling) */}
            <div 
              className="fixed mt-1 bg-white border border-slate-200 shadow-lg rounded-xl p-3 z-50 min-w-[200px] w-max animate-in fade-in slide-in-from-top-1 duration-150 shadow-slate-300"
              style={{
                top: `${popoverCoords.top}px`,
                ...(popoverCoords.left !== undefined ? { left: `${popoverCoords.left}px` } : {}),
                ...(popoverCoords.right !== undefined ? { right: `${popoverCoords.right}px` } : {}),
              }}
            >
              {popoverContent}
            </div>
          </>,
          document.body
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-800 overflow-hidden" id="mainContainer">
      
      {/* Toast Notification */}
      {toast && (
        <div
          id="toast"
          className={`fixed bottom-5 right-5 z-50 flex items-center px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0 opacity-100 ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : toast.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : toast.type === 'warning'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-indigo-50 text-indigo-800 border-indigo-200'
          }`}
        >
          <span className="mr-2">
            {toast.type === 'success' ? '✨' : toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* --- New Top Header Navigation --- */}
      <header className="bg-[#243c5a] border-b border-[#314a6e] h-16 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md print:hidden">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 rounded-lg text-white shadow-sm flex items-center justify-center">
            {/* Custom SVG Factory Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Warehouse Knowledge Base</h1>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block w-[280px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7b93af]" />
            <input
              id="searchInput"
              type="text"
              placeholder="Cari SOP, panduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#1b2f47] text-white placeholder-[#7b93af] text-sm border border-[#314a6e] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 shadow-inner"
            />
          </div>

          {isAdmin ? (
            <>
              <div className="flex items-center space-x-2 bg-[#6b4c2a] border border-[#a67c52] rounded-lg py-1.5 px-3">
                <Shield className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-xs font-bold text-orange-400">Admin Mode</span>
              </div>
              {isEditing ? (
                <div className="flex items-center gap-3 mr-2">
                  <span className="text-xs font-medium flex items-center text-slate-300">
                    {autosaveStatus === 'saving' && (
                      <span className="flex items-center text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping mr-1.5"></span>
                        Menyimpan draf...
                      </span>
                    )}
                    {autosaveStatus === 'saved' && (
                      <span className="text-emerald-400 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Tersimpan
                      </span>
                    )}
                    {autosaveStatus === 'idle' && (
                      <span className="flex items-center">
                        <Save className="h-4 w-4 mr-1" />
                        Autosave
                      </span>
                    )}
                  </span>
                  <button
                    onClick={handleSaveAndClose}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                  >
                    <Check className="h-4 w-4" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                </div>
              ) : (
                <button
                  id="newArticleBtn"
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Artikel</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 border border-[#4a658a] hover:bg-[#314a6e] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              id="loginBtn"
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-1.5 border border-[#4a658a] hover:bg-[#314a6e] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Login Admin</span>
            </button>
          )}
        </div>
      </header>

      {/* --- Navigation Tabs --- */}
      {!isEditing && (
            <div className="bg-[#243c5a] px-6 flex items-end space-x-1 border-b border-[#314a6e] print:hidden overflow-x-auto custom-scrollbar">
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedArticle(null); setIsEditing(false); }}
                className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all border-t-4 whitespace-nowrap ${
                  selectedCategory === 'All' && !selectedArticle
                    ? 'bg-[#314a6e] border-orange-500 text-white'
                    : 'border-transparent text-[#94a9c6] hover:bg-[#2d4666] hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Semua</span>
              </button>
              {CATEGORIES.map((cat) => {
                const colors = CATEGORY_COLORS[cat];
                const isCatSelected = selectedCategory === cat && !selectedArticle;
                return (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedArticle(null); setIsEditing(false); }}
                    className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all border-t-4 whitespace-nowrap ${
                      isCatSelected
                        ? 'bg-[#314a6e] border-orange-500 text-white'
                        : 'border-transparent text-[#94a9c6] hover:bg-[#2d4666] hover:text-white'
                    }`}
                  >
                    <span className="text-base">{colors.icon}</span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
      )}

      {/* --- Main Structural Workspace Layout --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className={`flex-1 flex flex-col min-w-0 bg-[#f4f7f9] ${isEditing ? 'p-0 overflow-hidden' : 'p-6 md:p-8 overflow-y-auto'}`}>
          
          {selectedArticle ? (

            <div className={`w-full mx-auto ${isEditing ? "max-w-none h-full flex flex-col overflow-hidden" : "max-w-5xl space-y-4"}`}>
              {!isEditing && (
                <button 
                  onClick={() => {
                    setSelectedArticle(null);
                  }}
                  className="flex items-center space-x-2 text-sm font-bold text-[#243c5a] hover:text-orange-600 transition-colors mb-4 print:hidden"
                >
                  <span className="text-lg font-normal">←</span>
                  <span>Kembali ke daftar</span>
                </button>
              )}
              
              {!isEditing && (
<div className="px-4">
{/* Action Controls Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 border border-slate-200 rounded-2xl shadow-xs print:hidden">
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Diperbarui: {selectedArticle.date}</span>
                  <span className="text-slate-300">•</span>
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Penulis: {selectedArticle.author}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {!isEditing && (
                    <>
                      {isAdmin && (
                        <>
                          <button
                            onClick={handleStartEdit}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold py-2 px-4 rounded-xl flex items-center space-x-1.5 transition-all shadow-sm"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span>Edit Artikel</span>
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(selectedArticle.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold py-2 px-3 rounded-xl flex items-center space-x-1.5 border border-rose-100 transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Hapus</span>
                          </button>
                        </>
                      )}
                      <button
                        onClick={handlePrint}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-2 px-3 rounded-xl flex items-center space-x-1.5 transition-all"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Cetak / PDF</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-2 px-3 rounded-xl flex items-center space-x-1.5 transition-all"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Bagikan</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            )}

            <div className={`relative flex w-full flex-col ${isEditing ? 'flex-1 overflow-hidden' : ''}`}>
                
                {/* --- HORIZONTAL RIBBON TOOLBAR --- */}
                {isEditing && (
                  <div className="w-full bg-[#f3f4f6] print:hidden z-40 shadow-md border-b border-slate-300 shrink-0" id="editorRibbon">
                    {/* Ribbon Tabs */}
                    <div className="flex px-2 pt-2 gap-0.5 bg-[#f3f4f6] border-b border-slate-300 text-[13px]">
                      {['Home', 'Insert', 'Design', 'View', 'Format'].map(tab => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveRibbonTab(tab)}
                          className={`px-4 py-1.5 rounded-t-md transition-all z-10 ${
                            activeRibbonTab === tab 
                              ? 'bg-white text-blue-600 border-x border-t border-slate-300 mb-[-1px] font-bold' 
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Ribbon Content */}
                    <div className="p-2 bg-white flex items-center gap-3 overflow-x-auto min-h-[90px] custom-scrollbar text-slate-700 text-xs">
                      
                      {activeRibbonTab === 'Home' && (
                        <>
                          {/* Clipboard Group */}
                          <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3 shrink-0">
                             <div className="flex flex-col gap-1">
                               <button className="flex flex-col items-center justify-center p-1 hover:bg-slate-100 rounded" title="Paste (Ctrl+V)"><ClipboardPaste className="h-6 w-6 text-slate-500 mb-1"/><span className="text-[10px]">Paste</span></button>
                             </div>
                             <div className="flex flex-col gap-1 justify-center">
                               <button className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Cut (Ctrl+X)"><Scissors className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Cut</span></button>
                               <button className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Copy (Ctrl+C)"><CopyIcon className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Copy</span></button>
                             </div>
                          </div>

                          {/* Font Group */}
                          <div className="flex flex-col gap-1 border-r border-slate-200 pr-3 shrink-0">
                            <div className="flex items-center gap-1">
                               <select 
                                 onChange={(e) => executeCommand('fontName', e.target.value)}
                                 className="border border-slate-200 rounded p-1 h-7 text-xs bg-slate-50 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
                               >
                                 <option value="Inter, sans-serif">Inter (Sans)</option>
                                 <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                                 <option value="'Playfair Display', serif">Playfair (Serif)</option>
                                 <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                               </select>
                               <select 
                                 onChange={(e) => executeCommand('fontSize', e.target.value)}
                                 className="border border-slate-200 rounded p-1 h-7 text-xs bg-slate-50 w-16 focus:outline-none focus:ring-1 focus:ring-blue-500"
                               >
                                 <option value="1">10px</option>
                                 <option value="2">13px</option>
                                 <option value="3">16px</option>
                                 <option value="4">18px</option>
                                 <option value="5">24px</option>
                                 <option value="6">32px</option>
                                 <option value="7">48px</option>
                               </select>
                               <button onClick={() => executeCommand('removeFormat')} className="p-1 hover:bg-slate-100 rounded" title="Clear Formatting"><Eraser className="h-4 w-4 text-slate-500" /></button>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                               <button onClick={() => executeCommand('bold')} className="p-1.5 hover:bg-slate-100 rounded" title="Bold (Ctrl+B)"><Bold className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('italic')} className="p-1.5 hover:bg-slate-100 rounded" title="Italic (Ctrl+I)"><Italic className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('underline')} className="p-1.5 hover:bg-slate-100 rounded" title="Underline (Ctrl+U)"><Underline className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('strikeThrough')} className="p-1.5 hover:bg-slate-100 rounded" title="Strikethrough"><Strikethrough className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('subscript')} className="p-1.5 hover:bg-slate-100 rounded" title="Subscript"><Subscript className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('superscript')} className="p-1.5 hover:bg-slate-100 rounded" title="Superscript"><Superscript className="h-3.5 w-3.5" /></button>
                               
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               
                               {/* Colors */}
                               <div className="relative flex items-center gap-0.5">
                                 <button onClick={() => { setShowTextColorPicker(!showTextColorPicker); setShowHighlightColorPicker(false); }} className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Text Color"><Palette className="h-3.5 w-3.5 mr-0.5 text-blue-600" /><ChevronDown className="h-3 w-3" /></button>
                                 {showTextColorPicker && (
                                   <div className="absolute top-8 left-0 bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50">
                                     {['#000000', '#334155', '#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb', '#7c3aed', '#db2777', '#4b5563'].map((color) => (
                                       <button key={color} onClick={() => { executeCommand('foreColor', color); setShowTextColorPicker(false); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} />
                                     ))}
                                   </div>
                                 )}
                                 <button onClick={() => { setShowHighlightColorPicker(!showHighlightColorPicker); setShowTextColorPicker(false); }} className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Highlight Color"><Highlighter className="h-3.5 w-3.5 mr-0.5 text-yellow-500" /><ChevronDown className="h-3 w-3" /></button>
                                 {showHighlightColorPicker && (
                                   <div className="absolute top-8 left-0 bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50">
                                     {['transparent', '#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#fef3c7', '#c7d2fe', '#fed7aa', '#e9d5ff', '#ddd6fe'].map((color) => (
                                       <button key={color} onClick={() => { executeCommand('hiliteColor', color); setShowHighlightColorPicker(false); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} title={color === 'transparent' ? 'No Highlight' : color} />
                                     ))}
                                   </div>
                                 )}
                               </div>
                            </div>
                          </div>

                          {/* Paragraph Group */}
                          <div className="flex flex-col gap-1 border-r border-slate-200 pr-3 shrink-0">
                            <div className="flex items-center gap-0.5">
                               <button onClick={() => executeCommand('insertUnorderedList')} className="p-1.5 hover:bg-slate-100 rounded"><List className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('insertOrderedList')} className="p-1.5 hover:bg-slate-100 rounded"><ListOrdered className="h-3.5 w-3.5" /></button>
                               <button onClick={insertChecklist} className="p-1.5 hover:bg-slate-100 rounded" title="Checklist"><CheckSquare className="h-3.5 w-3.5" /></button>
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               <button onClick={() => executeCommand('outdent')} className="p-1.5 hover:bg-slate-100 rounded" title="Decrease Indent"><Outdent className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('indent')} className="p-1.5 hover:bg-slate-100 rounded" title="Increase Indent"><Indent className="h-3.5 w-3.5" /></button>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                               <button onClick={() => executeCommand('justifyLeft')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignLeft className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyCenter')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignCenter className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyRight')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignRight className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyFull')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignJustify className="h-3.5 w-3.5" /></button>
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               <button className="p-1.5 hover:bg-slate-100 rounded" title="Line Spacing"><Baseline className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                          
                          {/* Editing Group */}
                          <div className="flex items-center gap-1 shrink-0 px-2">
                               <button onClick={() => executeCommand('undo')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-500"><Undo className="h-5 w-5 mb-1"/><span className="text-[9px]">Undo</span></button>
                               <button onClick={() => executeCommand('redo')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-500"><Redo className="h-5 w-5 mb-1"/><span className="text-[9px]">Redo</span></button>
                          </div>
                        </>
                      )}

{activeRibbonTab === 'Insert' && (
  <>
    <div className="flex items-center gap-2 border-r border-slate-200 pr-4 shrink-0">
      <button onClick={triggerImageUpload} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <ImageIcon className="h-5 w-5 mb-1 text-blue-500" />
        <span className="text-[10px]">Pictures</span>
      </button>
      <button onClick={insertTableHTML} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <TableIcon className="h-5 w-5 mb-1 text-indigo-500" />
        <span className="text-[10px]">Table</span>
      </button>
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Shapes className="h-5 w-5 mb-1 text-emerald-500" />
        <span className="text-[10px]">Shapes</span>
      </button>
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Smile className="h-5 w-5 mb-1 text-yellow-500" />
        <span className="text-[10px]">Icons</span>
      </button>
      <button onClick={triggerYoutubeEmbed} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Youtube className="h-5 w-5 mb-1 text-red-600" />
        <span className="text-[10px]">YouTube</span>
      </button>
    </div>
    <div className="flex items-center gap-2 border-r border-slate-200 pr-4 shrink-0">
      <button onClick={insertLink} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <LinkIcon className="h-5 w-5 mb-1 text-blue-500" />
        <span className="text-[10px]">Link</span>
      </button>
      <button onClick={() => executeCommand('insertHorizontalRule')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Minus className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Divider</span>
      </button>
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <QrCode className="h-5 w-5 mb-1 text-slate-600" />
        <span className="text-[10px]">QR Code</span>
      </button>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Type className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Text Box</span>
      </button>
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <PenTool className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Signature</span>
      </button>
      <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <FileText className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Page Break</span>
      </button>
    </div>
  </>
)}

                      {activeRibbonTab === 'Design' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Palette className="h-6 w-6 mb-1 text-purple-500"/><span className="text-[10px]">Themes</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><PaintBucket className="h-6 w-6 mb-1 text-pink-500"/><span className="text-[10px]">Colors</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Type className="h-6 w-6 mb-1 text-slate-700"/><span className="text-[10px]">Fonts</span></button>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Stamp className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Watermark</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Square className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Page Borders</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Moon className="h-6 w-6 mb-1 text-slate-600"/><span className="text-[10px]">Dark Mode</span></button>
                        </div>
                      )}

                      {activeRibbonTab === 'View' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Zoom</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Maximize className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Full Screen</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><ListIcon className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Nav Pane</span></button>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <div className="flex flex-col gap-1 text-[10px]">
                            <label className="flex items-center gap-1"><input type="checkbox" className="rounded border-slate-300" defaultChecked/> Ruler</label>
                            <label className="flex items-center gap-1"><input type="checkbox" className="rounded border-slate-300"/> Gridlines</label>
                          </div>
                          <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 ml-4"><Printer className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Print Preview</span></button>
                        </div>
                      )}

                      {activeRibbonTab === 'Format' && (
                        <div className="flex items-center gap-4 shrink-0">
                          {/* Object Alignment Dropdown */}
                          <div className="relative flex items-center h-full">
                            <button
                              type="button"
                              id="ribbon-btn-align-object"
                              title="Align Object"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const coords: { top: number; left: number } = {
                                  top: rect.bottom,
                                  left: rect.left,
                                };
                                setPopoverCoords(coords);
                                setOpenImagePopover(openImagePopover === 'alignObject' ? null : 'alignObject');
                              }}
                              className={`h-7 px-2.5 rounded-md hover:bg-slate-100 transition-all flex items-center gap-1 border cursor-pointer ${
                                openImagePopover === 'alignObject'
                                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                                  : 'border-transparent text-slate-700 font-medium'
                              }`}
                            >
                              <Layout className="h-4 w-4" />
                              <span className="text-[8px] text-slate-400 ml-0.5">▼</span>
                            </button>

                            {openImagePopover === 'alignObject' && popoverCoords && createPortal(
                              <>
                                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setOpenImagePopover(null); setPopoverCoords(null); }} />
                                <div 
                                  className="fixed mt-1 bg-white border border-slate-200 shadow-lg rounded-xl p-2 z-50 min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-150"
                                  style={{
                                    top: `${popoverCoords.top}px`,
                                    left: `${popoverCoords.left}px`,
                                  }}
                                >
                                  <div className="text-[10px] font-semibold text-slate-500 mb-2 px-2">Align Object</div>
                                  <div className="flex flex-col gap-1">
                                    <button
                                      onClick={() => {
                                        if (selectedImageElement) {
                                          selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center', 'align-left', 'align-right');
                                          selectedImageElement.classList.add('layout-block', 'align-left');
                                          pushToHistory(editorRef.current!.innerHTML);
                                        }
                                        setOpenImagePopover(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded text-sm text-slate-700"
                                    >
                                      <AlignLeft className="h-4 w-4" />
                                      <span>Align Left</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (selectedImageElement) {
                                          selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center', 'align-left', 'align-right');
                                          selectedImageElement.classList.add('layout-block', 'align-center');
                                          pushToHistory(editorRef.current!.innerHTML);
                                        }
                                        setOpenImagePopover(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded text-sm text-slate-700"
                                    >
                                      <AlignCenter className="h-4 w-4" />
                                      <span>Align Center</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (selectedImageElement) {
                                          selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center', 'align-left', 'align-right');
                                          selectedImageElement.classList.add('layout-block', 'align-right');
                                          pushToHistory(editorRef.current!.innerHTML);
                                        }
                                        setOpenImagePopover(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded text-sm text-slate-700"
                                    >
                                      <AlignRight className="h-4 w-4" />
                                      <span>Align Right</span>
                                    </button>
                                    <div className="h-px bg-slate-200 my-1"></div>
                                    <button
                                      onClick={() => {
                                        if (selectedImageElement) {
                                          selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center', 'align-left', 'align-right');
                                          selectedImageElement.classList.add('layout-float-left');
                                          pushToHistory(editorRef.current!.innerHTML);
                                        }
                                        setOpenImagePopover(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded text-sm text-slate-700"
                                    >
                                      <Layout className="h-4 w-4 rotate-90" />
                                      <span>Float Left</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (selectedImageElement) {
                                          selectedImageElement.classList.remove('layout-block', 'layout-float-left', 'layout-float-right', 'layout-inline', 'align-center', 'align-left', 'align-right');
                                          selectedImageElement.classList.add('layout-float-right');
                                          pushToHistory(editorRef.current!.innerHTML);
                                        }
                                        setOpenImagePopover(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded text-sm text-slate-700"
                                    >
                                      <Layout className="h-4 w-4 -rotate-90" />
                                      <span>Float Right</span>
                                    </button>
                                  </div>
                                </div>
                              </>,
                              document.body
                            )}
                          </div>
                          
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><Crop className="h-6 w-6 mb-1"/><span className="text-[10px]">Crop</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><RotateCw className="h-6 w-6 mb-1"/><span className="text-[10px]">Rotate</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><Box className="h-6 w-6 mb-1"/><span className="text-[10px]">Shadow</span></button>
                        </div>
                      )}

                    </div>
                  </div>
                )}
                
                <div className={`flex-1 min-w-0 flex flex-col items-center w-full bg-[#f4f7f9] ${isEditing ? 'p-4 sm:p-8 overflow-y-auto' : 'p-4 sm:p-8 space-y-6'}`}>
                  {/* --- ARTICLE CORE META INPUTS (MOVED OUT OF RIBBON) --- */}
              {isEditing && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm print:hidden">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Judul Dokumen</label>
                      <input
                        type="text"
                        placeholder="Masukkan Judul Dokumen Utama..."
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="w-full md:w-52">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Kategori Folder</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as Category)}
                        className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Deskripsi Singkat</label>
                      <input
                        type="text"
                        placeholder="Deskripsi singkat atau sub-judul halaman..."
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}
                  {/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}
              <div
                className="document-page relative p-12 custom-scrollbar transition-transform duration-200"
                id="articleView"
                onDragOver={isEditing ? handleDragOver : undefined}
                onDrop={isEditing ? handleDrop : undefined}
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  marginBottom: zoomLevel > 100 ? `${(zoomLevel - 100)}%` : '0'
                }}
              >
                
                {/* Meta Title block inside Reading sheet */}
                {!isEditing && (
                  <div className="border-b border-slate-100 pb-5 mb-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${CATEGORY_COLORS[selectedArticle.category].bg} ${CATEGORY_COLORS[selectedArticle.category].text} border ${CATEGORY_COLORS[selectedArticle.category].border}`}>
                        {CATEGORY_COLORS[selectedArticle.category].icon} {selectedArticle.category}
                      </span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-2" id="viewTitle">
                      {selectedArticle.title}
                    </h1>
                    <p className="text-base text-slate-500 font-medium italic mt-1.5">
                      {selectedArticle.desc || 'Tidak ada deskripsi'}
                    </p>
                  </div>
                )}

                {/* Main Content editable area */}
                <div
                  ref={editorRef}
                  id="contentEditor"
                  contentEditable={isEditing}
                  onInput={(e) => {
                    const html = (e.target as HTMLDivElement).innerHTML;
                    setEditorContent(html);
                    pushToHistory(html);
                  }}
                  onBlur={checkSelectionFormats}
                  onKeyUp={checkSelectionFormats}
                  onMouseUp={checkSelectionFormats}
                  onPaste={isEditing ? handlePaste : undefined}
                  onClick={isEditing ? handleEditorClick : handleViewerClick}
                  onMouseDown={isEditing ? handleMouseDown : undefined}
                  className="editor-content custom-scrollbar"
                  style={{
                    fontFamily: 'inherit',
                  }}
                />

                {isEditing && (
                  <div className="text-[10px] text-slate-400 font-bold text-center mt-12 pt-6 border-t border-dashed border-slate-100 select-none">
                    💡 Tips Editor: Geser handle di pojok kanan bawah gambar untuk me-resize. Drag &amp; drop gambar langsung ke kertas untuk menyisipkan.
                  </div>
                )}

              </div>
                </div>
              </div>

            </div>

          ) : (
            <div className="w-full max-w-6xl mx-auto" id="dashboardState">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Card 1: Total */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center space-x-4">
                  <div className="bg-slate-100 p-3 rounded-lg text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#243c5a] leading-none">{articles.length}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Total Dokumen</p>
                  </div>
                </div>
                {/* Card 2: SOP */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-500">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#243c5a] leading-none">{articles.filter(a => a.category === 'SOP').length}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">SOP</p>
                  </div>
                </div>
                {/* Card 3: Panduan */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#243c5a] leading-none">{articles.filter(a => a.category === 'Panduan').length}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Panduan</p>
                  </div>
                </div>
                {/* Card 4: Safety */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center space-x-4">
                  <div className="bg-rose-50 p-3 rounded-lg text-rose-500">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#243c5a] leading-none">{articles.filter(a => a.category === 'Safety').length}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Safety / K3</p>
                  </div>
                </div>
              </div>

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.length === 0 ? (
                  <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                    <div className="h-16 w-16 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-3xl mb-4">📂</div>
                    <p className="text-slate-500 font-medium">Tidak ada dokumen ditemukan</p>
                  </div>
                ) : (
               filteredArticles.map(art => {
                 const colors = CATEGORY_COLORS[art.category];
                 return (
                   <div 
                     key={art.id} 
                     onClick={() => setSelectedArticle(art)}
                     className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer group"
                   >
                     {/* Top Banner Area */}
                     <div className="bg-[#243c5a] h-32 relative flex items-center justify-center">
                       <span className={`absolute top-3 left-3 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                         {art.category}
                       </span>
                       <div className="text-4xl opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all">
                         {colors.icon}
                       </div>
                       {art.thumbnail && (
                         <img src={art.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay pointer-events-none" />
                       )}
                     </div>
                     
                     {/* Content Area */}
                     <div className="p-5 flex-1 flex flex-col">
                       {/* Hapus onClick dari h4, ganti dengan group-hover agar warna berubah saat kartu di-hover */}
                       <h4 className="text-base font-bold text-[#243c5a] mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                         {art.title}
                       </h4>
                       <p className="text-xs text-slate-500 mb-4 flex-1 line-clamp-2">
                         {art.desc || 'Tidak ada deskripsi tersedia.'}
                       </p>
                       <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-4 border-t border-slate-100">
                         <div className="flex items-center space-x-1">
                           <Clock className="w-3.5 h-3.5" />
                           <span>{art.date}</span>
                         </div>
                         <div className="flex items-center space-x-1 text-orange-500">
                           <Edit2 className="w-3.5 h-3.5" />
                           <span>{art.author}</span>
                         </div>
                       </div>
                       
                       {/* Admin Actions - e.stopPropagation() tetap dipertahankan agar tidak memicu klik kartu */}
                       {isAdmin && (
                         <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-slate-100">
                           <button 
                             onClick={(e) => { e.stopPropagation(); setSelectedArticle(art); setIsEditing(true); }}
                             className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                           >
                             <Edit2 className="w-3 h-3" />
                             <span>Edit</span>
                           </button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDeleteArticle(art.id); }}
                             className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                           >
                             <Trash2 className="w-3 h-3" />
                             <span>Hapus</span>
                           </button>
                         </div>
                       )}
                     </div>
                   </div>
                 );
               })
             )}
              </div>
              
            </div>
          )}

        </main>

        {/* --- ZOOM CONTROLS (Bottom Right) --- */}
        <div className="fixed bottom-6 right-8 bg-white border border-slate-200 rounded-full shadow-lg flex items-center px-4 py-2 space-x-3 z-40 print:hidden opacity-90 hover:opacity-100 transition-opacity">
          <button onClick={() => setZoomLevel(z => Math.max(50, z - 10))} className="text-slate-500 hover:text-slate-800 p-1 hover:bg-slate-100 rounded-full transition-colors">
            <Minus className="h-4 w-4" />
          </button>
          <input 
            type="range" 
            min="50" 
            max="200" 
            step="10" 
            value={zoomLevel} 
            onChange={(e) => setZoomLevel(parseInt(e.target.value))}
            className="w-24 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <button onClick={() => setZoomLevel(z => Math.min(200, z + 10))} className="text-slate-500 hover:text-slate-800 p-1 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 w-10 text-right">{zoomLevel}%</span>
        </div>

      </div>

      {/* --- POPUP WINDOW: YouTube Embed URL --- */}
      {showYoutubeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="ytPopup">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center">
              <Youtube className="h-5 w-5 text-red-600 mr-2" /> Sematkan Video YouTube
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Tempel alamat URL lengkap video YouTube atau Shorts di bawah untuk menambahkannya ke dalam halaman.
            </p>
            <input
              id="ytUrl"
              type="text"
              placeholder="Contoh: https://www.youtube.com/watch?v=xxxx"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="flex items-center justify-end space-x-2.5 mt-6">
              <button
                onClick={() => setShowYoutubeModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={executeYoutubeEmbed}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-indigo-100"
              >
                Sisipkan Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP WINDOW: Admin login Modal --- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="loginModal">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <div className="text-center mb-5">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-2 shadow-xs">
                🔐
              </div>
              <h2 className="text-lg font-black text-slate-900">Login Admin Dokumentasi</h2>
              <p className="text-xs text-slate-400 mt-1">Gunakan otentikasi administrator pergudangan untuk membuka kunci pengeditan.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Username</label>
                <input
                  id="loginUser"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Password</label>
                <input
                  id="loginPass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2.5 mt-2">
                <p className="text-[10px] text-slate-500 flex items-center font-semibold">
                  <span className="mr-1">💡</span> Akun Default: <strong className="text-slate-800 ml-1">admin</strong> / <strong className="text-slate-800">admin123</strong>
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-indigo-100"
                >
                  🔑 Masuk Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invisible file input for trigger upload */}
      <input
        ref={fileInputRef}
        id="editorImageInput"
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

    </div>
  );
}
