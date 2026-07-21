import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Folder,
  BookOpen,
  Shield,
  FileText,
  LogOut,
  Lock,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Palette,
  Highlighter,
  List,
  ListOrdered,
  CheckSquare,
  Table as TableIcon,
  Image as ImageIcon,
  Youtube,
  Link as LinkIcon,
  Printer,
  Share2,
  Check,
  ChevronRight,
  Save,
  Clock,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

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
  
  // Admin & Login states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  
  // Editor States
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('SOP');
  const [editDesc, setEditDesc] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  
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
    if (!isEditing || !selectedArticle) return;
    
    // Autosave triggers 3 seconds after inactivity
    const saveTimer = setTimeout(() => {
      setAutosaveStatus('saving');
      
      const updatedArticles = articles.map((art) => {
        if (art.id === selectedArticle.id) {
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
      const updatedCurrent = updatedArticles.find(a => a.id === selectedArticle.id);
      if (updatedCurrent) {
        setSelectedArticle(updatedCurrent);
      }

      setTimeout(() => setAutosaveStatus('saved'), 600);
      setTimeout(() => setAutosaveStatus('idle'), 2000);
    }, 3000);

    return () => clearTimeout(saveTimer);
  }, [editTitle, editCategory, editDesc, editThumbnail, editorContent, isEditing, selectedArticle, articles]);

  // --- Undo / Redo implementation ---
  const pushToHistory = useCallback((html: string) => {
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(html);
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  }, [historyStack, historyIndex]);

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
    showNotification('Seluruh perubahan berhasil disimpan!', 'success');
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

      // Check for button action inside media toolbar
      const button = target.closest('button');
      if (button && mediaWrapper.contains(button)) {
        const action = button.getAttribute('data-action');
        if (!action) return;

        if (action === 'layout-block') {
          mediaWrapper.classList.remove('layout-inline', 'layout-float-left', 'layout-float-right');
          mediaWrapper.classList.add('layout-block', 'align-center');
        } else if (action === 'layout-float-left') {
          mediaWrapper.classList.remove('layout-inline', 'layout-block', 'align-center', 'layout-float-right');
          mediaWrapper.classList.add('layout-float-left');
        } else if (action === 'layout-float-right') {
          mediaWrapper.classList.remove('layout-inline', 'layout-block', 'align-center', 'layout-float-left');
          mediaWrapper.classList.add('layout-float-right');
        } else if (action === 'w25') {
          mediaWrapper.style.width = '25%';
        } else if (action === 'w50') {
          mediaWrapper.style.width = '50%';
        } else if (action === 'w75') {
          mediaWrapper.style.width = '75%';
        } else if (action === 'w100') {
          mediaWrapper.style.width = '100%';
        } else if (action === 'rotate') {
          const img = mediaWrapper.querySelector('img');
          if (img) {
            const currentRotation = parseInt(img.getAttribute('data-rotate') || '0');
            const nextRotation = (currentRotation + 90) % 360;
            img.setAttribute('data-rotate', nextRotation.toString());
            img.style.transform = `rotate(${nextRotation}deg)`;
            img.style.transition = 'transform 0.3s ease';
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
          }
        }

        // Trigger updates
        if (editorRef.current) {
          const html = editorRef.current.innerHTML;
          setEditorContent(html);
          pushToHistory(html);
        }
      }
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
        setResizingMedia(null);
        if (editorRef.current) {
          const html = editorRef.current.innerHTML;
          setEditorContent(html);
          pushToHistory(html);
        }
      }
    };

    if (resizingMedia) {
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

    const iframeHtml = `<span class="video-container">
      <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
    </span>`;
    
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800" id="mainContainer">
      
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

      {/* --- Header Navigation Banner --- */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-xs print:hidden">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-200">
            📦
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center">
              Warehouse Knowledge Base
            </h1>
            <p className="text-xs text-slate-400 font-medium">Sistem Dokumentasi Terpadu Pergudangan</p>
          </div>
        </div>

        {/* Admin Login Controls */}
        <div className="flex items-center space-x-3">
          {isAdmin ? (
            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full py-1 pl-3 pr-2 shadow-xs">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700">Mode Admin</span>
              <button
                id="loginBtn"
                onClick={handleLogout}
                className="ml-2 hover:bg-indigo-100 p-1 rounded-full text-indigo-600 transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              id="loginBtn"
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-sm"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>🔐 Login Admin</span>
            </button>
          )}
        </div>
      </header>

      {/* --- Main Structural Workspace Layout --- */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* --- LEFT SIDEBAR (Notion / Confluence Style) --- */}
        <aside className="w-full md:w-80 border-r border-slate-200 bg-slate-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar p-5 space-y-6 print:hidden">
          
          {/* Quick Create Button (Admin only) */}
          {isAdmin && (
            <button
              id="newArticleBtn"
              onClick={handleCreateNew}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Artikel Baru</span>
            </button>
          )}

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              id="searchInput"
              type="text"
              placeholder="Cari SOP, panduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-700 placeholder-slate-400 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* Categories Filters Navigation */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1 flex items-center">
              <Folder className="h-3 w-3 mr-1.5" /> Folder Pengetahuan
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <span className="flex items-center">📂 Semua Dokumen</span>
                <span className="text-xs px-2 py-0.5 bg-slate-200/50 rounded-full text-slate-500">{articles.length}</span>
              </button>
              
              {CATEGORIES.map((cat) => {
                const count = articles.filter(a => a.category === cat).length;
                const colors = CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                      selectedCategory === cat
                        ? `${colors.bg} ${colors.text} ring-1 ring-slate-200`
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{colors.icon}</span>
                      {cat}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-slate-200/50 rounded-full text-slate-500">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Block Panel */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              📊 Statistik Dokumen
            </h4>
            <div className="grid grid-cols-2 gap-3" id="statsBar">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <p className="text-2xl font-black text-slate-900" id="statTotal">{articles.length}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Total</p>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-50 text-center">
                <p className="text-2xl font-black text-blue-700" id="statSOP">{getSOPCount()}</p>
                <p className="text-[10px] text-blue-500 font-bold uppercase mt-0.5">SOP</p>
              </div>
              <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-50 text-center">
                <p className="text-2xl font-black text-purple-700" id="statPanduan">{getPanduanCount()}</p>
                <p className="text-[10px] text-purple-500 font-bold uppercase mt-0.5">Panduan</p>
              </div>
              <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-50 text-center">
                <p className="text-2xl font-black text-rose-700" id="statSafety">{getSafetyCount()}</p>
                <p className="text-[10px] text-rose-500 font-bold uppercase mt-0.5">K3 Safety</p>
              </div>
            </div>
          </div>

          {/* Document Tree Hierarchy List */}
          <div className="flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1 flex items-center">
              <BookOpen className="h-3 w-3 mr-1.5" /> Indeks Dokumen
            </h3>
            <div className="space-y-1 overflow-y-auto max-h-[300px] custom-scrollbar" id="articlesGrid">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-6 bg-slate-200/30 rounded-xl border border-dashed border-slate-300">
                  <p className="text-xs text-slate-400">Tidak ada dokumen</p>
                </div>
              ) : (
                filteredArticles.map((art) => {
                  const colors = CATEGORY_COLORS[art.category];
                  const isSelected = selectedArticle?.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => {
                        if (isEditing) {
                          if (!window.confirm('Keluar dari edit dokumen? Perubahan terakhir Anda mungkin belum tersimpan sepenuhnya.')) return;
                          setIsEditing(false);
                        }
                        setSelectedArticle(art);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-start space-x-2.5 ${
                        isSelected
                          ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-100'
                          : 'bg-transparent border-transparent hover:bg-slate-200/40'
                      }`}
                    >
                      <span className="text-lg bg-slate-200/60 p-1.5 rounded-lg shrink-0">
                        {colors.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                          {art.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {art.desc || 'Tidak ada deskripsi'}
                        </p>
                        <div className="flex items-center space-x-1.5 mt-1.5">
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                            {art.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

        </aside>

        {/* --- MAIN DISPLAY PANEL (Reading & Editor canvas) --- */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-100 p-6">
          
          {selectedArticle ? (
            <div className="w-full max-w-4xl mx-auto space-y-6">

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
                  {!isEditing ? (
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
                  ) : (
                    <div className="flex items-center space-x-3 w-full justify-between sm:justify-end">
                      {/* Autosave badge status indicator */}
                      <span className="text-xs font-medium flex items-center text-slate-400">
                        {autosaveStatus === 'saving' && (
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping mr-1.5"></span>
                            Menyimpan draf...
                          </span>
                        )}
                        {autosaveStatus === 'saved' && (
                          <span className="text-emerald-600 flex items-center">
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Semua draf tersimpan
                          </span>
                        )}
                        {autosaveStatus === 'idle' && (
                          <span className="flex items-center text-slate-300">
                            <Save className="h-3.5 w-3.5 mr-1" />
                            Autosave Aktif
                          </span>
                        )}
                      </span>
                      <button
                        onClick={handleSaveAndClose}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold py-2 px-5 rounded-xl flex items-center space-x-1.5 transition-all shadow-md"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Selesai &amp; Simpan</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* --- EDITOR RIBBON TOOLBAR (Microsoft Word Style) --- */}
              {isEditing && (
                <div className="formatting-ribbon p-2.5 space-y-2 print:hidden" id="editorRibbon">
                  
                  {/* Article Core Meta Inputs */}
                  <div className="flex flex-col md:flex-row gap-3 border-b border-slate-100 pb-2.5">
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

                  {/* Document Formatting Command Ribbon */}
                  <div className="flex flex-wrap items-center gap-1">
                    
                    {/* Undo / Redo group */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                        className="p-1.5 hover:bg-white text-slate-600 disabled:opacity-30 rounded transition-all"
                        title="Urungkan (Undo)"
                      >
                        <Undo2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={historyIndex >= historyStack.length - 1}
                        className="p-1.5 hover:bg-white text-slate-600 disabled:opacity-30 rounded transition-all"
                        title="Ulangi (Redo)"
                      >
                        <Redo2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Font Family Selection */}
                    <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <select
                        onChange={(e) => executeCommand('fontName', e.target.value)}
                        className="bg-transparent text-xs font-semibold px-2 py-1 pr-6 border-none focus:outline-none focus:ring-0 text-slate-700 cursor-pointer"
                        title="Jenis Huruf"
                      >
                        <option value="Inter">Inter (Sans)</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times Roman (Serif)</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier (Mono)</option>
                      </select>
                    </div>

                    {/* Font Size Selection */}
                    <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          // Standardize size setting with custom span in editable container
                          executeCommand('fontSize', val);
                        }}
                        className="bg-transparent text-xs font-semibold px-2 py-1 border-none focus:outline-none focus:ring-0 text-slate-700 cursor-pointer"
                        title="Ukuran Huruf"
                        defaultValue="3"
                      >
                        <option value="1">Kecil (12px)</option>
                        <option value="2">Normal (14px)</option>
                        <option value="3">Standar (16px)</option>
                        <option value="4">Sedang (18px)</option>
                        <option value="5">Besar (24px)</option>
                        <option value="6">Sangat Besar (32px)</option>
                        <option value="7">Display (48px)</option>
                      </select>
                    </div>

                    {/* Presets heading formatting */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={() => executeCommand('formatBlock', '<p>')}
                        className="px-2 py-1 text-xs font-bold hover:bg-white text-slate-600 rounded transition-all"
                        title="Format Paragraf"
                      >
                        P
                      </button>
                      <button
                        onClick={() => executeCommand('formatBlock', '<h1>')}
                        className="p-1 hover:bg-white text-slate-600 rounded transition-all"
                        title="Heading 1"
                      >
                        <Heading1 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('formatBlock', '<h2>')}
                        className="p-1 hover:bg-white text-slate-600 rounded transition-all"
                        title="Heading 2"
                      >
                        <Heading2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('formatBlock', '<h3>')}
                        className="p-1 hover:bg-white text-slate-600 rounded transition-all"
                        title="Heading 3"
                      >
                        <Heading3 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Basic Styling Buttons */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={() => executeCommand('bold')}
                        className={`p-1.5 hover:bg-white rounded transition-all ${activeFormats.includes('bold') ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'}`}
                        title="Tebal (Bold)"
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('italic')}
                        className={`p-1.5 hover:bg-white rounded transition-all ${activeFormats.includes('italic') ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'}`}
                        title="Miring (Italic)"
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('underline')}
                        className={`p-1.5 hover:bg-white rounded transition-all ${activeFormats.includes('underline') ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'}`}
                        title="Garis Bawah (Underline)"
                      >
                        <Underline className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('strikeThrough')}
                        className={`p-1.5 hover:bg-white rounded transition-all ${activeFormats.includes('strikethrough') ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'}`}
                        title="Coret (Strikethrough)"
                      >
                        <Strikethrough className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Color picker dropdown triggers */}
                    <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      {/* Text Color Picker */}
                      <button
                        onClick={() => {
                          setShowTextColorPicker(!showTextColorPicker);
                          setShowHighlightColorPicker(false);
                        }}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all flex items-center"
                        title="Warna Huruf"
                      >
                        <Palette className="h-4 w-4" />
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </button>
                      {showTextColorPicker && (
                        <div className="absolute top-10 left-0 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xl grid grid-cols-5 gap-1.5 z-50">
                          {['#000000', '#334155', '#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb', '#7c3aed', '#db2777', '#4b5563'].map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                executeCommand('foreColor', color);
                                setShowTextColorPicker(false);
                              }}
                              className="h-5 w-5 rounded border border-slate-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Text Highlight Color Picker */}
                      <button
                        onClick={() => {
                          setShowHighlightColorPicker(!showHighlightColorPicker);
                          setShowTextColorPicker(false);
                        }}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all flex items-center"
                        title="Sorot Warna (Highlight)"
                      >
                        <Highlighter className="h-4 w-4" />
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </button>
                      {showHighlightColorPicker && (
                        <div className="absolute top-10 left-8 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xl grid grid-cols-5 gap-1.5 z-50">
                          {['transparent', '#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#fef3c7', '#c7d2fe', '#fed7aa', '#e9d5ff', '#ddd6fe'].map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                executeCommand('hiliteColor', color);
                                setShowHighlightColorPicker(false);
                              }}
                              className="h-5 w-5 rounded border border-slate-200"
                              style={{ backgroundColor: color }}
                              title={color === 'transparent' ? 'No Highlight' : color}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Alignment group */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={() => executeCommand('justifyLeft')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Rata Kiri"
                      >
                        <AlignLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('justifyCenter')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Rata Tengah"
                      >
                        <AlignCenter className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('justifyRight')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Rata Kanan"
                      >
                        <AlignRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('justifyFull')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Rata Kiri Kanan"
                      >
                        <AlignJustify className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Lists Group */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={() => executeCommand('insertUnorderedList')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Daftar Simbol (Bullets)"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => executeCommand('insertOrderedList')}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Daftar Angka (Numbering)"
                      >
                        <ListOrdered className="h-4 w-4" />
                      </button>
                      <button
                        onClick={insertChecklist}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Checklist Interaktif"
                      >
                        <CheckSquare className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Layout Inserts (Table, Links, Media) */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                      <button
                        onClick={insertTableHTML}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Sisipkan Tabel"
                      >
                        <TableIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={insertLink}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Sisipkan Tautan"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Image & Video Insertion */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={triggerImageUpload}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Unggah Gambar"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={triggerYoutubeEmbed}
                        className="p-1.5 hover:bg-white text-slate-600 rounded transition-all"
                        title="Sematkan Video YouTube"
                      >
                        <Youtube className="h-4 w-4" />
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}
              <div
                className="document-page relative p-12 custom-scrollbar"
                id="articleView"
                onDragOver={isEditing ? handleDragOver : undefined}
                onDrop={isEditing ? handleDrop : undefined}
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
                  dangerouslySetInnerHTML={{
                    __html: isEditing ? editorContent : selectedArticle.content,
                  }}
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
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-slate-200 max-w-4xl mx-auto shadow-xs my-6" id="emptyState">
              <div className="h-20 w-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-3xl mb-4">
                📂
              </div>
              <h2 className="text-xl font-extrabold text-slate-800">Tidak Ada Dokumen Tersedia</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-md">
                Klik tombol "Tambah Artikel" di sebelah kiri untuk meluncurkan lembar penulisan SOP pergudangan pertama Anda.
              </p>
            </div>
          )}

        </main>

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
