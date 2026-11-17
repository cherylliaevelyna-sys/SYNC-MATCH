const { useState, useEffect, useMemo } = React;

// ==========================================
// 1. KONFIGURASI FIREBASE (sync-match-221ff)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyD3_reD0mRlXt9tvyu8neRIuE4T0ujPNnU",
  authDomain: "sync-match-221ff.firebaseapp.com",
  projectId: "sync-match-221ff",
  storageBucket: "sync-match-221ff.firebasestorage.app",
  messagingSenderId: "758741815212",
  appId: "1:758741815212:web:44f807aace3878be67f409",
  measurementId: "G-9CYYQTWH44"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ==========================================
// 2. ICON COMPONENTS & GOOGLE LOGO
// ==========================================
const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M12 5c1.617 0 3.077.556 4.223 1.649l3.164-3.164C17.475 1.703 14.977.667 12 .667 7.574.667 3.747 3.205 1.883 6.906l3.686 2.86C6.437 7.152 8.99 5 12 5z"/>
    <path fill="#4285F4" d="M23.49 12.275c0-.85-.076-1.668-.218-2.458H12v4.651h6.443c-.278 1.496-1.121 2.764-2.388 3.612l3.865 2.999c2.26-2.083 3.57-5.151 3.57-8.804z"/>
    <path fill="#FBBC05" d="M5.569 14.234A7.19 7.19 0 015.192 12c0-.776.135-1.529.377-2.234L1.883 6.906A11.964 11.964 0 00.667 12c0 1.936.464 3.768 1.216 5.094l3.686-2.86z"/>
    <path fill="#34A853" d="M12 23.333c3.24 0 5.957-1.074 7.943-2.909l-3.865-2.999c-1.074.72-2.448 1.145-4.078 1.145-3.01 0-5.563-2.152-6.431-4.766l-3.686 2.86C3.747 20.795 7.574 23.333 12 23.333z"/>
  </svg>
);

const IconUser = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconChat = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconSettings = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconMenu = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconBack = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const IconSend = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const SKILL_OPTIONS = [
  'Coding', 'Cooking', 'Writing', 'Editing',
  'Illustration', 'Made CGI Effect', 'Photography',
  'Astronomy', 'Drawing', 'Skateboard'
];

const PEER_OPTIONS = [
  'Middle Age', 'Teenager', 'Student', 'Worker', 'University Student'
];

