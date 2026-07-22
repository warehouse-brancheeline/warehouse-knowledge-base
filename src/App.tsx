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
  SOP: { bg: 'bg-[#f1e9d8]', text: 'text-[#8a6a2c]', border: 'border-[#e4ddd0]', icon: '📄' },
  Panduan: { bg: 'bg-[#eceee7]', text: 'text-[#5c6650]', border: 'border-[#e4ddd0]', icon: '📘' },
  'Instruksi Kerja': { bg: 'bg-[#efeae1]', text: 'text-[#6b5f4f]', border: 'border-[#e4ddd0]', icon: '📝' },
  Safety: { bg: 'bg-[#f2e6e0]', text: 'text-[#96543e]', border: 'border-[#e4ddd0]', icon: '⚠️' },
  'Form & Template': { bg: 'bg-[#f1e9d8]', text: 'text-[#8a6a2c]', border: 'border-[#e4ddd0]', icon: '📑' },
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

  // --- Design Tab: document-level styling ---
  const [docAccentColor, setDocAccentColor] = useState<string>('#a8823d');
  const [docFont, setDocFont] = useState<string>('inherit');
  const [watermarkText, setWatermarkText] = useState<string>('');
  const [pageBorderOn, setPageBorderOn] = useState(false);
  const [docDarkMode, setDocDarkMode] = useState(false);

  const DOC_THEMES: Record<string, { accent: string; font: string }> = {
    'Bronze (Default)': { accent: '#a8823d', font: 'inherit' },
    'Slate Formal': { accent: '#334155', font: 'inherit' },
    'Forest': { accent: '#166534', font: 'inherit' },
    'Sunset': { accent: '#c2410c', font: 'inherit' },
    'Elegant Serif': { accent: '#a8823d', font: "'Fraunces', Georgia, serif" },
  };

  // --- View Tab: zoom / fullscreen / nav pane / ruler / gridlines ---
  const [docZoom, setDocZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNavPane, setShowNavPane] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [showGridlines, setShowGridlines] = useState(false);
  const [navHeadings, setNavHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const refreshNavHeadings = () => {
    if (!editorRef.current) return;
    const headingEls = editorRef.current.querySelectorAll('h1, h2, h3');
    const list: { id: string; text: string; level: number }[] = [];
    headingEls.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.id) htmlEl.id = `heading-${i}-${Date.now()}`;
      list.push({ id: htmlEl.id, text: htmlEl.textContent || '(Tanpa judul)', level: parseInt(htmlEl.tagName.substring(1), 10) });
    });
    setNavHeadings(list);
  };

  const toggleNavPane = () => {
    if (!showNavPane) refreshNavHeadings();
    setShowNavPane(!showNavPane);
  };

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


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

  // --- Word-style List Behavior (Tab/Shift+Tab/Enter/Backspace) ---
  const syncEditorAfterListMutation = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setEditorContent(html);
    pushToHistory(html);
  };

  // Level 1 = item directly in the outermost list. Each further nested ul/ol adds one level.
  const getListLevel = (li: HTMLElement): number => {
    let level = 0;
    let listEl: HTMLElement | null = li.parentElement;
    while (listEl && (listEl.tagName === 'UL' || listEl.tagName === 'OL')) {
      level++;
      const holder = listEl.parentElement;
      if (holder && holder.tagName === 'LI') {
        listEl = holder.parentElement;
      } else {
        break;
      }
    }
    return level;
  };

  // Text belonging directly to this <li>, excluding any nested sub-list's own text.
  const getListItemOwnText = (li: HTMLElement): string => {
    let text = '';
    li.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName;
        if (tag !== 'UL' && tag !== 'OL') text += (node as HTMLElement).textContent || '';
      }
    });
    return text;
  };

  const isCaretAtStartOfListItem = (li: HTMLElement, sel: Selection): boolean => {
    if (!sel.isCollapsed) return true; // a selected range within the line counts as "whole line selected"
    const range = sel.getRangeAt(0);

    const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        let p: Node | null = node.parentNode;
        while (p && p !== li) {
          if (p.nodeType === Node.ELEMENT_NODE && ((p as HTMLElement).tagName === 'UL' || (p as HTMLElement).tagName === 'OL')) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const firstTextNode = walker.nextNode();

    if (!firstTextNode) return true; // empty item — caret is trivially "at start"
    if (range.startContainer === firstTextNode && range.startOffset === 0) return true;
    if (range.startContainer === li && range.startOffset === 0) return true;
    return false;
  };

  // TAB: nest current <li> as a child of the previous sibling <li> (one level deeper)
  const demoteListItem = (li: HTMLLIElement, sel: Selection) => {
    const prevLi = li.previousElementSibling;
    if (!prevLi || prevLi.tagName !== 'LI') return; // first item in the list can't be demoted
    const parentList = li.parentElement as HTMLElement;
    const listTag = parentList.tagName;
    const savedRange = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;

    let nestedList = Array.from(prevLi.children).find((c) => c.tagName === listTag) as HTMLElement | undefined;
    if (!nestedList) {
      nestedList = document.createElement(listTag);
      prevLi.appendChild(nestedList);
    }
    nestedList.appendChild(li); // re-parents li, its text nodes keep their identity

    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  // SHIFT+TAB: move current <li> out to become a sibling right after its former parent item
  const promoteListItem = (li: HTMLLIElement, sel: Selection) => {
    const parentList = li.parentElement as HTMLElement;
    if (!parentList) return;
    const grandLi = parentList.parentElement;
    if (!grandLi || grandLi.tagName !== 'LI') return; // already level 1 — nothing to promote to
    const outerList = grandLi.parentElement as HTMLElement;
    const savedRange = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;

    if (grandLi.nextSibling) outerList.insertBefore(li, grandLi.nextSibling);
    else outerList.appendChild(li);

    if (parentList.children.length === 0) parentList.remove();

    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  // Removes `li` from its list, splitting the list into "before" / "after" parts as needed,
  // and inserts `replacementEl` in its place. If `extraAfterEl` is given (e.g. a nested
  // sub-list that hung off this item), it's re-inserted right after `replacementEl`.
  const splitListAroundItem = (li: HTMLLIElement, replacementEl: HTMLElement, extraAfterEl?: HTMLElement) => {
    const list = li.parentElement as HTMLElement;
    const container = list.parentElement as HTMLElement;
    const listTag = list.tagName;

    const before: Element[] = [];
    const after: Element[] = [];
    let passedLi = false;
    Array.from(list.children).forEach((child) => {
      if (child === li) { passedLi = true; return; }
      if (!passedLi) before.push(child); else after.push(child);
    });

    if (before.length > 0) {
      after.forEach((el) => list.removeChild(el));
      list.removeChild(li);
      container.insertBefore(replacementEl, list.nextSibling);
    } else {
      container.insertBefore(replacementEl, list);
      list.removeChild(li);
      if (after.length === 0) list.remove();
    }

    let afterAnchor: Node = replacementEl;
    if (extraAfterEl) {
      container.insertBefore(extraAfterEl, afterAnchor.nextSibling);
      afterAnchor = extraAfterEl;
    }

    if (after.length > 0) {
      if (before.length > 0) {
        const afterList = document.createElement(listTag);
        after.forEach((el) => afterList.appendChild(el));
        container.insertBefore(afterList, afterAnchor.nextSibling);
      } else {
        container.insertBefore(list, afterAnchor.nextSibling);
      }
    }
  };

  // ENTER on an empty list item: leave the list entirely, become a normal paragraph
  const exitListToParagraph = (li: HTMLLIElement, sel: Selection) => {
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    splitListAroundItem(li, p);
    const range = document.createRange();
    range.setStart(p, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // BACKSPACE at the very start of a level-1 item: drop the bullet, keep the text as a paragraph
  const unwrapListItemToParagraph = (li: HTMLLIElement, sel: Selection) => {
    const savedRange = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;
    const p = document.createElement('p');
    const nestedSubList = Array.from(li.children).find((c) => c.tagName === 'UL' || c.tagName === 'OL') as HTMLElement | undefined;

    Array.from(li.childNodes).forEach((node) => {
      if (node === nestedSubList) return;
      p.appendChild(node); // moved (not cloned) — keeps the same node identity for caret restore
    });
    if (!p.hasChildNodes()) p.innerHTML = '<br>';

    splitListAroundItem(li, p, nestedSubList);

    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    } else {
      const range = document.createRange();
      range.selectNodeContents(p);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      // Markdown-style autoformat: "- "/"* " -> bullet list, "1. " -> numbered list (Word/Docs style)
      const block = getBlockElementForSelection();
      const sel = window.getSelection();
      if (block && block !== editorRef.current && !block.closest('li') && sel && sel.isCollapsed && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preRange = document.createRange();
        preRange.selectNodeContents(block);
        preRange.setEnd(range.startContainer, range.startOffset);
        const textBefore = preRange.toString();
        if (/^[-*]$/.test(textBefore)) {
          e.preventDefault();
          block.textContent = '';
          document.execCommand('insertUnorderedList');
          syncEditorAfterListMutation();
          return;
        }
        if (/^\d+\.$/.test(textBefore)) {
          e.preventDefault();
          block.textContent = '';
          document.execCommand('insertOrderedList');
          syncEditorAfterListMutation();
          return;
        }
      }
    }

    if (e.key !== 'Tab' && e.key !== 'Enter' && e.key !== 'Backspace') return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorRef.current) return;
    const anchorNode = sel.anchorNode;
    if (!anchorNode || !editorRef.current.contains(anchorNode)) return;

    const anchorEl = (anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode as Element : anchorNode.parentElement);
    const li = anchorEl?.closest('li') as HTMLLIElement | null;

    if (e.key === 'Tab') {
      if (li) {
        const atStart = isCaretAtStartOfListItem(li, sel);
        if (atStart) {
          e.preventDefault();
          if (e.shiftKey) promoteListItem(li, sel); else demoteListItem(li, sel);
          syncEditorAfterListMutation();
          return;
        }
        if (e.shiftKey) {
          // Shift+Tab works anywhere inside the item, not just at line start
          e.preventDefault();
          promoteListItem(li, sel);
          syncEditorAfterListMutation();
          return;
        }
      }
      if (!e.shiftKey) {
        // Not in a list (or mid-text without shift): insert plain indentation, don't touch list structure
        e.preventDefault();
        document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
        syncEditorAfterListMutation();
      }
      return;
    }

    if (e.key === 'Enter') {
      if (li && getListItemOwnText(li).trim() === '' && !li.querySelector('ul, ol')) {
        e.preventDefault();
        exitListToParagraph(li, sel);
        syncEditorAfterListMutation();
      }
      // Non-empty item: let the browser's native Enter create the next sibling <li>
      return;
    }

    if (e.key === 'Backspace') {
      if (li && sel.isCollapsed && isCaretAtStartOfListItem(li, sel)) {
        e.preventDefault();
        const level = getListLevel(li);
        if (level > 1) promoteListItem(li, sel);
        else unwrapListItemToParagraph(li, sel);
        syncEditorAfterListMutation();
      }
      return;
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
        // Clicked on non-image media (e.g., video) - still selectable for alignment/layout,
        // just skip the image-only property parsing (rotate, filters, border, etc.)
        setSelectedImageElement(mediaWrapper);
        setActiveRibbonTab('Format');
        let w = mediaWrapper.style.width || '60%';
        setImageWidth(w);
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

  // --- Ribbon Paste / Cut / Copy (Home tab buttons) ---
  const ribbonCopy = async () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      showNotification('Pilih teks terlebih dahulu untuk menyalin.', 'warning');
      return;
    }
    try {
      document.execCommand('copy');
      showNotification('Teks disalin ke papan klip.', 'success');
    } catch {
      showNotification('Gagal menyalin. Coba gunakan Ctrl+C.', 'error');
    }
  };

  const ribbonCut = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      showNotification('Pilih teks terlebih dahulu untuk memotong.', 'warning');
      return;
    }
    try {
      document.execCommand('cut');
      if (editorRef.current) {
        const html = editorRef.current.innerHTML;
        setEditorContent(html);
        pushToHistory(html);
      }
      showNotification('Teks dipotong ke papan klip.', 'success');
    } catch {
      showNotification('Gagal memotong. Coba gunakan Ctrl+X.', 'error');
    }
  };

  const ribbonPaste = async () => {
    editorRef.current?.focus();
    try {
      if (navigator.clipboard && (navigator.clipboard as any).read) {
        const clipItems = await (navigator.clipboard as any).read();
        for (const item of clipItems) {
          const imgType = item.types.find((t: string) => t.startsWith('image/'));
          if (imgType) {
            const blob = await item.getType(imgType);
            const file = new File([blob], 'pasted-image.png', { type: imgType });
            handleImageFile(file);
            return;
          }
        }
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        executeCommand('insertText', text);
        showNotification('Konten ditempel dari papan klip.', 'success');
      }
    } catch {
      // Clipboard permission denied by browser — fall back to native paste shortcut
      showNotification('Izin papan klip ditolak browser. Gunakan Ctrl+V.', 'warning');
    }
  };

  // --- Word-style Indent (moves the block's left margin, not execCommand's blockquote hack) ---
  const INDENT_STEP_PX = 40; // ~0.5 inch per Word indent level

  const getBlockElementForSelection = (): HTMLElement | null => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorRef.current) return null;
    let node: Node | null = sel.getRangeAt(0).startContainer;
    while (node && node !== editorRef.current) {
      if (node.nodeType === 1) {
        const el = node as HTMLElement;
        const display = window.getComputedStyle(el).display;
        if (['block', 'list-item'].includes(display) || /^(P|DIV|H1|H2|H3|H4|LI|BLOCKQUOTE)$/.test(el.tagName)) {
          return el;
        }
      }
      node = node.parentNode;
    }
    return editorRef.current;
  };

  const applyWordIndent = (direction: 'increase' | 'decrease') => {
    const block = getBlockElementForSelection();
    if (!block) return;
    const current = parseInt(block.style.marginLeft || '0', 10) || 0;
    const next = direction === 'increase'
      ? current + INDENT_STEP_PX
      : Math.max(0, current - INDENT_STEP_PX);
    block.style.marginLeft = next > 0 ? `${next}px` : '';
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setEditorContent(html);
      pushToHistory(html);
    }
  };

  // --- Word-style Paragraph Spacing (space before / after, in points) ---
  const applyParagraphSpacing = (before: number, after: number) => {
    const block = getBlockElementForSelection();
    if (!block) return;
    block.style.marginTop = `${before}pt`;
    block.style.marginBottom = `${after}pt`;
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setEditorContent(html);
      pushToHistory(html);
    }
  };

  const applyLineSpacing = (value: string) => {
    const block = getBlockElementForSelection();
    if (!block) return;
    block.style.lineHeight = value;
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setEditorContent(html);
      pushToHistory(html);
    }
  };


  // --- Insert Tab: Shapes ---
  const SHAPE_SVGS: Record<string, string> = {
    rectangle: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80"><rect x="4" y="4" width="112" height="72" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/></svg>',
    circle: '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><circle cx="45" cy="45" r="41" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/></svg>',
    triangle: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="90" viewBox="0 0 100 90"><polygon points="50,4 96,86 4,86" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/></svg>',
    line: '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="20" viewBox="0 0 140 20"><line x1="4" y1="10" x2="136" y2="10" stroke="#334155" stroke-width="3"/></svg>',
    arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="40" viewBox="0 0 140 40"><line x1="4" y1="20" x2="120" y2="20" stroke="#334155" stroke-width="3"/><polygon points="120,8 140,20 120,32" fill="#334155"/></svg>',
  };
  const insertShape = (shape: keyof typeof SHAPE_SVGS) => {
    editorRef.current?.focus();
    executeCommand('insertHTML', `<span contenteditable="false" style="display:inline-block;vertical-align:middle;margin:2px;">${SHAPE_SVGS[shape]}</span>&nbsp;`);
    setOpenImagePopover(null);
  };

  // --- Insert Tab: Icons (emoji) ---
  const ICON_EMOJIS = ['📌','✅','⚠️','🔥','💡','📦','🚧','🔧','📋','⭐','📍','🛠️','🚀','📊','🕒','✔️'];
  const insertIconEmoji = (emoji: string) => {
    editorRef.current?.focus();
    executeCommand('insertText', emoji);
    setOpenImagePopover(null);
  };

  // --- Insert Tab: QR Code ---
  const insertQRCode = () => {
    const content = prompt('Masukkan teks atau URL untuk QR Code:', 'https://');
    if (!content) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(content)}`;
    editorRef.current?.focus();
    const html = wrapWithMediaHTML(`<img src="${qrUrl}" alt="QR Code" class="rounded-md" style="width:100%;height:auto;" />`, '20%', true);
    executeCommand('insertHTML', html);
  };

  // --- Insert Tab: Text Box ---
  const insertTextBoxBlock = () => {
    editorRef.current?.focus();
    const inner = `<div contenteditable="true" class="p-4 border border-dashed border-slate-300 rounded bg-white text-sm text-slate-700" style="min-height:80px;">Klik di sini untuk menulis teks...</div>`;
    const html = wrapWithMediaHTML(inner, '40%', true);
    executeCommand('insertHTML', html);
  };

  // --- Insert Tab: Page Break (visual marker + print pagination) ---
  const insertPageBreak = () => {
    editorRef.current?.focus();
    executeCommand('insertHTML', `<div class="page-break-marker" contenteditable="false">Page Break</div><p><br></p>`);
  };

  // --- Insert Tab: Signature (canvas drawing modal) ---
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingSignature = useRef(false);

  const getCanvasPoint = (canvas: HTMLCanvasElement, e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const handleSignatureStart = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    isDrawingSignature.current = true;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasPoint(canvas, e);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const handleSignatureMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingSignature.current) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasPoint(canvas, e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleSignatureEnd = () => {
    isDrawingSignature.current = false;
  };

  const clearSignatureCanvas = () => {
    const canvas = signatureCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const insertSignatureFromCanvas = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    editorRef.current?.focus();
    const html = wrapWithMediaHTML(`<img src="${dataUrl}" alt="Signature" style="width:100%;height:auto;" />`, '25%', true);
    executeCommand('insertHTML', html);
    setShowSignatureModal(false);
    clearSignatureCanvas();
  };

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
      <header className="bg-[#faf8f4]/90 backdrop-blur-md border-b border-[#e4ddd0] h-16 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50 print:hidden">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full border border-[#22201c]/15 text-[#22201c] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
          </div>
          <h1 className="font-serif-display text-lg text-[#22201c] tracking-tight">Warehouse Knowledge Base</h1>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block w-[280px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#a39a86]" />
            <input
              id="searchInput"
              type="text"
              placeholder="Cari SOP, panduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-[#22201c] placeholder-[#a39a86] text-sm border border-[#e4ddd0] rounded-full focus:outline-none focus:ring-1 focus:ring-[#a8823d] focus:border-[#a8823d]"
            />
          </div>

          {isAdmin ? (
            <>
              <div className="flex items-center space-x-2 bg-[#f1e9d8] border border-[#e4ddd0] rounded-full py-1.5 px-3">
                <Shield className="h-3.5 w-3.5 text-[#a8823d]" />
                <span className="text-xs font-semibold text-[#8a6a2c]">Admin Mode</span>
              </div>
              {isEditing ? (
                <div className="flex items-center gap-3 mr-2">
                  <span className="text-xs font-medium flex items-center text-[#78715f]">
                    {autosaveStatus === 'saving' && (
                      <span className="flex items-center text-[#a8823d]">
                        <span className="h-2 w-2 rounded-full bg-[#a8823d] animate-ping mr-1.5"></span>
                        Menyimpan draf...
                      </span>
                    )}
                    {autosaveStatus === 'saved' && (
                      <span className="text-[#5c6650] flex items-center">
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
                    className="bg-[#22201c] hover:bg-[#3a362e] text-white font-semibold text-sm py-2 px-4 rounded-full flex items-center space-x-1.5 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                </div>
              ) : (
                <button
                  id="newArticleBtn"
                  onClick={handleCreateNew}
                  className="bg-[#22201c] hover:bg-[#3a362e] text-white font-semibold text-sm py-2 px-4 rounded-full flex items-center space-x-1.5 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Artikel</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 border border-[#e4ddd0] hover:bg-[#f1ece2] text-[#22201c] text-sm font-medium py-2 px-4 rounded-full transition-colors"
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
              className="flex items-center space-x-1.5 border border-[#e4ddd0] hover:bg-[#f1ece2] text-[#22201c] text-sm font-medium py-2 px-4 rounded-full transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Login Admin</span>
            </button>
          )}
        </div>
      </header>

      {/* --- Navigation Tabs --- */}
      {!isEditing && (
            <div className="bg-[#faf8f4] px-6 md:px-10 flex items-end space-x-1 border-b border-[#e4ddd0] print:hidden overflow-x-auto custom-scrollbar">
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedArticle(null); setIsEditing(false); }}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  selectedCategory === 'All' && !selectedArticle
                    ? 'border-[#22201c] text-[#22201c]'
                    : 'border-transparent text-[#a39a86] hover:text-[#22201c]'
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
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                      isCatSelected
                        ? 'border-[#22201c] text-[#22201c]'
                        : 'border-transparent text-[#a39a86] hover:text-[#22201c]'
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
        <main className={`flex-1 flex flex-col min-w-0 bg-[#faf8f4] ${isEditing ? 'p-0 overflow-hidden' : 'p-6 md:p-10 overflow-y-auto'}`}>
          
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
                               <button onClick={ribbonPaste} className="flex flex-col items-center justify-center p-1 hover:bg-slate-100 rounded" title="Paste (Ctrl+V)"><ClipboardPaste className="h-6 w-6 text-slate-500 mb-1"/><span className="text-[10px]">Paste</span></button>
                             </div>
                             <div className="flex flex-col gap-1 justify-center">
                               <button onClick={ribbonCut} className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Cut (Ctrl+X)"><Scissors className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Cut</span></button>
                               <button onClick={ribbonCopy} className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Copy (Ctrl+C)"><CopyIcon className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Copy</span></button>
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
                                 <button
                                   type="button"
                                   id="ribbon-btn-textColor"
                                   onClick={(e) => {
                                     const rect = e.currentTarget.getBoundingClientRect();
                                     setPopoverCoords({ top: rect.bottom, left: rect.left });
                                     setOpenImagePopover(openImagePopover === 'textColor' ? null : 'textColor');
                                   }}
                                   className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Text Color"><Palette className="h-3.5 w-3.5 mr-0.5 text-blue-600" /><ChevronDown className="h-3 w-3" /></button>
                                 {openImagePopover === 'textColor' && popoverCoords && createPortal(
                                   <>
                                     <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setOpenImagePopover(null); setPopoverCoords(null); }} />
                                     <div
                                       className="fixed bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50"
                                       style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}
                                     >
                                       {['#000000', '#334155', '#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb', '#7c3aed', '#db2777', '#4b5563'].map((color) => (
                                         <button key={color} onClick={() => { executeCommand('foreColor', color); setOpenImagePopover(null); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} />
                                       ))}
                                     </div>
                                   </>,
                                   document.body
                                 )}
                                 <button
                                   type="button"
                                   id="ribbon-btn-highlightColor"
                                   onClick={(e) => {
                                     const rect = e.currentTarget.getBoundingClientRect();
                                     setPopoverCoords({ top: rect.bottom, left: rect.left });
                                     setOpenImagePopover(openImagePopover === 'highlightColor' ? null : 'highlightColor');
                                   }}
                                   className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Highlight Color"><Highlighter className="h-3.5 w-3.5 mr-0.5 text-yellow-500" /><ChevronDown className="h-3 w-3" /></button>
                                 {openImagePopover === 'highlightColor' && popoverCoords && createPortal(
                                   <>
                                     <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setOpenImagePopover(null); setPopoverCoords(null); }} />
                                     <div
                                       className="fixed bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50"
                                       style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}
                                     >
                                       {['transparent', '#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#fef3c7', '#c7d2fe', '#fed7aa', '#e9d5ff', '#ddd6fe'].map((color) => (
                                         <button key={color} onClick={() => { executeCommand('hiliteColor', color); setOpenImagePopover(null); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} title={color === 'transparent' ? 'No Highlight' : color} />
                                       ))}
                                     </div>
                                   </>,
                                   document.body
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
                               <button onClick={() => applyWordIndent('decrease')} className="p-1.5 hover:bg-slate-100 rounded" title="Decrease Indent"><Outdent className="h-3.5 w-3.5" /></button>
                               <button onClick={() => applyWordIndent('increase')} className="p-1.5 hover:bg-slate-100 rounded" title="Increase Indent"><Indent className="h-3.5 w-3.5" /></button>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                               <button onClick={() => executeCommand('justifyLeft')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignLeft className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyCenter')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignCenter className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyRight')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignRight className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyFull')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignJustify className="h-3.5 w-3.5" /></button>
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               <div className="relative">
                                 <button
                                   type="button"
                                   id="ribbon-btn-lineSpacing"
                                   onClick={(e) => {
                                     const rect = e.currentTarget.getBoundingClientRect();
                                     setPopoverCoords({ top: rect.bottom, left: rect.left });
                                     setOpenImagePopover(openImagePopover === 'lineSpacing' ? null : 'lineSpacing');
                                   }}
                                   className="p-1.5 hover:bg-slate-100 rounded" title="Line & Paragraph Spacing"><Baseline className="h-3.5 w-3.5" />
                                 </button>
                                 {openImagePopover === 'lineSpacing' && popoverCoords && createPortal(
                                   <>
                                     <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setOpenImagePopover(null); setPopoverCoords(null); }} />
                                     <div
                                       className="fixed bg-white border border-slate-200 rounded-lg p-3 shadow-xl z-50 w-56"
                                       style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}
                                     >
                                       <div className="text-[10px] font-semibold text-slate-500 mb-1.5">Line Spacing</div>
                                       <div className="flex flex-col gap-0.5 mb-3">
                                         {[['1.0 (Single)', '1'], ['1.15', '1.15'], ['1.5', '1.5'], ['2.0 (Double)', '2']].map(([label, val]) => (
                                           <button
                                             key={val}
                                             onClick={() => { applyLineSpacing(val); setOpenImagePopover(null); }}
                                             className="text-left px-2 py-1 text-xs rounded hover:bg-slate-100 text-slate-700"
                                           >
                                             {label}
                                           </button>
                                         ))}
                                       </div>
                                       <div className="text-[10px] font-semibold text-slate-500 mb-1.5 border-t border-slate-100 pt-2">Spacing (pt)</div>
                                       <div className="flex items-center gap-2 mb-1.5">
                                         <label className="text-[10px] text-slate-500 w-14">Before</label>
                                         <input
                                           type="number" min={0} max={1584} defaultValue={0}
                                           id="spacing-before-input"
                                           className="border border-slate-200 rounded px-1.5 py-0.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                         />
                                       </div>
                                       <div className="flex items-center gap-2 mb-2">
                                         <label className="text-[10px] text-slate-500 w-14">After</label>
                                         <input
                                           type="number" min={0} max={1584} defaultValue={0}
                                           id="spacing-after-input"
                                           className="border border-slate-200 rounded px-1.5 py-0.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                         />
                                       </div>
                                       <button
                                         onClick={() => {
                                           const beforeEl = document.getElementById('spacing-before-input') as HTMLInputElement;
                                           const afterEl = document.getElementById('spacing-after-input') as HTMLInputElement;
                                           const before = Math.min(1584, Math.max(0, parseInt(beforeEl?.value || '0', 10) || 0));
                                           const after = Math.min(1584, Math.max(0, parseInt(afterEl?.value || '0', 10) || 0));
                                           applyParagraphSpacing(before, after);
                                           setOpenImagePopover(null);
                                         }}
                                         className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 rounded"
                                       >
                                         Terapkan
                                       </button>
                                     </div>
                                   </>,
                                   document.body
                                 )}
                               </div>
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
      <div className="relative">
        <button
          type="button"
          id="ribbon-btn-shapes"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPopoverCoords({ top: rect.bottom, left: rect.left });
            setOpenImagePopover(openImagePopover === 'shapes' ? null : 'shapes');
          }}
          className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
          <Shapes className="h-5 w-5 mb-1 text-emerald-500" />
          <span className="text-[10px]">Shapes</span>
        </button>
        {openImagePopover === 'shapes' && popoverCoords && createPortal(
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenImagePopover(null)} />
            <div className="fixed bg-white border border-slate-200 rounded-lg p-2 shadow-xl z-50 grid grid-cols-3 gap-2" style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}>
              {(Object.keys(SHAPE_SVGS) as Array<keyof typeof SHAPE_SVGS>).map((shape) => (
                <button key={shape} onClick={() => insertShape(shape)} className="p-2 border border-slate-100 rounded hover:bg-slate-50 flex items-center justify-center" title={shape} dangerouslySetInnerHTML={{ __html: SHAPE_SVGS[shape].replace(/width="\d+" height="\d+"/, 'width="40" height="40"') }} />
              ))}
            </div>
          </>,
          document.body
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          id="ribbon-btn-icons"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPopoverCoords({ top: rect.bottom, left: rect.left });
            setOpenImagePopover(openImagePopover === 'icons' ? null : 'icons');
          }}
          className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Smile className="h-5 w-5 mb-1 text-yellow-500" />
        <span className="text-[10px]">Icons</span>
      </button>
        {openImagePopover === 'icons' && popoverCoords && createPortal(
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenImagePopover(null)} />
            <div className="fixed bg-white border border-slate-200 rounded-lg p-2 shadow-xl z-50 grid grid-cols-4 gap-1 w-48" style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}>
              {ICON_EMOJIS.map((emoji) => (
                <button key={emoji} onClick={() => insertIconEmoji(emoji)} className="text-lg p-1.5 hover:bg-slate-100 rounded">{emoji}</button>
              ))}
            </div>
          </>,
          document.body
        )}
      </div>
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
      <button onClick={insertQRCode} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <QrCode className="h-5 w-5 mb-1 text-slate-600" />
        <span className="text-[10px]">QR Code</span>
      </button>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <button onClick={insertTextBoxBlock} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <Type className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Text Box</span>
      </button>
      <button onClick={() => setShowSignatureModal(true)} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <PenTool className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Signature</span>
      </button>
      <button onClick={insertPageBreak} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600">
        <FileText className="h-5 w-5 mb-1 text-slate-500" />
        <span className="text-[10px]">Page Break</span>
      </button>
    </div>
  </>
)}

                      {activeRibbonTab === 'Design' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="relative">
                            <button
                              type="button"
                              id="ribbon-btn-themes"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setPopoverCoords({ top: rect.bottom, left: rect.left });
                                setOpenImagePopover(openImagePopover === 'themes' ? null : 'themes');
                              }}
                              className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Palette className="h-6 w-6 mb-1 text-purple-500"/><span className="text-[10px]">Themes</span></button>
                            {openImagePopover === 'themes' && popoverCoords && createPortal(
                              <>
                                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenImagePopover(null)} />
                                <div className="fixed bg-white border border-slate-200 rounded-lg p-2 shadow-xl z-50 w-48" style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}>
                                  {Object.entries(DOC_THEMES).map(([name, theme]) => (
                                    <button
                                      key={name}
                                      onClick={() => { setDocAccentColor(theme.accent); setDocFont(theme.font); setOpenImagePopover(null); }}
                                      className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-slate-100 text-slate-700"
                                    >
                                      <span className="h-3.5 w-3.5 rounded-full border border-slate-200" style={{ backgroundColor: theme.accent }}></span>
                                      {name}
                                    </button>
                                  ))}
                                </div>
                              </>,
                              document.body
                            )}
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              id="ribbon-btn-colors"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setPopoverCoords({ top: rect.bottom, left: rect.left });
                                setOpenImagePopover(openImagePopover === 'docColors' ? null : 'docColors');
                              }}
                              className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><PaintBucket className="h-6 w-6 mb-1 text-pink-500"/><span className="text-[10px]">Colors</span></button>
                            {openImagePopover === 'docColors' && popoverCoords && createPortal(
                              <>
                                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenImagePopover(null)} />
                                <div className="fixed bg-white border border-slate-200 rounded-lg p-3 shadow-xl z-50 w-52" style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}>
                                  <div className="text-[10px] font-semibold text-slate-500 mb-2">Warna Aksen Dokumen</div>
                                  <div className="grid grid-cols-5 gap-1.5 mb-2">
                                    {['#a8823d', '#334155', '#166534', '#c2410c', '#4f46e5', '#0891b2', '#be185d', '#65a30d', '#78716c', '#1e293b'].map((c) => (
                                      <button key={c} onClick={() => setDocAccentColor(c)} className="h-6 w-6 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
                                    ))}
                                  </div>
                                  <input type="color" value={docAccentColor} onChange={(e) => setDocAccentColor(e.target.value)} className="w-full h-8 rounded border border-slate-200 cursor-pointer" />
                                </div>
                              </>,
                              document.body
                            )}
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              id="ribbon-btn-fonts"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setPopoverCoords({ top: rect.bottom, left: rect.left });
                                setOpenImagePopover(openImagePopover === 'docFonts' ? null : 'docFonts');
                              }}
                              className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Type className="h-6 w-6 mb-1 text-slate-700"/><span className="text-[10px]">Fonts</span></button>
                            {openImagePopover === 'docFonts' && popoverCoords && createPortal(
                              <>
                                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenImagePopover(null)} />
                                <div className="fixed bg-white border border-slate-200 rounded-lg p-2 shadow-xl z-50 w-52" style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}>
                                  {[
                                    ['Default (Inter)', 'inherit'],
                                    ['Elegant Serif (Fraunces)', "'Fraunces', Georgia, serif"],
                                    ['Classic Serif (Georgia)', 'Georgia, serif'],
                                    ['Modern (Space Grotesk)', "'Space Grotesk', sans-serif"],
                                    ['Monospace (Technical)', "'JetBrains Mono', monospace"],
                                  ].map(([label, val]) => (
                                    <button key={val} onClick={() => { setDocFont(val); setOpenImagePopover(null); }} className="block w-full text-left px-2 py-1.5 text-xs rounded hover:bg-slate-100 text-slate-700" style={{ fontFamily: val }}>
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              </>,
                              document.body
                            )}
                          </div>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <button
                            onClick={() => {
                              const val = prompt('Masukkan teks watermark (kosongkan untuk menghapus):', watermarkText || 'DRAFT');
                              if (val !== null) setWatermarkText(val);
                            }}
                            className={`flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded ${watermarkText ? 'text-purple-600' : 'text-slate-600'}`}
                          ><Stamp className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Watermark</span></button>
                          <button
                            onClick={() => setPageBorderOn(!pageBorderOn)}
                            className={`flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded ${pageBorderOn ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}
                          ><Square className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Page Borders</span></button>
                          <button
                            onClick={() => setDocDarkMode(!docDarkMode)}
                            className={`flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded ${docDarkMode ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'}`}
                          ><Moon className="h-6 w-6 mb-1 text-slate-600"/><span className="text-[10px]">Dark Mode</span></button>
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
                  onKeyDown={isEditing ? handleEditorKeyDown : undefined}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                {/* Card 1: Total */}
                <div className="bg-white rounded-lg p-5 border border-[#e4ddd0] flex items-center space-x-4">
                  <div className="p-2.5 rounded-full text-[#a39a86] border border-[#e4ddd0]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#22201c] leading-none">{articles.length}</h3>
                    <p className="text-xs text-[#8a8272] font-medium mt-1.5">Total Dokumen</p>
                  </div>
                </div>
                {/* Card 2: SOP */}
                <div className="bg-white rounded-lg p-5 border border-[#e4ddd0] flex items-center space-x-4">
                  <div className="p-2.5 rounded-full text-[#a8823d] border border-[#e4ddd0]">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#22201c] leading-none">{articles.filter(a => a.category === 'SOP').length}</h3>
                    <p className="text-xs text-[#8a8272] font-medium mt-1.5">SOP</p>
                  </div>
                </div>
                {/* Card 3: Panduan */}
                <div className="bg-white rounded-lg p-5 border border-[#e4ddd0] flex items-center space-x-4">
                  <div className="p-2.5 rounded-full text-[#5c6650] border border-[#e4ddd0]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#22201c] leading-none">{articles.filter(a => a.category === 'Panduan').length}</h3>
                    <p className="text-xs text-[#8a8272] font-medium mt-1.5">Panduan</p>
                  </div>
                </div>
                {/* Card 4: Safety */}
                <div className="bg-white rounded-lg p-5 border border-[#e4ddd0] flex items-center space-x-4">
                  <div className="p-2.5 rounded-full text-[#96543e] border border-[#e4ddd0]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#22201c] leading-none">{articles.filter(a => a.category === 'Safety').length}</h3>
                    <p className="text-xs text-[#8a8272] font-medium mt-1.5">Safety / K3</p>
                  </div>
                </div>
              </div>

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.length === 0 ? (
                  <div className="col-span-full text-center py-16 bg-white rounded-lg border border-dashed border-[#e4ddd0]">
                    <div className="h-16 w-16 mx-auto rounded-full bg-[#f1ece2] text-[#a39a86] flex items-center justify-center text-3xl mb-4">📂</div>
                    <p className="text-[#8a8272] font-medium">Tidak ada dokumen ditemukan</p>
                  </div>
                ) : (
               filteredArticles.map(art => {
                 const colors = CATEGORY_COLORS[art.category];
                 return (
                   <div 
                     key={art.id} 
                     onClick={() => setSelectedArticle(art)}
                     className="bg-white rounded-lg border border-[#e4ddd0] overflow-hidden flex flex-col transition-all hover:shadow-[0_8px_24px_rgba(34,32,28,0.06)] hover:-translate-y-0.5 cursor-pointer group"
                   >
                     {/* Top Banner Area */}
                     <div className="bg-[#f1ece2] h-28 relative flex items-center justify-center border-b border-[#e4ddd0]">
                       <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                         {art.category}
                       </span>
                       <div className="text-3xl opacity-60 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                         {colors.icon}
                       </div>
                       {art.thumbnail && (
                         <img src={art.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" />
                       )}
                     </div>
                     
                     {/* Content Area */}
                     <div className="p-5 flex-1 flex flex-col">
                       {/* Hapus onClick dari h4, ganti dengan group-hover agar warna berubah saat kartu di-hover */}
                       <h4 className="font-serif-display text-base text-[#22201c] mb-2 group-hover:text-[#a8823d] transition-colors line-clamp-2">
                         {art.title}
                       </h4>
                       <p className="text-xs text-[#8a8272] mb-4 flex-1 line-clamp-2">
                         {art.desc || 'Tidak ada deskripsi tersedia.'}
                       </p>
                       <div className="flex items-center justify-between text-[10px] text-[#a39a86] font-medium pt-4 border-t border-[#e4ddd0]">
                         <div className="flex items-center space-x-1">
                           <Clock className="w-3.5 h-3.5" />
                           <span>{art.date}</span>
                         </div>
                         <div className="flex items-center space-x-1 text-[#a8823d]">
                           <Edit2 className="w-3.5 h-3.5" />
                           <span>{art.author}</span>
                         </div>
                       </div>
                       
                       {/* Admin Actions - e.stopPropagation() tetap dipertahankan agar tidak memicu klik kartu */}
                       {isAdmin && (
                         <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-[#e4ddd0]">
                           <button 
                             onClick={(e) => { e.stopPropagation(); setSelectedArticle(art); setIsEditing(true); }}
                             className="flex-1 bg-[#22201c] hover:bg-[#3a362e] text-white text-[11px] font-semibold py-1.5 px-3 rounded-full flex items-center justify-center space-x-1.5 transition-colors"
                           >
                             <Edit2 className="w-3 h-3" />
                             <span>Edit</span>
                           </button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDeleteArticle(art.id); }}
                             className="flex-1 bg-white border border-[#e4ddd0] hover:bg-[#f2e6e0] text-[#96543e] text-[11px] font-semibold py-1.5 px-3 rounded-full flex items-center justify-center space-x-1.5 transition-colors"
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

      {/* --- POPUP WINDOW: Signature Pad Modal --- */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="mb-4">
              <h2 className="text-lg font-black text-slate-900">Tambah Tanda Tangan</h2>
              <p className="text-xs text-slate-400 mt-1">Gambar tanda tangan Anda di bawah ini menggunakan mouse atau layar sentuh.</p>
            </div>
            <canvas
              ref={signatureCanvasRef}
              width={400}
              height={160}
              className="w-full border border-dashed border-slate-300 rounded-lg bg-slate-50 touch-none cursor-crosshair"
              onMouseDown={handleSignatureStart}
              onMouseMove={handleSignatureMove}
              onMouseUp={handleSignatureEnd}
              onMouseLeave={handleSignatureEnd}
              onTouchStart={handleSignatureStart}
              onTouchMove={handleSignatureMove}
              onTouchEnd={handleSignatureEnd}
            />
            <div className="flex items-center justify-between mt-4 gap-2">
              <button onClick={clearSignatureCanvas} className="text-sm font-semibold text-slate-500 hover:text-slate-700 px-3 py-2">Bersihkan</button>
              <div className="flex items-center gap-2">
                <button onClick={() => { setShowSignatureModal(false); clearSignatureCanvas(); }} className="text-sm font-semibold text-slate-500 hover:bg-slate-100 px-4 py-2 rounded-lg">Batal</button>
                <button onClick={insertSignatureFromCanvas} className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">Sisipkan</button>
              </div>
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