const AVATAR_GRADIENTS = [
  'from-purple-600 to-indigo-800',
  'from-blue-600 to-slate-800',
  'from-rose-600 to-purple-900',
  'from-indigo-600 to-purple-950'
];

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================
function SyncApp() {
  const [currentScreen, setCurrentScreen] = useState('loading'); // 'loading' | 'auth' | 'onboarding' | 'feed' | 'profile-detail' | 'chat' | 'settings'
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ID');
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Daftar Pengguna Nyata dari Firestore (Default Kosong)
  const [realUsers, setRealUsers] = useState([]);

  // Data Akun Google & Profil SYNC User
  const [currentUser, setCurrentUser] = useState({
    uid: '',
    email: '',
    photoURL: '',
    name: '',
    age: '',
    status: 'Student',
    bio: 'Gud day!',
    skillsCanTeach: [],
    skillsLookingFor: [],
    preferredPeers: []
  });

  // State Chat Real-Time
  const [chatRooms, setChatRooms] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeMessages, setActiveMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.trim().slice(0, 2).toUpperCase();
  };

  // ==========================================
  // 4. FIREBASE GOOGLE AUTH & LISTENERS
  // ==========================================
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docSnap = await db.collection('users').doc(user.uid).get();
          if (docSnap.exists && docSnap.data().onboardingCompleted) {
            setCurrentUser({
              uid: user.uid,
              email: user.email || '',
              photoURL: user.photoURL || '',
              ...docSnap.data()
            });
            setCurrentScreen('feed');
          } else {
            setCurrentUser((prev) => ({
              ...prev,
              uid: user.uid,
              email: user.email || '',
              photoURL: user.photoURL || '',
              name: user.displayName || prev.name
            }));
            setCurrentScreen('onboarding');
          }
        } catch (err) {
          console.error('Firestore read error:', err);
          setCurrentUser((prev) => ({
            ...prev,
            uid: user.uid,
            email: user.email || '',
            photoURL: user.photoURL || '',
            name: user.displayName || ''
          }));
          setCurrentScreen('onboarding');
        }
      } else {
        setCurrentScreen('auth');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Dengarkan semua akun nyata di koleksi 'users'
  useEffect(() => {
    if (!currentUser.uid) return;

    const unsubscribeUsers = db.collection('users').onSnapshot(
      (snapshot) => {
        const usersList = snapshot.docs
          .map((doc) => ({ uid: doc.id, ...doc.data() }))
          .filter((u) => u.uid !== currentUser.uid && u.name && u.onboardingCompleted);
        setRealUsers(usersList);
      },
      (error) => {
        console.error('Users listener error:', error);
        setRealUsers([]);
      }
    );

    return () => unsubscribeUsers();
  }, [currentUser.uid]);

  // Dengarkan daftar Chat Room
  useEffect(() => {
    if (!currentUser.uid) return;

    const unsubscribeChats = db
      .collection('chats')
      .where('participants', 'array-contains', currentUser.uid)
      .onSnapshot((snapshot) => {
        const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChatRooms(rooms);
      });

    return () => unsubscribeChats();
  }, [currentUser.uid]);

  // Dengarkan pesan di dalam Chat Room yang aktif
  useEffect(() => {
    if (!activeChatId) return;

    const unsubscribeMsgs = db
      .collection('chats')
      .doc(activeChatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setActiveMessages(msgs);
      });

    return () => unsubscribeMsgs();
  }, [activeChatId]);

  // ==========================================
  // 5. GOOGLE SIGN-IN & LOGOUT HANDLERS
  // ==========================================
  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    try {
      await auth.signInWithPopup(googleProvider);
      triggerToast('Berhasil masuk dengan Google!');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        triggerToast('Login dibatalkan.');
      } else if (error.code === 'auth/unauthorized-domain') {
        triggerToast('Domain Vercel belum ditambahkan di Authorized Domains Firebase!');
      } else {
        triggerToast('Gagal login Google. Cek pengaturan Sign-in di Firebase.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setCurrentUser({
      uid: '',
      email: '',
      photoURL: '',
      name: '',
      age: '',
      status: 'Student',
      bio: 'Gud day!',
      skillsCanTeach: [],
      skillsLookingFor: [],
      preferredPeers: []
    });
    setCurrentScreen('auth');
    triggerToast('Kamu telah keluar dari akun.');
  };

  // ==========================================
  // 6. ALGORITMA MATCHING & ACTIONS
  // ==========================================
  const recommendedUsers = useMemo(() => {
    return realUsers
      .map((peer, idx) => {
        let score = 50;

        const teachMatch = (peer.skillsCanTeach || []).filter((s) =>
          (currentUser.skillsLookingFor || []).some((myS) => myS.toLowerCase() === s.toLowerCase())
        );
        score += teachMatch.length * 20;

        const learnMatch = (peer.skillsLookingFor || []).filter((s) =>
          (currentUser.skillsCanTeach || []).some((myT) => myT.toLowerCase() === s.toLowerCase())
        );
        score += learnMatch.length * 15;

        if ((currentUser.preferredPeers || []).includes(peer.status)) {
          score += 10;
        }

        return {
          ...peer,
          matchScore: Math.min(score, 99),
          matchedSkills: teachMatch,
          avatarColor: peer.avatarColor || AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
          avatarInitials: getInitials(peer.name)
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [realUsers, currentUser]);

  const selectedUser = useMemo(
    () => recommendedUsers.find((u) => u.uid === selectedUserId) || null,
    [recommendedUsers, selectedUserId]
  );

  const handleCompleteOnboarding = async () => {
    if (!currentUser.name.trim() || !currentUser.age) {
      triggerToast('Isi nama dan umur kamu terlebih dahulu!');
      return;
    }

    setIsSaving(true);
    try {
      const uid = currentUser.uid;
      const profileData = {
        uid,
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
        name: currentUser.name.trim(),
        age: Number(currentUser.age),
        status: currentUser.status || 'Student',
        bio: currentUser.bio || 'Gud day!',
        skillsCanTeach: currentUser.skillsCanTeach,
        skillsLookingFor: currentUser.skillsLookingFor,
        preferredPeers: currentUser.preferredPeers,
        onboardingCompleted: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('users').doc(uid).set(profileData, { merge: true });
      setCurrentUser(profileData);
      setCurrentScreen('feed');
      triggerToast('Profil SYNC berhasil disimpan!');
    } catch (err) {
      console.error(err);
      triggerToast('Gagal menyimpan profil. Cek Firestore Rules.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setCurrentScreen('profile-detail');
  };

  const handleAskForSkill = async (targetUser) => {
    const chatId = [currentUser.uid, targetUser.uid].sort().join('_');
    const sharedSkill = targetUser.matchedSkills?.[0] || targetUser.skillsCanTeach?.[0] || 'skill baru';
    const mySkill = currentUser.skillsCanTeach?.[0] || 'berbagai hal';

    const icebreakerText = `Hai ${targetUser.name}! 👋 Aku lihat kamu bisa ${sharedSkill}. Aku lagi pengen belajar itu, dan sebagai gantinya aku bisa bantu ajarin ${mySkill}. Mau SYNC bareng?`;

    try {
      const chatRef = db.collection('chats').doc(chatId);
      const chatSnap = await chatRef.get();

      if (!chatSnap.exists) {
        await chatRef.set({
          chatId,
          participants: [currentUser.uid, targetUser.uid],
          participantNames: {
            [currentUser.uid]: currentUser.name,
            [targetUser.uid]: targetUser.name
          },
          lastMessage: icebreakerText,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await chatRef.collection('messages').add({
          senderId: currentUser.uid,
          text: icebreakerText,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      setActiveChatId(chatId);
      setCurrentScreen('chat');
    } catch (err) {
      console.error(err);
      triggerToast('Gagal membuka ruang chat.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId) return;

    const textToSend = messageInput.trim();
    setMessageInput('');

    try {
      const chatRef = db.collection('chats').doc(activeChatId);
      await chatRef.collection('messages').add({
        senderId: currentUser.uid,
        text: textToSend,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      await chatRef.update({
        lastMessage: textToSend,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      triggerToast('Pesan gagal terkirim.');
    }
  };

  const toggleArrayItem = (field, item) => {
    setCurrentUser((prev) => {
      const exists = prev[field].includes(item);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((i) => i !== item) : [...prev[field], item]
      };
    });
  };

  // Helper Render Avatar (Foto Google asli jika ada, atau Inisial Gradient)
  const renderUserAvatar = (user, sizeClasses = "w-14 h-14 text-base") => {
    if (user.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt={user.name}
          referrerPolicy="no-referrer"
          className={`${sizeClasses} rounded-full object-cover shrink-0 ring-2 ring-purple-500/40`}
        />
      );
    }
    return (
      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-br ${user.avatarColor || 'from-purple-600 to-indigo-900'} flex items-center justify-center font-bold text-white shrink-0 ring-2 ring-white/10`}
      >
        {user.avatarInitials || getInitials(user.name)}
      </div>
    );
  };

  // ==========================================
  // 7. RENDER LAYAR
  // ==========================================
  if (currentScreen === 'loading') {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center">
        <div className="w-9 h-9 border-2 border-[#5B21B6] border-t-[#DC2626] rounded-full animate-spin mb-3" />
        <p className="text-xs text-gray-400 tracking-widest uppercase">SYNC...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#0B0B0F]">
      <div className="w-full max-w-md min-h-screen border-x border-[#1E2235] flex flex-col relative shadow-2xl overflow-hidden">
        
        {toastMessage && (
          <div className="toast-animate fixed top-4 left-1/2 z-50 bg-[#1E2235] border border-[#5B21B6] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
            ✨ {toastMessage}
          </div>
        )}

        {/* ====================================================
            MODERN POP-UP GOOGLE LOGIN MODAL (Bukan Halaman Jadul)
           ==================================================== */}
        {currentScreen === 'auth' && (
          <div className="modal-backdrop fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4">
            {/* Ambient Glow Orbs di Belakang Modal */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#5B21B6]/30 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#DC2626]/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Pop-up Card Modern */}
            <div className="modal-card w-full max-w-sm rounded-3xl p-7 relative z-10 text-center">
              {/* Pill Indicator untuk Mobile Bottom-Sheet feel */}
              <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-6 sm:hidden" />

              {/* Brand Badge */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#5B21B6] via-[#1E2235] to-[#DC2626] p-[1.5px] shadow-lg mb-4">
                <div className="w-full h-full bg-[#0B0B0F] rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    SYNC
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Welcome to SYNC
              </h2>
              <p className="text-xs text-purple-300 font-medium tracking-widest uppercase mt-1">
                Connect. Share. Grow.
              </p>

              <p className="text-xs text-gray-400 mt-4 leading-relaxed px-2">
                Temukan partner belajar, tukar keahlian baru, dan bangun koneksi nyata bersama pelajar & kreator lainnya.
              </p>

              {/* Tombol Custom Google Login Modern */}
              <button
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                className="mt-7 w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-gray-100 active:scale-[0.98] text-[#0B0B0F] font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all disabled:opacity-60"
              >
                {isSigningIn ? (
                  <div className="w-5 h-5 border-2 border-[#0B0B0F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <GoogleLogo />
                )}
                <span>{isSigningIn ? 'Menghubungkan...' : 'Continue with Google'}</span>
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Aman & terverifikasi dengan Akun Google</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            SCREEN 1: ONBOARDING & BIODATA
           ==================================================== */}
        {currentScreen === 'onboarding' && (
          <div className="flex-1 overflow-y-auto p-6 pb-12">
            <div className="text-
