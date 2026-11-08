"use client";

import { useEffect, useMemo, useState } from "react";
import vaseImage from "../../public/images/pexels-photo-7663201.jpg";
import plateImage from "../../public/images/pexels-photo-30259432.jpg";
import candleImage from "../../public/images/pexels-photo-6798396.jpg";
import bowlImage from "../../public/images/pexels-photo-29312155.jpg";
import minimalistVaseImage from "../../public/images/pexels-photo-19193216.jpg";
import lampImage from "../../public/images/pexels-photo-31410610.jpg";
import throwImage from "../../public/images/pexels-photo-31658575.jpg";
import trayImage from "../../public/images/pexels-photo-7675064.jpg";
import diffuserImage from "../../public/images/pexels-photo-7795656.jpg";
import basketImage from "../../public/images/pexels-photo-10117739.jpg";
import jarImage from "../../public/images/kitchen-design-home-decoration.jpg";
import storyImage1 from "../../public/images/pexels-photo-30861337.jpg";
import storyImage2 from "../../public/images/pexels-photo-34230986.jpg";
import storyImage3 from "../../public/images/pexels-photo-7180275.jpg";
import storyImage4 from "../../public/images/pexels-photo-5482202.jpg";
import storyImage5 from "../../public/images/pexels-photo-7795650.jpg";
import storyImage6 from "../../public/images/pexels-photo.jpg";

// ==========================================
// ۱. داده‌های اولیه (محصولات، سفارش‌ها، مجله، هنرمندان و سوالات متداول)
// ==========================================
const initialProducts = [
  { id: "mug", name: "ماگ دست‌ساز آوید", category: "ظروف", price: 680000, oldPrice: 820000, tag: "پرفروش", color: "ماسه‌ای", stock: 14, active: true, image: null },
  { id: "vase", name: "گلدان سرامیکی رها", category: "دکور", price: 1240000, tag: "جدید", color: "سفید شیری", stock: 8, active: true, image: vaseImage },
  { id: "plate", name: "بشقاب دست‌ساز ماهور", category: "ظروف", price: 890000, color: "آبی اقیانوسی", stock: 22, active: true, image: plateImage },
  { id: "candle", name: "شمع معطر جنگل", category: "خانه و عطر", price: 540000, tag: "محبوب", color: "سبز زیتونی", stock: 35, active: true, image: candleImage },
  { id: "bowl", name: "کاسه سرامیکی نیلا", category: "ظروف", price: 760000, color: "خاکی", stock: 11, active: true, image: bowlImage },
  { id: "vase-2", name: "گلدان مینیمال آبان", category: "دکور", price: 1580000, tag: "محدود", color: "سفید مات", stock: 3, active: true, image: minimalistVaseImage },
  { id: "lamp", name: "چراغ رومیزی سپیدار", category: "روشنایی", price: 2150000, tag: "جدید", color: "چوب طبیعی", stock: 6, active: true, image: lampImage },
  { id: "throw", name: "شال مبل بافت باران", category: "بافت و پارچه", price: 1890000, color: "کرم گرم", stock: 9, active: true, image: throwImage },
  { id: "tray", name: "سینی چوبی نارون", category: "میز و پذیرایی", price: 980000, color: "گردویی", stock: 15, active: true, image: trayImage },
  { id: "diffuser", name: "دیفیوزر رایحه‌ی صبح", category: "خانه و عطر", price: 720000, tag: "محبوب", color: "مرکبات و چوب", stock: 19, active: true, image: diffuserImage },
  { id: "basket", name: "سبد بافت دست‌ساز", category: "بافت و پارچه", price: 1120000, color: "الیاف طبیعی", stock: 4, active: true, image: basketImage },
  { id: "jar", name: "ظرف نگهدارنده‌ی آوا", category: "میز و پذیرایی", price: 640000, color: "خاک رس", stock: 12, active: true, image: jarImage },
];

const initialStories = [
  { id: 1, image: storyImage1, title: "چطور با چند تغییر کوچک، خانه را آرام‌تر کنیم؟", meta: "سبک زندگی · ۵ دقیقه مطالعه", excerpt: "گاهی فقط جابه‌جا کردن یک منبع نور و اضافه کردن بافت‌های طبیعی مثل چوب و سرامیک، حس کل اتاق را عوض می‌کند.", views: 1240 },
  { id: 2, image: storyImage2, title: "پشت هر قطعه‌ی دست‌ساز، یک جفت دستِ مهربان", meta: "روایت کارگاه · ۳ دقیقه مطالعه", excerpt: "سفری کوتاه به کارگاه سفالگری ما؛ جایی که خاک رس پس از ۱۴ ساعت پخت در کوره، به ظرفی برای سال‌ها زندگی تبدیل می‌شود.", views: 980 },
  { id: 3, image: storyImage3, title: "یک میز ساده؛ بهانه‌ای برای کنار هم بودن", meta: "خانه‌داری · ۴ دقیقه مطالعه", excerpt: "چیدمان میز صبحانه یا عصرانه نیازی به تجمل ندارد؛ چند ظرف دست‌ساز و یک شاخه برگ سبز کافیست.", views: 850 },
  { id: 4, image: storyImage4, title: "چیزهایی که خانه را به خانه تبدیل می‌کنند", meta: "الهام و دکور · ۶ دقیقه مطالعه", excerpt: "تفاوت یک فضای سرد با یک خانه‌ی گرم در جزئیات کوچکی است که قصه‌ی صاحب‌خانه را روایت می‌کنند.", views: 1620 },
  { id: 5, image: storyImage5, title: "عطر خانه؛ انتخاب رایحه‌ای که حال تو را خوب می‌کند", meta: "حس خوب · ۴ دقیقه مطالعه", excerpt: "رایحه‌ی چوب صندل برای غروب‌های پاییزی و عطر بهارنارنج برای صبح‌های روشن؛ راهنمای انتخاب شمع و دیفیوزر.", views: 730 },
  { id: 6, image: storyImage6, title: "قصه‌ی کوتاه هنرمندانی که با دست می‌سازند", meta: "آدم‌ها · ۷ دقیقه مطالعه", excerpt: "گفت‌وگو با سه هنرمند بومی که به جای تولید انبوه ماشینی، راهِ صبورانه‌ی ساخت با دست را انتخاب کرده‌اند.", views: 1190 },
];

const initialOrders = [
  { id: "ORD-1042", customer: "نازنین رضایی", city: "تهران", phone: "۰۹۱۲۳۴۵۶۷۸۹", items: "چراغ رومیزی سپیدار، ماگ دست‌ساز آوید", total: 2830000, date: "۱۴۰۵/۰۸/۱۶", status: "pending" },
  { id: "ORD-1041", customer: "سهراب محمدی", city: "شیراز", phone: "۰۹۱۷۱۱۱۲۲۳۳", items: "گلدان مینیمال آبان (۲ عدد)", total: 3160000, date: "۱۴۰۵/۰۸/۱۶", status: "packed" },
  { id: "ORD-1040", customer: "مهسا کاظمی", city: "اصفهان", phone: "۰۹۱۳۴۴۴۵۵۶۶", items: "شال مبل بافت باران، شمع معطر جنگل", total: 2430000, date: "۱۴۰۵/۰۸/۱۵", status: "shipped" },
  { id: "ORD-1039", customer: "امیرحسین نوری", city: "مشهد", phone: "۰۹۱۵۷۷۷۸۸۹۹", items: "سینی چوبی نارون، بشقاب ماهور", total: 1870000, date: "۱۴۰۵/۰۸/۱۴", status: "shipped" },
];

const initialMessages = [
  { id: 1, name: "سارا احمدی", contact: "09120001122", topic: "مشاوره چیدمان و دکور", text: "سلام، برای ست کردن سینی چوبی نارون با ماگ‌های آوید می‌خواستم ببینم رنگ چوبش تیره است یا روشن؟", date: "۱۰ دقیقه پیش", read: false },
  { id: 2, name: "کارگاه سفال مهر", contact: "info@mehrpottery.ir", topic: "همکاری به عنوان هنرمند", text: "درود بر تیم خانه‌زاد. ما در لالجین ظروف سرامیکی دست‌ساز تولید می‌کنیم و علاقه‌مند به همکاری هستیم.", date: "دیروز", read: true },
];

const salesChartData = [
  { month: "فروردین", amount: 42, orders: 38 },
  { month: "اردیبهشت", amount: 58, orders: 52 },
  { month: "خرداد", amount: 49, orders: 44 },
  { month: "تیر", amount: 78, orders: 71 },
  { month: "مرداد", amount: 94, orders: 89 },
  { month: "شهریور", amount: 128, orders: 118 },
];

const artisans = [
  { name: "استاد سهراب پناهی", role: "هنرمند سرامیک و سفال", exp: "۱۴ سال تجربه", quote: "خاک، حافظه دارد؛ اگر با آرامش ورز داده شود، آن آرامش را به خانه مشتری می‌برد.", avatar: "س", color: "bg-amber-100 text-amber-900" },
  { name: "مرجان هدایتی", role: "طراح بافت و الیاف طبیعی", exp: "۸ سال تجربه", quote: "هر گره در شال‌های مبل و سبدهای حصیری، ترکیبی از پشم طبیعی و نخ‌های رنگرزی شده با گیاهان است.", avatar: "م", color: "bg-emerald-100 text-emerald-900" },
  { name: "آرش کمانگر", role: "نجار چوب‌های بومی", exp: "۱۱ سال تجربه", quote: "ما هیچ درختی را نمی‌بُریم؛ تمام سینی‌ها و چراغ‌ها از چوب درختان هرس‌شده یا خشک‌شده ساخته می‌شوند.", avatar: "آ", color: "bg-stone-200 text-stone-800" },
];

const faqs = [
  { q: "آیا ظروف سرامیکی خانه‌زاد قابل شستشو در ماشین ظرفشویی هستند؟", a: "بله! تمام ظروف سرامیکی ما در دمای بالای ۱۲۰۰ درجه پخته شده‌اند و لعاب آن‌ها کاملاً مقاوم و فاقد سرب است؛ با این حال شستشوی دستی عمر ظرافت آن‌ها را دوچندان می‌کند." },
  { q: "اگر محصول در مسیر ارسال پستی آسیب ببیند چه می‌شود؟", a: "خیالتان صددرصد راحت باشد. ما از بسته‌بندی چندلایه ضدضربه استفاده می‌کنیم، اما اگر کوچک‌ترین آسیبی ببیند، کافیست عکس آن را بفرستید تا بدون هیچ هزینه‌ای یک قطعه جدید برایتان ارسال شود." },
  { q: "چرا بین دو محصول مشابه، تفاوت‌های خیلی جزئی در رنگ یا بافت وجود دارد؟", a: "این امضای کارِ دست است! چون هیچ‌کدام از محصولات ما با قالب‌های کارخانه‌ای ساخته نمی‌شوند، هر ماگ یا گلدان اثر انگشت هنرمند و شخصیت منحصربه‌فرد خودش را دارد." },
  { q: "چطور می‌توانم به عنوان هنرمند، ساخته‌هایم را در خانه‌زاد عرضه کنم؟", a: "از طریق همین فرم تماس، موضوع «همکاری به عنوان هنرمند» را انتخاب کنید و لینک نمونه‌کارهایتان را بفرستید. تیم هنری ما ظرف ۴۸ ساعت با شما تماس می‌گیرد." },
];

const formatPrice = (price) => `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;
const formatNum = (num) => new Intl.NumberFormat("fa-IR").format(num);

// ==========================================
// ۲. کامپوننت آیکون‌ها
// ==========================================
function Icon({ name, size = 20, filled = false, className = "" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    instagram: <><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16Z" /><path d="M8 16c2-3 5-5 9-7" /></>,
    dashboard: <><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></>,
    box: <><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>,
    orders: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>,
    journal: <><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></>,
    trash: <><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>,
    edit: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></>,
    lock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></>,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
    sparkles: <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></>,
    chevronDown: <path d="m6 9 6 6 6-6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-7" fill="none" aria-hidden="true">
      <path
        d="M7.5 22 24 8.5 40.5 22M11 20v19.5h26V20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 23v-7m0 3c-4.1 0-6.5-2.3-6.5-6 3.8 0 6.2 2 6.5 6Zm0-1c.2-4 2.7-6.4 6.5-6.6 0 3.8-2.2 6.2-6.5 6.6Z"
        stroke="#e7bd77"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 25h12l-1.5 4.8c4 3.2 4.2 6.8.8 9.7h-10.6c-3.4-2.9-3.2-6.5.8-9.7L18 25Z"
        fill="#e7bd77"
      />
    </svg>
  );
}

// ==========================================
// ۳. کامپوننت عکس امن
// ==========================================
function SafeImage({ src, alt, className = "" }) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = typeof src === "object" && src !== null ? src.src : src;

  if (hasError || !resolvedSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-200/80 p-4 text-center text-stone-500 ${className}`}>
        <Icon name="leaf" size={28} />
        <span className="mt-2 text-xs font-medium">{alt}</span>
        <small className="mt-1 text-[10px] opacity-75">خانه‌زاد · دست‌ساز</small>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function Eyebrow({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 dark-accent ${className}`}>
      <i className="size-2 rounded-full bg-emerald-700 animate-pulse" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, children, action }) {
  return (
    <div className="mb-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2.5 text-2xl font-bold tracking-tight sm:text-4xl">{children}</h2>
      </div>
      {action}
    </div>
  );
}

// ==========================================
// ۴. کارت محصول با طراحی مدرن و لوکس
// ==========================================
function ProductCard({ product, favorite, onFavorite, onAdd }) {
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <article className="group kz-card rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-200">
          <a href={`#product/${product.id}`} aria-label={`مشاهده ${product.name}`}>
            <SafeImage
              className={`size-full object-cover transition duration-700 group-hover:scale-110 ${!product.active ? "opacity-45 grayscale" : ""}`}
              src={product.image}
              alt={product.name}
            />
          </a>

          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {product.tag && (
              <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-stone-900 shadow-sm">
                {product.tag}
              </span>
            )}
            {discountPercent && (
              <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                {formatNum(discountPercent)}٪ تخفیف
              </span>
            )}
          </div>

          <button
            className={`absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition hover:scale-110 ${
              favorite ? "text-rose-600" : "text-stone-700 hover:text-rose-600"
            }`}
            onClick={() => onFavorite(product.id)}
            aria-label="افزودن به علاقه‌مندی‌ها"
          >
            <Icon name="heart" size={17} filled={favorite} />
          </button>

          {product.active ? (
            <button
              className="absolute inset-x-3 bottom-3 flex min-h-11 translate-y-3 items-center justify-center gap-2 rounded-xl bg-stone-950/90 backdrop-blur-md text-xs font-semibold text-white opacity-0 transition-all duration-300 hover:bg-emerald-800 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100 shadow-lg cursor-pointer"
              onClick={() => onAdd(product.id)}
            >
              <Icon name="plus" size={16} /> افزودن به سبد خرید
            </button>
          ) : (
            <div className="absolute inset-x-3 bottom-3 flex min-h-10 items-center justify-center rounded-xl bg-rose-950/90 text-xs font-semibold text-rose-100">
              فعلاً ناموجود در انبار
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-[11px] kz-muted">
            <span>{product.category} · {product.color}</span>
            {product.active && product.stock <= 5 && (
              <span className="text-amber-600 font-medium">تنها {formatNum(product.stock)} عدد مانده</span>
            )}
          </div>
          <a
            href={`#product/${product.id}`}
            className="mt-1.5 block text-sm sm:text-base font-bold transition hover:text-emerald-700"
          >
            {product.name}
          </a>
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t kz-border-subtle mt-1">
        <div className="flex flex-col">
          {product.oldPrice && (
            <del className="text-[11px] kz-muted">{formatPrice(product.oldPrice)}</del>
          )}
          <strong className="text-sm font-extrabold text-emerald-800 dark-accent">
            {formatPrice(product.price)}
          </strong>
        </div>
        <a
          href={`#product/${product.id}`}
          className="text-[11px] font-semibold kz-muted hover:text-emerald-700 flex items-center gap-1"
        >
          جزئیات <Icon name="arrow" size={13} />
        </a>
      </div>
    </article>
  );
}

function ProductGrid({ items, favorites, onFavorite, onAdd }) {
  if (!items.length) {
    return (
      <div className="col-span-full kz-card rounded-2xl border p-12 flex flex-col items-center justify-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-700 mb-3">
          <Icon name="search" size={28} />
        </span>
        <h3 className="text-lg font-bold">محصولی با این مشخصات پیدا نشد</h3>
        <p className="mt-1.5 text-xs kz-muted">فیلترها را تغییر بده یا همه‌ی دسته‌بندی‌ها را بررسی کن.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          favorite={favorites.includes(product.id)}
          onFavorite={onFavorite}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

// ==========================================
// ۵. کامپوننت اصلی برنامه (فروشگاه + اتاق فرمان)
// ==========================================
export default function KhanehzadMasterApp() {
  const [route, setRoute] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  // استیت‌های مشترک بین فروشگاه و پنل مدیریت
  const [products, setProducts] = useState(initialProducts);
  const [stories, setStories] = useState(initialStories);
  const [orders, setOrders] = useState(initialOrders);
  const [messages, setMessages] = useState(initialMessages);

  // استیت‌های فروشگاه
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("همه محصولات");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [detailQuantity, setDetailQuantity] = useState(1);

  // استیت‌های فرم تماس با ما و سوالات متداول
  const [openFaq, setOpenFaq] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", contact: "", topic: "مشاوره چیدمان و دکور", text: "" });
  const [contactSent, setContactSent] = useState(false);

  // استیت‌های تسویه حساب سبد خرید
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // استیت‌های پنل مدیریت (Admin)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard");
  const [showAdminGuide, setShowAdminGuide] = useState(true);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminCategory, setAdminCategory] = useState("همه");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "ظروف",
    price: "",
    color: "",
    stock: 10,
    tag: "",
    image: "",
  });

  // بارگذاری اطلاعات از LocalStorage
  useEffect(() => {
    setRoute(window.location.hash.slice(1) || "home");

    try {
      const savedCart = JSON.parse(localStorage.getItem("khanehzad-cart"));
      if (savedCart) setCart(savedCart);

      const savedFavs = JSON.parse(localStorage.getItem("khanehzad-favs"));
      if (savedFavs) setFavorites(savedFavs);

      const savedProducts = JSON.parse(localStorage.getItem("khanehzad-admin-products"));
      if (savedProducts && savedProducts.length) setProducts(savedProducts);

      const savedOrders = JSON.parse(localStorage.getItem("khanehzad-admin-orders"));
      if (savedOrders && savedOrders.length) setOrders(savedOrders);

      const savedMsgs = JSON.parse(localStorage.getItem("khanehzad-admin-msgs"));
      if (savedMsgs && savedMsgs.length) setMessages(savedMsgs);

      if (localStorage.getItem("khanehzad-admin-auth") === "true") setIsAuthenticated(true);
      if (localStorage.getItem("khanehzad-theme") === "dark") setDarkMode(true);
    } catch {}

    const handleHash = () => {
      const nextRoute = window.location.hash.slice(1) || "home";
      setRoute(nextRoute);
      setDetailQuantity(1);
      setContactSent(false);
      if (nextRoute === "favorites") setCategory("همه محصولات");
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // ذخیره تغییرات
  useEffect(() => {
    localStorage.setItem("khanehzad-theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("khanehzad-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("khanehzad-favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("khanehzad-admin-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("khanehzad-admin-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("khanehzad-admin-msgs", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // محاسبات فروشگاه
  const categories = useMemo(
    () => ["همه محصولات", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = Object.entries(cart).reduce(
    (sum, [id, quantity]) => sum + (products.find((item) => item.id === id)?.price || 0) * quantity,
    0
  );

  const selectedProduct = route.startsWith("product/")
    ? products.find((item) => item.id === route.split("/")[1])
    : null;

  const visibleProducts = useMemo(() => {
    let result = products.filter(
      (item) =>
        (category === "همه محصولات" || item.category === category) &&
        `${item.name} ${item.category} ${item.color}`.includes(search.trim()) &&
        (!route.startsWith("favorites") || favorites.includes(item.id))
    );
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, favorites, route, search, sort]);

  // توابع فروشگاه
  function addToCart(id, quantity = 1) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + quantity }));
    setToast("به سبد خرید اضافه شد ✨");
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const quantity = (current[id] || 0) + amount;
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function handleCheckout(e) {
    e.preventDefault();
    const orderItems = Object.entries(cart)
      .map(([id, qty]) => {
        const prod = products.find((p) => p.id === id);
        return prod ? `${prod.name} (${formatNum(qty)})` : null;
      })
      .filter(Boolean)
      .join("، ");

    const finalAmount = cartTotal + (cartTotal >= 2000000 ? 0 : 75000);
    const newOrder = {
      id: `ORD-${Math.floor(1050 + Math.random() * 900)}`,
      customer: customerName.trim() || "مشتری خانه‌زاد",
      city: customerCity.trim() || "تهران",
      phone: customerPhone.trim() || "۰۹۱۲۰۰۰۰۰۰۰",
      items: orderItems,
      total: finalAmount,
      date: "امروز",
      status: "pending",
    };

    setOrders((curr) => [newOrder, ...curr]);
    setCart({});
    setCustomerName("");
    setCustomerCity("");
    setCustomerPhone("");
    setToast("سفارش شما ثبت شد و هم‌اکنون در پنل مدیریت قابل مشاهده است!");
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const newMsg = {
      id: Date.now(),
      name: contactForm.name,
      contact: contactForm.contact,
      topic: contactForm.topic,
      text: contactForm.text,
      date: "لحظاتی پیش",
      read: false,
    };
    setMessages((curr) => [newMsg, ...curr]);
    setContactSent(true);
    setContactForm({ name: "", contact: "", topic: "مشاوره چیدمان و دکور", text: "" });
    setToast("پیام شما مستقیماً به صندوق ورودی مدیر ارسال شد ✓");
  }

  // محاسبات و توابع پنل مدیریت (Admin)
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0) + 118500000, [orders]);
  const pendingOrdersCount = useMemo(() => orders.filter((o) => o.status === "pending").length, [orders]);
  const activeProductsCount = useMemo(() => products.filter((p) => p.active).length, [products]);
  const lowStockCount = useMemo(() => products.filter((p) => p.active && p.stock <= 5).length, [products]);
  const unreadMessagesCount = useMemo(() => messages.filter((m) => !m.read).length, [messages]);
  const adminCategories = ["همه", "ظروف", "دکور", "خانه و عطر", "روشنایی", "بافت و پارچه", "میز و پذیرایی"];

  const filteredAdminProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCat = adminCategory === "همه" || item.category === adminCategory;
      const matchSearch = `${item.name} ${item.color} ${item.category}`.includes(adminSearch.trim());
      return matchCat && matchSearch;
    });
  }, [products, adminCategory, adminSearch]);

  function handleLogin(e) {
    e.preventDefault();
    if (passwordInput === "borhan1405" || passwordInput === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("khanehzad-admin-auth", "true");
      setLoginError("");
      setToast("خوش آمدی برهان جان! اتاق فرمان آماده است.");
    } else {
      setLoginError("رمز عبور اشتباه است! (رمز مدیر: borhan1405)");
    }
  }

  function handleDemoLogin() {
    setIsAuthenticated(true);
    localStorage.setItem("khanehzad-admin-auth", "true");
    setToast("ورود سریع کارفرما انجام شد.");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("khanehzad-admin-auth");
    setPasswordInput("");
  }

  function openAddModal() {
    setEditingProduct(null);
    setFormData({ name: "", category: "ظروف", price: "", color: "", stock: 12, tag: "جدید", image: "" });
    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      color: product.color,
      stock: product.stock,
      tag: product.tag || "",
      image: product.image || "",
    });
    setIsModalOpen(true);
  }

  function handleSaveProduct(e) {
    e.preventDefault();
    const numericPrice = Number(formData.price) || 500000;
    const numericStock = Number(formData.stock) || 0;

    if (editingProduct) {
      setProducts((current) =>
        current.map((item) =>
          item.id === editingProduct.id
            ? { ...item, ...formData, price: numericPrice, stock: numericStock, active: numericStock > 0 }
            : item
        )
      );
      setToast(`«${formData.name}» با موفقیت بروزرسانی شد.`);
    } else {
      const newProduct = {
        id: `item-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        price: numericPrice,
        color: formData.color || "دست‌ساز",
        stock: numericStock,
        tag: formData.tag || "جدید",
        active: numericStock > 0,
        image: formData.image || jarImage,
      };
      setProducts((current) => [newProduct, ...current]);
      setToast(`«${formData.name}» به انبار و ویترین فروشگاه اضافه شد!`);
    }
    setIsModalOpen(false);
  }

  function adjustStockQuick(id, delta) {
    setProducts((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextStock = Math.max(0, item.stock + delta);
        return { ...item, stock: nextStock, active: nextStock > 0 };
      })
    );
  }

  function toggleProductActive(id) {
    setProducts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, active: !item.active, stock: !item.active ? Math.max(1, item.stock) : 0 } : item
      )
    );
    setToast("وضعیت نمایش محصول در فروشگاه تغییر کرد.");
  }

  function handleDeleteProduct(id, name) {
    setProducts((current) => current.filter((item) => item.id !== id));
    setToast(`«${name}» از انبار حذف شد.`);
  }

  function setOrderStatus(orderId, newStatus) {
    setOrders((current) => current.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    setToast("مرحله ارسال سفارش بروزرسانی شد.");
  }

  function resetToDefaultData() {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setMessages(initialMessages);
    localStorage.setItem("khanehzad-admin-products", JSON.stringify(initialProducts));
    localStorage.setItem("khanehzad-admin-orders", JSON.stringify(initialOrders));
    localStorage.setItem("khanehzad-admin-msgs", JSON.stringify(initialMessages));
    setToast("تمام اطلاعات فروشگاه و پنل به حالت پیش‌فرض برگشت.");
  }

  // ==========================================
  // استایل سراسری فونت وزیرمتن + دارک‌مود نرم و مخملی
  // ==========================================
  const globalStyles = (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
      />
      <style>{`
        .kz-root {
          font-family: 'Vazirmatn', system-ui, -apple-system, sans-serif !important;
          --bg-main: #f8f7f4;
          --bg-card: #ffffff;
          --bg-subtle: #f1efe9;
          --text-main: #1c1917;
          --text-muted: #78716c;
          --border-color: #e7e5e4;
          --border-subtle: #f0eee9;
          background-color: var(--bg-main);
          color: var(--text-main);
          transition: background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1), color 0.35s ease;
        }
        .kz-root.kz-dark {
          --bg-main: #0c0a09;
          --bg-card: #171412;
          --bg-subtle: #211d1a;
          --text-main: #f5f5f4;
          --text-muted: #a8a29e;
          --border-color: #292524;
          --border-subtle: #221f1d;
        }
        .kz-card {
          background-color: var(--bg-card);
          border-color: var(--border-color);
          color: var(--text-main);
          transition: background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.45s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .kz-subtle {
          background-color: var(--bg-subtle);
          border-color: var(--border-color);
          transition: background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.45s ease;
        }
        .kz-muted {
          color: var(--text-muted);
        }
        .kz-border {
          border-color: var(--border-color);
        }
        .kz-border-subtle {
          border-color: var(--border-subtle);
        }
        .kz-dark .dark-accent {
          color: #bef264 !important;
        }
        .kz-input {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          transition: all 0.3s ease;
        }
        .kz-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }
      `}</style>
    </>
  );

  // ==========================================
  // بخش اول: پنل مدیریت (اتاق فرمان بصری و فوق‌حرفه‌ای)
  // ==========================================
  if (route === "admin") {
    if (!isAuthenticated) {
      return (
        <div dir="rtl" className={`kz-root ${darkMode ? "kz-dark" : ""} min-h-screen flex items-center justify-center p-4`}>
          {globalStyles}
          <div className="kz-card w-full max-w-md rounded-3xl border p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-2xl font-black text-lime-200 shadow-lg">
                خ
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark-accent">
                <Icon name="lock" size={13} /> منطقه حفاظت‌شده مدیریت
              </span>
              <h1 className="mt-3 text-2xl font-extrabold">اتاق فرمان خانه‌زاد</h1>
              <p className="mt-1.5 text-xs kz-muted leading-6">
                پنل یکپارچه مدیریت انبار، سفارش‌های زنده و پیام‌های مشتریان
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold">رمز عبور مدیر ارشد</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="رمز عبور را وارد کنید (borhan1405)..."
                  className="kz-input w-full rounded-xl px-4 py-3.5 text-xs outline-none"
                  required
                />
                {loginError && <p className="mt-2 text-xs font-medium text-rose-500">{loginError}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-900 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-800 cursor-pointer"
              >
                باز کردن قفل و ورود به پنل
              </button>
            </form>

            <div className="mt-6 border-t kz-border pt-5 text-center space-y-3">
              <div className="kz-subtle rounded-2xl p-4 border">
                <p className="text-[11px] kz-muted leading-5 mb-3">
                  👋 <strong className="text-emerald-800 dark-accent">کارفرمای محترم هستید؟</strong> برای تست زنده داشبورد بدون نیاز به تایپ رمز، دکمه زیر را بزنید:
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full rounded-xl bg-stone-900 py-2.5 text-xs font-bold text-lime-200 transition hover:bg-emerald-950 cursor-pointer"
                >
                  ورود سریع کارفرما (حالت دمو) ←
                </button>
              </div>

              <a href="#home" className="inline-flex items-center gap-1.5 text-xs font-semibold kz-muted hover:text-emerald-700 pt-1">
                ← بازگشت به ویترین فروشگاه خانه‌زاد
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div dir="rtl" className={`kz-root ${darkMode ? "kz-dark" : ""} min-h-screen flex flex-col lg:flex-row`}>
        {globalStyles}

        {/* سایدبار مدرن سمت راست */}
        <aside className="w-full bg-stone-950 text-stone-100 lg:w-72 lg:shrink-0 lg:min-h-screen flex flex-col justify-between border-b lg:border-b-0 lg:border-l border-stone-800">
          <div>
            <div className="flex items-center justify-between px-6 py-6 border-b border-stone-800/80">
              <div className="flex items-center gap-3.5">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-lime-300 to-emerald-400 text-xl font-black text-stone-950 shadow-md">
                  <BrandMark />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-white">اتاق فرمان خانه‌زاد</h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-lime-300">
                    <i className="size-1.5 rounded-full bg-lime-400 animate-ping" /> متصل به ویترین فروشگاه
                  </span>
                </div>
              </div>
            </div>

            {/* دکمه طلایی مشاهده زنده سایت */}
            <div className="p-4 border-b border-stone-800/80">
              <a
                href="#home"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-lime-200 to-emerald-200 text-stone-950 py-3 px-4 text-xs font-extrabold shadow-md transition hover:brightness-105"
              >
                <Icon name="eye" size={17} /> مشاهده زنده ویترین فروشگاه
              </a>
            </div>

            {/* منوی ناوبری پنل با شمارنده‌های زنده */}
            <div className="px-4 pt-4 pb-2">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">بخش‌های مدیریتی</span>
              <nav className="mt-2 flex overflow-x-auto gap-1.5 lg:flex-col">
                {[
                  { id: "dashboard", label: "پیشخوان و نمودارها", icon: "dashboard", badge: null },
                  { id: "products", label: "انبار و قیمت محصولات", icon: "box", badge: formatNum(products.length) },
                  { id: "orders", label: "سفارش‌های مشتریان", icon: "orders", badge: formatNum(orders.length), alert: pendingOrdersCount > 0 },
                  { id: "messages", label: "پیام‌های فرم تماس", icon: "mail", badge: formatNum(messages.length), alert: unreadMessagesCount > 0 },
                  { id: "journal", label: "مقالات مجله خانه", icon: "journal", badge: formatNum(stories.length) },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveAdminTab(item.id)}
                    className={`flex shrink-0 items-center justify-between gap-3 px-4 py-3.5 text-xs rounded-xl transition cursor-pointer ${
                      activeAdminTab === item.id
                        ? "bg-emerald-900/90 text-white font-bold shadow-md border border-emerald-700/50"
                        : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.alert ? "bg-amber-400 text-stone-950" : "bg-stone-800 text-stone-300"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* پروفایل مدیر در پایین سایدبار */}
          <div className="hidden lg:block p-4 border-t border-stone-800/80 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-stone-900 p-3">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-lime-200 text-xs font-black text-stone-950">
                  ب
                </div>
                <div>
                  <strong className="block text-xs text-white">برهان (مدیر ارشد)</strong>
                  <small className="text-[10px] text-stone-400">دسترسی کامل (Full Access)</small>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="قفل کردن پنل"
                className="p-2 text-rose-400 hover:bg-stone-800 rounded-lg transition cursor-pointer"
              >
                <Icon name="logout" size={17} />
              </button>
            </div>
          </div>
        </aside>

        {/* بدنه اصلی پنل مدیریت */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* هدر بالای داشبورد */}
          <header className="kz-card flex h-20 items-center justify-between border-b px-5 sm:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex w-full items-center">
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => {
                    setAdminSearch(e.target.value);
                    if (activeAdminTab !== "products") setActiveAdminTab("products");
                  }}
                  placeholder="جستجوی سریع نام محصول، رنگ یا دسته‌بندی در انبار..."
                  className="kz-input w-full rounded-xl py-2.5 pr-10 pl-4 text-xs outline-none"
                />
                <span className="absolute right-3.5 kz-muted">
                  <Icon name="search" size={16} />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 cursor-pointer"
              >
                <Icon name="plus" size={16} /> <span className="hidden sm:inline">افزودن محصول جدید</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="kz-subtle grid size-10 place-items-center rounded-xl border transition hover:scale-105 cursor-pointer"
                title={darkMode ? "تم روشن" : "تم تیره"}
              >
                <Icon name={darkMode ? "sun" : "moon"} size={18} />
              </button>

              <button
                onClick={resetToDefaultData}
                className="kz-subtle hidden md:inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-[11px] font-semibold kz-muted hover:text-rose-600 cursor-pointer"
                title="برگشت اطلاعات به حالت اولیه"
              >
                بازنشانی اطلاعات
              </button>
            </div>
          </header>

          <main className="p-5 sm:p-8 space-y-7 max-w-7xl w-full mx-auto">
            {/* نوار راهنمای تعاملی برای فهم سریع پنل */}
            {showAdminGuide && (
              <div className="rounded-2xl bg-gradient-to-l from-emerald-950 via-emerald-900 to-stone-900 p-5 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-lime-300 text-xs font-bold">
                    <Icon name="sparkles" size={16} /> راهنمای سریع اتاق فرمان (ویژه مدیر و کارفرما)
                  </div>
                  <p className="text-xs text-stone-200 leading-6">
                    این پنل به صورت <strong>زنده (Real-Time)</strong> به فروشگاه وصل است: ۱. با دکمه‌های <strong>+ و -</strong> موجودی انبار را تغییر دهید ۲. وضعیت سفارش‌ها را عوض کنید ۳. روی <strong>«مشاهده زنده ویترین فروشگاه»</strong> کلیک کنید تا تغییراتتان را در سایت ببینید!
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminGuide(false)}
                  className="self-end md:self-center shrink-0 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold hover:bg-white/20 cursor-pointer"
                >
                  متوجه شدم ✕
                </button>
              </div>
            )}

            {/* ۴ کارت آماری گرافیکی و بسیار واضح */}
            {activeAdminTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="kz-card rounded-2xl border p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold kz-muted">درآمد کل این ماه</span>
                      <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700 dark-accent">
                        <Icon name="orders" size={20} />
                      </span>
                    </div>
                    <strong className="mt-3 block text-2xl font-black">{formatPrice(totalRevenue)}</strong>
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-emerald-700 dark-accent font-bold">+۱۸٪ رشد نسبت به ماه قبل</span>
                        <span className="kz-muted">۸۵٪ از هدف ماه</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
                        <div className="h-full w-[85%] rounded-full bg-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="kz-card rounded-2xl border p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold kz-muted">وضعیت سفارش‌ها</span>
                      <span className="grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
                        <Icon name="bag" size={20} />
                      </span>
                    </div>
                    <strong className="mt-3 block text-2xl font-black">{formatNum(orders.length)} سفارش ثبت‌شده</strong>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                        {formatNum(pendingOrdersCount)} منتظر بسته‌بندی
                      </span>
                    </div>
                  </div>

                  <div className="kz-card rounded-2xl border p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold kz-muted">موجودی انبار فروشگاه</span>
                      <span className="grid size-10 place-items-center rounded-xl bg-sky-500/10 text-sky-600">
                        <Icon name="box" size={20} />
                      </span>
                    </div>
                    <strong className="mt-3 block text-2xl font-black">
                      {formatNum(activeProductsCount)} <span className="text-sm font-normal kz-muted">از {formatNum(products.length)} کالا فعال</span>
                    </strong>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[11px] font-bold text-rose-600">
                        {formatNum(lowStockCount)} کالا رو به اتمام (کمتر از ۵ عدد)
                      </span>
                    </div>
                  </div>

                  <div className="kz-card rounded-2xl border p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold kz-muted">پیام‌های مشتریان</span>
                      <span className="grid size-10 place-items-center rounded-xl bg-purple-500/10 text-purple-600">
                        <Icon name="mail" size={20} />
                      </span>
                    </div>
                    <strong className="mt-3 block text-2xl font-black">{formatNum(messages.length)} پیام دریافتی</strong>
                    <button
                      onClick={() => setActiveAdminTab("messages")}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark-accent hover:underline cursor-pointer"
                    >
                      مشاهده صندوق پیام‌ها ←
                    </button>
                  </div>
                </div>

                {/* بخش نمودارهای دوقلو (روند فروش + محبوب‌ترین دسته‌ها) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="kz-card lg:col-span-2 rounded-2xl border p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <h3 className="text-base font-extrabold">نمودار رشد فروش ۶ ماه اخیر</h3>
                        <p className="text-xs kz-muted mt-0.5">مبالغ به میلیون تومان · روی ستون‌ها نگه دارید</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-800 dark-accent">
                        رکورد فروش در شهریور: ۱۲۸ میلیون
                      </span>
                    </div>

                    <div className="grid grid-cols-6 gap-3 sm:gap-5 items-end h-52 pt-8 px-2 border-b kz-border">
                      {salesChartData.map((item) => {
                        const heightPercent = Math.round((item.amount / 135) * 100);
                        return (
                          <div key={item.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                            <div className="text-center">
                              <span className="block text-xs font-extrabold text-emerald-800 dark-accent">
                                {formatNum(item.amount)}م
                              </span>
                              <small className="hidden sm:block text-[10px] kz-muted">{formatNum(item.orders)} سفارش</small>
                            </div>
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className="w-full max-w-14 rounded-t-xl bg-gradient-to-t from-emerald-950 via-emerald-800 to-emerald-600 transition-all duration-500 group-hover:brightness-125 shadow-sm"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-6 gap-3 pt-3 text-center text-xs font-semibold kz-muted">
                      {salesChartData.map((item) => (
                        <span key={item.month}>{item.month}</span>
                      ))}
                    </div>
                  </div>

                  {/* نمودار سهم دسته‌بندی‌ها */}
                  <div className="kz-card rounded-2xl border p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold">پرفروش‌ترین دسته‌بندی‌ها</h3>
                      <p className="text-xs kz-muted mt-0.5">سهم هر بخش از کل درآمد فروشگاه</p>

                      <div className="mt-6 space-y-4">
                        {[
                          { name: "ظروف سرامیکی دست‌ساز", percent: 38, color: "bg-emerald-600" },
                          { name: "دکور و گلدان", percent: 26, color: "bg-teal-600" },
                          { name: "چراغ و روشنایی چوبی", percent: 18, color: "bg-amber-600" },
                          { name: "شمع و عطر خانه", percent: 11, color: "bg-lime-600" },
                          { name: "بافت و پارچه", percent: 7, color: "bg-stone-500" },
                        ].map((cat) => (
                          <div key={cat.name} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>{cat.name}</span>
                              <span>{formatNum(cat.percent)}٪</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-stone-200/70 overflow-hidden">
                              <div style={{ width: `${cat.percent}%` }} className={`h-full rounded-full ${cat.color}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="kz-subtle mt-6 rounded-xl p-3.5 border text-xs leading-6">
                      💡 <strong>پیشنهاد هوشمند:</strong> دسته‌ی «ظروف سرامیکی» بیشترین تقاضا را دارد. شارژ موجودی ماگ و بشقاب در اولویت است.
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* جدول فوق‌حرفه‌ای مدیریت انبار و محصولات */}
            {(activeAdminTab === "dashboard" || activeAdminTab === "products") && (
              <div className="kz-card rounded-2xl border p-5 sm:p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b kz-border">
                  <div>
                    <h2 className="text-lg font-extrabold">مدیریت زنده انبار و قیمت‌ها</h2>
                    <p className="mt-1 text-xs kz-muted">
                      با دکمه‌های + و - موجودی را تغییر بده یا با کلید وضعیت، محصول را در فروشگاه موجود/ناموجود کن.
                    </p>
                  </div>
                  <button
                    onClick={openAddModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 cursor-pointer"
                  >
                    <Icon name="plus" size={16} /> تعریف محصول جدید در فروشگاه
                  </button>
                </div>

                {/* فیلتر دسته‌بندی‌های انبار */}
                <div className="my-4 flex gap-2 overflow-x-auto pb-2">
                  {adminCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setAdminCategory(cat)}
                      className={`shrink-0 px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                        adminCategory === cat
                          ? "bg-emerald-900 text-white shadow-xs"
                          : "kz-subtle kz-muted hover:text-emerald-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs border-collapse">
                    <thead>
                      <tr className="border-b kz-border kz-muted">
                        <th className="py-3.5 px-3 font-bold">تصویر و مشخصات کالا</th>
                        <th className="py-3.5 px-3 font-bold">دسته‌بندی · رنگ</th>
                        <th className="py-3.5 px-3 font-bold">قیمت در ویترین</th>
                        <th className="py-3.5 px-3 font-bold">تنظیم سریع موجودی</th>
                        <th className="py-3.5 px-3 font-bold">نمایش در فروشگاه</th>
                        <th className="py-3.5 px-3 font-bold text-left">ویرایش / حذف</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y kz-border-subtle">
                      {filteredAdminProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-emerald-500/5 transition">
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3.5">
                              <SafeImage
                                src={product.image}
                                alt={product.name}
                                className="size-13 shrink-0 rounded-xl object-cover border kz-border"
                              />
                              <div>
                                <strong className="block text-sm font-bold">{product.name}</strong>
                                {product.tag && (
                                  <span className="mt-1 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark-accent">
                                    {product.tag}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 kz-muted font-medium">
                            {product.category} · {product.color}
                          </td>
                          <td className="py-3.5 px-3 font-extrabold text-sm text-emerald-800 dark-accent">
                            {formatPrice(product.price)}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="inline-flex items-center gap-2 kz-subtle border rounded-xl px-2 py-1">
                              <button
                                onClick={() => adjustStockQuick(product.id, -1)}
                                className="grid size-6 place-items-center rounded-lg hover:bg-stone-300/50 font-bold cursor-pointer"
                                title="کم کردن موجودی"
                              >
                                -
                              </button>
                              <span className={`min-w-8 text-center font-extrabold ${product.stock <= 5 ? "text-amber-600" : ""}`}>
                                {formatNum(product.stock)} عدد
                              </span>
                              <button
                                onClick={() => adjustStockQuick(product.id, 1)}
                                className="grid size-6 place-items-center rounded-lg hover:bg-stone-300/50 font-bold cursor-pointer"
                                title="افزایش موجودی"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => toggleProductActive(product.id)}
                              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                                product.active
                                  ? "bg-emerald-500/15 text-emerald-800 dark-accent"
                                  : "bg-rose-500/15 text-rose-600"
                              }`}
                            >
                              <span className={`size-2 rounded-full ${product.active ? "bg-emerald-600" : "bg-rose-600"}`} />
                              {product.active ? "فعال و قابل خرید" : "ناموجود (قفل)"}
                            </button>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(product)}
                                className="kz-subtle inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold hover:border-emerald-600 cursor-pointer"
                              >
                                <Icon name="edit" size={14} /> ویرایش
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                className="grid size-8 place-items-center rounded-xl border border-rose-500/30 text-rose-600 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                                title="حذف کالا"
                              >
                                <Icon name="trash" size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* بخش مدیریت مرحله‌ای سفارش‌های مشتریان */}
            {(activeAdminTab === "dashboard" || activeAdminTab === "orders") && (
              <div className="kz-card rounded-2xl border p-5 sm:p-6 shadow-xs">
                <div className="mb-5">
                  <h2 className="text-lg font-extrabold">پیگیری و تغییر وضعیت سفارش‌های مشتریان</h2>
                  <p className="mt-1 text-xs kz-muted">
                    برای تغییر مرحله هر سفارش، کافیست روی یکی از ۳ مرحله‌ی سمت چپ کلیک کنی.
                  </p>
                </div>

                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="kz-subtle rounded-2xl border p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="rounded-lg bg-stone-900 px-2.5 py-1 font-mono text-xs font-bold text-lime-300">
                            {order.id}
                          </span>
                          <strong className="text-sm font-extrabold">{order.customer}</strong>
                          <span className="text-xs kz-muted">({order.city} · {order.phone})</span>
                          <span className="text-[11px] kz-muted">• {order.date}</span>
                        </div>
                        <p className="text-xs kz-muted pt-1">
                          📦 اقلام سفارش: <strong className="text-stone-700 dark-accent">{order.items}</strong>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="text-right sm:text-left">
                          <span className="block text-[10px] kz-muted">مبلغ پرداختی</span>
                          <strong className="text-sm font-black text-emerald-800 dark-accent">{formatPrice(order.total)}</strong>
                        </div>

                        {/* دکمه‌های ۳ مرحله‌ای واضح برای تغییر وضعیت سفارش */}
                        <div className="flex items-center gap-1 rounded-xl bg-stone-200/70 p-1 dark:bg-stone-900">
                          {[
                            { key: "pending", label: "۱. در انتظار بررسی", activeClass: "bg-amber-500 text-stone-950" },
                            { key: "packed", label: "۲. بسته‌بندی شده", activeClass: "bg-sky-600 text-white" },
                            { key: "shipped", label: "۳. ارسال شده", activeClass: "bg-emerald-700 text-white" },
                          ].map((st) => (
                            <button
                              key={st.key}
                              onClick={() => setOrderStatus(order.id, st.key)}
                              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                                order.status === st.key ? `${st.activeClass} shadow-xs` : "kz-muted hover:text-stone-900"
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تب صندوق پیام‌های فرم تماس با ما */}
            {activeAdminTab === "messages" && (
              <div className="kz-card rounded-2xl border p-6 shadow-xs">
                <h2 className="text-lg font-extrabold">صندوق پیام‌های دریافتی از صفحه «تماس با ما»</h2>
                <p className="mt-1 text-xs kz-muted mb-5">
                  هر پیامی که کاربران در فرم تماسِ سایت ثبت کنند، مستقیماً به این لیست اضافه می‌شود.
                </p>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="kz-subtle rounded-2xl border p-5 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="rounded-full bg-emerald-800 px-3 py-0.5 text-[11px] font-bold text-white">
                            {msg.topic}
                          </span>
                          <strong className="text-sm font-bold">{msg.name}</strong>
                          <span className="text-xs kz-muted">({msg.contact})</span>
                          <small className="text-[11px] kz-muted">• {msg.date}</small>
                        </div>
                        <p className="text-xs leading-7">{msg.text}</p>
                      </div>
                      <button
                        onClick={() => setMessages((curr) => curr.filter((m) => m.id !== msg.id))}
                        className="self-end sm:self-center shrink-0 text-xs text-rose-600 hover:underline cursor-pointer"
                      >
                        حذف پیام
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تب مدیریت مجله خانه */}
            {activeAdminTab === "journal" && (
              <div className="kz-card rounded-2xl border p-6 shadow-xs">
                <h2 className="text-lg font-extrabold mb-1">مدیریت مقاله‌های «مجله خانه»</h2>
                <p className="text-xs kz-muted mb-5">لیست داستان‌ها و مقاله‌های منتشر شده در فروشگاه</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {stories.map((story) => (
                    <div key={story.id} className="kz-subtle flex items-center justify-between rounded-2xl border p-4 gap-3">
                      <div className="flex items-center gap-3.5">
                        <SafeImage src={story.image} alt={story.title} className="size-16 rounded-xl object-cover shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold text-emerald-800 dark-accent">{story.meta}</span>
                          <h3 className="mt-1 text-sm font-bold">{story.title}</h3>
                          <small className="text-[11px] kz-muted">بازدید: {formatNum(story.views)} نفر</small>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setStories((curr) => curr.filter((s) => s.id !== story.id));
                          setToast("مقاله از مجله حذف شد.");
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* مودال افزودن / ویرایش محصول */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs">
            <div className="kz-card w-full max-w-lg rounded-3xl border p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b kz-border pb-4">
                <h3 className="text-base font-extrabold">
                  {editingProduct ? `ویرایش «${editingProduct.name}»` : "افزودن محصول جدید به فروشگاه خانه‌زاد"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="kz-muted hover:text-rose-500 cursor-pointer">
                  <Icon name="close" size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="mt-5 space-y-4 text-xs">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 font-bold">
                    نام محصول
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثلاً: گلدان سرامیکی مهتاب"
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 font-bold">
                    دسته‌بندی
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    >
                      {adminCategories.filter((c) => c !== "همه").map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-1.5 font-bold">
                    قیمت (تومان)
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="950000"
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 font-bold">
                    رنگ / جنس
                    <input
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="سفید مرمری"
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 font-bold">
                    تعداد موجودی
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 font-bold">
                    برچسب ویژه (اختیاری)
                    <input
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="جدید، پرفروش، محدود..."
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 font-bold">
                    لینک عکس (اختیاری)
                    <input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="آدرس عکس (اختیاری)"
                      className="kz-input rounded-xl px-3.5 py-2.5 outline-none font-normal"
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t kz-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="kz-subtle rounded-xl border px-5 py-2.5 font-bold cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-800 px-6 py-2.5 font-bold text-white hover:bg-emerald-700 cursor-pointer"
                  >
                    ذخیره و انتشار در فروشگاه
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 flex min-h-12 -translate-x-1/2 items-center gap-3 rounded-2xl bg-stone-900 px-6 text-xs font-bold text-lime-200 shadow-2xl border border-stone-700">
            <Icon name="check" size={17} />
            <span>{toast}</span>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // بخش دوم: ویترین فروشگاه خانه‌زاد (با طراحی مجله‌ای و لوکس)
  // ==========================================
  const header = (
    <>
      <div className="bg-emerald-950 px-4 py-2.5 text-center text-xs text-emerald-50 flex items-center justify-center gap-4 flex-wrap">
        <span>ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان <span className="mx-1 text-lime-300">✳</span> دست‌سازه‌های اصیل ایرانی برای آرامش خانه</span>
        <a
          href="#admin"
          className="inline-flex items-center gap-1.5 rounded-full bg-lime-300 px-3 py-0.5 text-[11px] font-extrabold text-stone-950 hover:bg-white transition shadow-xs"
        >
          <Icon name="lock" size={12} /> ورود به اتاق فرمان (پنل مدیریت)
        </a>
      </div>

      <header className="kz-card sticky top-0 z-30 border-b backdrop-blur-md bg-opacity-90">
        <div className="mx-auto flex h-20 w-[calc(100%-32px)] max-w-7xl items-center justify-between sm:w-[calc(100%-64px)]">
          <button
            className="inline-flex p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="باز کردن منو"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>

          <a className="flex items-center gap-3" href="#home">
            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-900 text-xl font-black text-lime-200 shadow-sm">
              <BrandMark />
            </span>
            <span className="flex flex-col">
              <strong className="text-lg sm:text-xl font-black tracking-tight">خانه‌زاد</strong>
              <small className="text-[10px] kz-muted">استودیوی طراحی و دست‌سازه‌های خانه</small>
            </span>
          </a>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } kz-card absolute inset-x-0 top-full flex-col border-b px-6 py-4 shadow-xl md:static md:flex md:h-full md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {[
              ["صفحه اصلی", "home"],
              ["فروشگاه", "shop"],
              ["داستان ما", "about"],
              ["مجله خانه", "journal"],
              ["تماس و مشاوره", "contact"],
            ].map(([label, target]) => (
              <a
                key={target}
                className={`py-3 text-xs sm:text-sm transition hover:text-emerald-700 md:py-0 ${
                  route === target ? "font-extrabold text-emerald-800 dark-accent" : "kz-muted font-medium"
                }`}
                href={`#${target}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <form
              className="kz-subtle hidden h-10 w-48 items-center rounded-xl border px-3 lg:flex"
              onSubmit={(e) => {
                e.preventDefault();
                setCategory("همه محصولات");
                window.location.hash = "shop";
              }}
            >
              <input
                className="w-full bg-transparent text-xs outline-none"
                placeholder="جست‌وجوی ماگ، گلدان..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value.trim() && !["shop", "favorites"].includes(route)) {
                    window.location.hash = "shop";
                  }
                }}
              />
              <button aria-label="جست‌وجو" className="kz-muted">
                <Icon name="search" size={17} />
              </button>
            </form>

            <button
              className="kz-subtle grid size-10 place-items-center rounded-xl border transition hover:scale-105 cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "حالت روز" : "حالت شب"}
            >
              <Icon name={darkMode ? "sun" : "moon"} size={18} />
            </button>

            <a
              className="kz-subtle relative grid size-10 place-items-center rounded-xl border transition hover:scale-105 max-sm:hidden"
              href="#favorites"
              aria-label="علاقه‌مندی‌ها"
            >
              <Icon name="heart" size={18} filled={favorites.length > 0} className={favorites.length > 0 ? "text-rose-600" : ""} />
              <span className="absolute -left-1 -top-1 grid min-w-4.5 place-items-center rounded-full bg-emerald-800 px-1 text-[10px] font-bold text-white">
                {formatNum(favorites.length)}
              </span>
            </a>

            <a
              className="kz-subtle relative grid size-10 place-items-center rounded-xl border transition hover:scale-105"
              href="#cart"
              aria-label="سبد خرید"
            >
              <Icon name="bag" size={18} />
              <span className="absolute -left-1 -top-1 grid min-w-4.5 place-items-center rounded-full bg-emerald-800 px-1 text-[10px] font-bold text-white">
                {formatNum(cartCount)}
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );

  const footer = (
    <footer className="bg-stone-950 text-stone-200 border-t border-stone-800 mt-16">
      <div className="mx-auto grid w-[calc(100%-40px)] max-w-7xl gap-10 py-14 sm:w-[calc(100%-64px)] sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.9fr_1.2fr]">
        <div>
          <a className="flex items-center gap-3 text-lg font-black text-white" href="#home">
            <span className="grid size-10 place-items-center rounded-2xl bg-lime-200 text-stone-950">خ</span>
            خانه‌زاد
          </a>
          <p className="mt-4 max-w-64 text-xs leading-7 text-stone-400">
            استودیوی طراحی و ساخت اشیاء دست‌ساز برای خانه. ما به چیزهایی باور داریم که با حوصله ساخته می‌شوند و سال‌ها کنار شما می‌مانند.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 text-xs text-stone-400">
          <h3 className="mb-1 text-sm font-bold text-white">بخش‌های فروشگاه</h3>
          <a href="#shop" className="hover:text-lime-300 transition">همه محصولات دست‌ساز</a>
          <a href="#about" className="hover:text-lime-300 transition">داستان ما و هنرمندان</a>
          <a href="#journal" className="hover:text-lime-300 transition">مجله خانه و دکوراسیون</a>
          <a href="#contact" className="hover:text-lime-300 transition">مشاوره چیدمان و تماس</a>
        </div>

        <div className="flex flex-col items-start gap-3 text-xs text-stone-400">
          <h3 className="mb-1 text-sm font-bold text-white">مدیریت و خدمات</h3>
          <a href="#admin" className="text-lime-300 font-bold hover:underline flex items-center gap-1.5">
            <Icon name="lock" size={14} /> پنل مدیریت (اتاق فرمان)
          </a>
          <a href="#contact" className="hover:text-white">ضمانت سلامت فیزیکی کالا</a>
          <a href="#contact" className="hover:text-white">شرایط بازگشت ۷ روزه</a>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">عضویت در نامه‌های خانه‌زاد</h3>
          <p className="mt-2 text-xs leading-6 text-stone-400">از مجموعه‌های جدید و قصه‌های کارگاه باخبر شو.</p>
          <form
            className="mt-3 flex rounded-xl bg-stone-900 border border-stone-800 p-1"
            onSubmit={(e) => {
              e.preventDefault();
              setNewsletterDone(true);
            }}
          >
            <input
              className="w-full bg-transparent px-3 py-2 text-xs outline-none placeholder:text-stone-500 text-white"
              type="email"
              placeholder="ایمیل شما..."
              required
            />
            <button className="rounded-lg bg-lime-200 px-3 py-2 text-xs font-bold text-stone-950">
              ثبت
            </button>
          </form>
          {newsletterDone && (
            <span className="mt-3 flex items-center gap-1 text-xs text-lime-300">
              <Icon name="check" size={15} /> به خانواده خانه‌زاد خوش آمدی!
            </span>
          )}
        </div>
      </div>
      <div className="border-t border-stone-800/80 py-5 text-center text-xs text-stone-500">
        © ۱۴۰۵ استودیو خانه‌زاد · طراحی و توسعه فرانت‌اند و پنل مدیریت با Next.js و Tailwind CSS
      </div>
    </footer>
  );

  // ==========================================
  // صفحه اصلی (Home)
  // ==========================================
  function renderHome() {
    return (
      <main>
        {/* بخش Hero مجله‌ای */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-14">
          <div className="order-2 lg:order-1">
            <Eyebrow>مجموعه پاییز و زمستان ۱۴۰۵</Eyebrow>
            <h1 className="mt-4 text-4xl font-black leading-[1.3] tracking-tight sm:text-6xl">
              برای خانه‌ای که
              <br />
              <span className="text-emerald-800 dark-accent">شبیه روح توست.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-8 kz-muted">
              اشیاء کوچک و دست‌سازی که روزهای معمولی را قشنگ‌تر می‌کنند. هر قطعه در کارگاه‌های کوچک ما، با دست و حوصله ساخته شده تا سال‌ها در خانه‌ات بماند.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-emerald-900 px-7 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-emerald-800"
                href="#shop"
              >
                کشف مجموعه دست‌ساز <Icon name="arrow" size={17} />
              </a>
              <a
                className="kz-card inline-flex min-h-12 items-center gap-2 rounded-xl border px-6 text-xs sm:text-sm font-bold transition hover:border-emerald-700"
                href="#about"
              >
                قصه‌ی کارگاه ما
              </a>
            </div>

            <div className="mt-9 pt-6 border-t kz-border grid grid-cols-3 gap-4 max-w-md">
              <div>
                <strong className="block text-xl font-black text-emerald-800 dark-accent">+۲,۴۰۰</strong>
                <small className="text-[11px] kz-muted">خانه‌ی گرم‌شده</small>
              </div>
              <div>
                <strong className="block text-xl font-black text-emerald-800 dark-accent">۱۸ هنرمند</strong>
                <small className="text-[11px] kz-muted">استادکار بومی</small>
              </div>
              <div>
                <strong className="block text-xl font-black text-emerald-800 dark-accent">۱۰۰٪</strong>
                <small className="text-[11px] kz-muted">ضمانت سلامت کالا</small>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[380px] sm:h-[490px] rounded-3xl overflow-hidden shadow-2xl border kz-border">
              <SafeImage
                className="size-full object-cover"
                src={jarImage}
                alt="فضای گرم خانه با دکور دست‌ساز"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-stone-950/70 backdrop-blur-md p-4 text-white border border-white/15">
                <div>
                  <span className="text-[11px] text-lime-300 font-bold">● کالکشن زندگی آرام</span>
                  <strong className="block text-sm mt-0.5">ظروف سرامیکی و چوب طبیعی</strong>
                </div>
                <a href="#shop" className="rounded-xl bg-lime-200 px-3.5 py-2 text-xs font-extrabold text-stone-950">
                  مشاهده ←
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* بخش دسته‌بندی‌های تصویری */}
        <section className="mx-auto w-[calc(100%-40px)] max-w-7xl py-10 sm:w-[calc(100%-64px)]">
          <SectionHeading eyebrow="برای هر گوشه از فضای زندگی">
            دسته‌بندی‌های <span className="text-emerald-800 dark-accent">خانه‌زاد</span>
          </SectionHeading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["ظروف", "سرامیکی و دست‌ساز", bowlImage],
              ["دکور", "گلدان و مجسمه", vaseImage],
              ["خانه و عطر", "شمع و دیفیوزر", candleImage],
              ["روشنایی", "چراغ‌های چوبی", lampImage],
              ["بافت و پارچه", "شال مبل و سبد", throwImage],
              ["میز و پذیرایی", "سینی و ظروف چوبی", trayImage],
            ].map(([name, sub, img]) => (
              <a
                key={name}
                href="#shop"
                onClick={() => setCategory(name)}
                className="group relative h-48 rounded-2xl overflow-hidden border kz-border shadow-xs"
              >
                <SafeImage src={img} alt={name} className="size-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <strong className="block text-sm font-bold">{name}</strong>
                  <small className="text-[10px] text-stone-300">{sub}</small>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* تازه‌های کارگاه */}
        <section className="mx-auto w-[calc(100%-40px)] max-w-7xl py-14 sm:w-[calc(100%-64px)]">
          <SectionHeading
            eyebrow="مستقیم از کوره و کارگاه"
            action={
              <a className="text-xs font-extrabold text-emerald-800 dark-accent hover:underline" href="#shop">
                مشاهده همه {formatNum(products.length)} محصول ←
              </a>
            }
          >
            محبوب‌ترین‌های <span className="text-emerald-800 dark-accent">این ماه</span>
          </SectionHeading>
          <ProductGrid
            items={products.slice(0, 4)}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={addToCart}
          />
        </section>

        {/* مجله خانه در صفحه اصلی */}
        <section className="mx-auto w-[calc(100%-40px)] max-w-7xl py-10 sm:w-[calc(100%-64px)]">
          <SectionHeading
            eyebrow="کمی مکث، کمی الهام"
            action={
              <a className="text-xs font-extrabold text-emerald-800 dark-accent hover:underline" href="#journal">
                همه‌ی مقاله‌های مجله ←
              </a>
            }
          >
            مجله‌ی <span className="text-emerald-800 dark-accent">زندگی آرام</span>
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 3).map((story) => (
              <a key={story.id} href="#journal" className="kz-card group rounded-2xl border overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <SafeImage src={story.image} alt={story.title} className="size-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold text-emerald-800 dark-accent">{story.meta}</span>
                  <h3 className="mt-2 text-base font-extrabold leading-7">{story.title}</h3>
                  <p className="mt-2 text-xs kz-muted leading-6 line-clamp-2">{story.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // صفحه فروشگاه (Shop)
  // ==========================================
  function renderShop(title = "فروشگاه دست‌سازه‌های خانه‌زاد") {
    return (
      <main className="mx-auto w-[calc(100%-40px)] max-w-7xl py-10 sm:w-[calc(100%-64px)] min-h-[65vh]">
        <div className="kz-subtle rounded-3xl border p-8 text-center mb-8">
          <Eyebrow>انتخاب آگاهانه، کیفیت ماندگار</Eyebrow>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black">{title}</h1>
          <p className="mt-2 text-xs kz-muted max-w-md mx-auto leading-6">
            هر محصولی که در پنل مدیریت اضافه یا ویرایش شود، به صورت لحظه‌ای در این لیست بروزرسانی می‌شود.
          </p>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 border-b kz-border pb-4 sm:flex-row sm:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  category === item
                    ? "bg-emerald-900 text-white shadow-xs"
                    : "kz-subtle kz-muted hover:text-emerald-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold kz-muted">{formatNum(visibleProducts.length)} کالا</span>
            <select
              className="kz-input rounded-xl px-3 py-2 text-xs font-semibold outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">مرتب‌سازی: پیشنهادی</option>
              <option value="price-low">قیمت: ارزان‌ترین</option>
              <option value="price-high">قیمت: گران‌ترین</option>
            </select>
          </div>
        </div>

        <ProductGrid
          items={visibleProducts}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onAdd={addToCart}
        />
      </main>
    );
  }

  // ==========================================
  // صفحه «داستان ما» (با ایده‌های خلاقانه: ۴ مرحله ساخت، تایم‌لاین و استادکاران)
  // ==========================================
  function renderAbout() {
    return (
      <main className="mx-auto w-[calc(100%-40px)] max-w-7xl py-10 sm:w-[calc(100%-64px)] space-y-16">
        {/* بنر اول داستان ما */}
        <section className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[420px] border kz-border shadow-xl">
          <SafeImage
            className="size-full object-cover brightness-50"
            src={storyImage6}
            alt="کارگاه سفالگری و دست‌سازه‌های خانه‌زاد"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
            <span className="rounded-full bg-lime-300/20 backdrop-blur-md px-4 py-1 text-xs font-bold text-lime-200 border border-lime-300/30">
              روایت شکل‌گیری خانه‌زاد
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-tight max-w-2xl">
              ما اشیاء را برای پر کردن فضا نمی‌سازیم؛ برای <span className="text-lime-300">حسِ زندگی</span> می‌سازیم.
            </h1>
            <p className="mt-4 max-w-xl text-xs sm:text-sm text-stone-200 leading-7">
              خانه‌زاد پلی است میان دست‌های صبور هنرمندان بومی ایران و خانه‌هایی که به دنبال آرامش، اصالت و گرما هستند.
            </p>
          </div>
        </section>

        {/* ایده ۱: چهار مرحله از خاک و چوب تا خانه شما */}
        <section>
          <SectionHeading eyebrow="پشت صحنه کارگاه ما">
            سفر ۴ مرحله‌ای ساخت هر <span className="text-emerald-800 dark-accent">قطعه دست‌ساز</span>
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "۰۱", title: "انتخاب مواد طبیعی", desc: "خاک رس خالص، چوب درختان هرس‌شده، موم سویا و الیاف ۱۰۰٪ طبیعی و بدون مواد شیمیایی." },
              { step: "۰۲", title: "فرم‌دهی با دست", desc: "بدون قالب‌های صنعتی؛ هر قطعه روی چرخ سفالگری یا میز نجاری با دستان استادکار شکل می‌گیرد." },
              { step: "۰۳", title: "پخت در کوره و پرداخت", desc: "پخت دو مرحله‌ای در دمای ۱۲۰۰ درجه و روغن‌کاری گیاهی چوب‌ها برای ماندگاری مادام‌العمر." },
              { step: "۰۴", title: "بسته‌بندی سبز و ارسال", desc: "بسته‌بندی امن با کاغذهای بازیافتی و برگ‌های خشک معطر، آماده برای سفر به خانه شما." },
            ].map((item) => (
              <div key={item.step} className="kz-card rounded-2xl border p-6 relative overflow-hidden">
                <span className="text-3xl font-black text-emerald-800/20 dark-accent">{item.step}</span>
                <h3 className="mt-3 text-base font-extrabold">{item.title}</h3>
                <p className="mt-2 text-xs kz-muted leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ایده ۲: معرفی استادکاران و هنرمندان خانه‌زاد */}
        <section className="kz-subtle rounded-3xl border p-6 sm:p-10">
          <SectionHeading eyebrow="آدم‌های پشت هر اثر">
            با استادکاران <span className="text-emerald-800 dark-accent">خانه‌زاد</span> آشنا شوید
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {artisans.map((art) => (
              <div key={art.name} className="kz-card rounded-2xl border p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5">
                    <div className={`grid size-13 place-items-center rounded-2xl text-lg font-black ${art.color}`}>
                      {art.avatar}
                    </div>
                    <div>
                      <strong className="block text-base font-extrabold">{art.name}</strong>
                      <span className="text-xs text-emerald-800 dark-accent font-semibold">{art.role} · {art.exp}</span>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-xs kz-muted leading-7 italic border-r-2 border-emerald-700 pr-3">
                    «{art.quote}»
                  </blockquote>
                </div>
                <div className="mt-5 pt-3 border-t kz-border-subtle flex items-center justify-between text-[11px] kz-muted">
                  <span>محل کارگاه: شیراز و داراب</span>
                  <span className="text-emerald-700 dark-accent font-bold">✓ اصالت تایید شده</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ایده ۳: تایم‌لاین مسیر رشد خانه‌زاد */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>مسیر ما در گذر زمان</Eyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold">از یک میز کوچک تا ۲,۴۰۰ خانه</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { year: "۱۴۰۲", title: "جرقه اولیه", text: "شروع کار با یک کوره سفالگری کوچک و طراحی اولین مجموعه ماگ‌های آوید." },
              { year: "۱۴۰۳", title: "پیوستن هنرمندان", text: "همکاری با ۱۸ هنرمند نجار و بافنده بومی از شهرهای مختلف استان فارس." },
              { year: "۱۴۰۴", title: "تولد فروشگاه آنلاین", text: "ارسال بیش از ۲,۴۰۰ بسته به سراسر ایران با رضایت ۹۸ درصدی مشتریان." },
              { year: "۱۴۰۵", title: "نسل جدید خانه‌زاد", text: "راه‌اندازی پلتفرم هوشمند جدید با مدیریت یکپارچه انبار و مشاوره دکوراسیون." },
            ].map((t) => (
              <div key={t.year} className="kz-card rounded-2xl border p-5 text-center">
                <span className="inline-block rounded-full bg-emerald-900 px-3 py-1 text-xs font-black text-lime-200">
                  سال {t.year}
                </span>
                <h3 className="mt-3 text-sm font-extrabold">{t.title}</h3>
                <p className="mt-2 text-xs kz-muted leading-6">{t.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // صفحه «تماس با ما» (با فرم متصل به پنل مدیریت + آکاردئون FAQ + وضعیت زنده)
  // ==========================================
  function renderContact() {
    return (
      <main className="mx-auto w-[calc(100%-40px)] max-w-7xl py-10 sm:w-[calc(100%-64px)] space-y-14">
        <div className="kz-subtle rounded-3xl border p-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-800 dark-accent">
            <i className="size-2 rounded-full bg-emerald-600 animate-ping" /> کارگاه و پشتیبانی هم‌اکنون فعال است
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black">ارتباط با استودیو و مشاوره چیدمان</h1>
          <p className="mt-2 text-xs kz-muted max-w-lg mx-auto leading-6">
            سوال درباره محصولات دارید، نیاز به مشاوره ست کردن رنگ‌ها دارید یا می‌خواهید سفارش عمده ثبت کنید؟ پیام شما مستقیماً به پنل مدیریت ارسال می‌شود.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* ستون اطلاعات تماس و کارت‌های ارتباطی */}
          <div className="space-y-4">
            <div className="kz-card rounded-2xl border p-5 flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-900 text-lime-200">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <span className="text-xs kz-muted">تلفن مستقیم کارگاه و پشتیبانی</span>
                <strong className="mt-1 block text-base font-extrabold" dir="ltr">۰۲۱ - ۸۸۸۸ ۱۲۳۴</strong>
                <small className="text-[11px] text-emerald-700 dark-accent">شنبه تا پنجشنبه · ساعت ۹ صبح تا ۸ شب</small>
              </div>
            </div>

            <div className="kz-card rounded-2xl border p-5 flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-900 text-lime-200">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <span className="text-xs kz-muted">پست الکترونیک و همکاری</span>
                <strong className="mt-1 block text-base font-extrabold">hello@khanehzad.ir</strong>
                <small className="text-[11px] kz-muted">پاسخگویی در کمتر از ۲ ساعت کاری</small>
              </div>
            </div>

            <div className="kz-card rounded-2xl border p-5 flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-900 text-lime-200">
                <Icon name="pin" size={20} />
              </span>
              <div>
                <span className="text-xs kz-muted">آدرس گالری و کارگاه مرکزی</span>
                <strong className="mt-1 block text-sm font-extrabold">تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۴</strong>
                <small className="text-[11px] kz-muted">امکان بازدید حضوری با هماهنگی قبلی</small>
              </div>
            </div>
          </div>

          {/* فرم هوشمند متصل به پنل مدیریت */}
          <form onSubmit={handleContactSubmit} className="kz-card rounded-3xl border p-6 sm:p-8 shadow-sm space-y-4">
            <div className="border-b kz-border pb-4">
              <h2 className="text-lg font-extrabold">ارسال پیام مستقیم به مدیر</h2>
              <p className="text-xs kz-muted mt-1">
                امتحان کن: هر پیامی اینجا بنویسی، بلافاصله در تب «پیام‌های فرم تماس» در پنل مدیریت قابل مشاهده است!
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs font-bold">
                نام و نام خانوادگی
                <input
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="مثلاً: مریم تابش"
                  className="kz-input rounded-xl px-3.5 py-3 text-xs font-normal outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold">
                شماره موبایل یا ایمیل
                <input
                  required
                  value={contactForm.contact}
                  onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                  placeholder="0912..."
                  className="kz-input rounded-xl px-3.5 py-3 text-xs font-normal outline-none"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-xs font-bold">
              موضوع پیام
              <select
                value={contactForm.topic}
                onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                className="kz-input rounded-xl px-3.5 py-3 text-xs font-normal outline-none"
              >
                <option>مشاوره چیدمان و دکور</option>
                <option>پیگیری سفارش ثبت‌شده</option>
                <option>همکاری به عنوان هنرمند دست‌ساز</option>
                <option>سفارش عمده و هدایای سازمانی</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-bold">
              متن پیام شما
              <textarea
                rows="4"
                required
                value={contactForm.text}
                onChange={(e) => setContactForm({ ...contactForm, text: e.target.value })}
                placeholder="سوال یا درخواست خود را بنویسید..."
                className="kz-input rounded-xl px-3.5 py-3 text-xs font-normal outline-none resize-y"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-900 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-800 cursor-pointer"
            >
              ارسال پیام به اتاق فرمان ←
            </button>

            {contactSent && (
              <div className="rounded-xl bg-emerald-500/15 p-3 text-xs font-semibold text-emerald-800 dark-accent flex items-center justify-between">
                <span>✓ پیام شما ثبت شد!</span>
                <a href="#admin" className="underline font-bold">مشاهده در پنل مدیریت ←</a>
              </div>
            )}
          </form>
        </div>

        {/* آکاردئون سوالات متداول */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>پاسخ به پرسش‌های پرتکرار</Eyebrow>
            <h2 className="mt-2 text-2xl font-extrabold">سوالات متداول خریداران</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="kz-card rounded-2xl border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between p-5 text-right text-xs sm:text-sm font-extrabold cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <Icon name="chevronDown" size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-700" : "kz-muted"}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs kz-muted leading-7 border-t kz-border-subtle">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // صفحه جزئیات محصول، سبد خرید و مجله
  // ==========================================
  function renderProduct() {
    if (!selectedProduct) {
      return (
        <main className="flex min-h-96 flex-col items-center justify-center">
          <h2 className="text-xl font-bold">این محصول پیدا نشد</h2>
          <a href="#shop" className="mt-4 rounded-xl bg-emerald-900 px-5 py-2.5 text-xs font-bold text-white">بازگشت به فروشگاه</a>
        </main>
      );
    }

    return (
      <main className="mx-auto grid w-[calc(100%-40px)] max-w-6xl gap-10 py-12 sm:w-[calc(100%-64px)] lg:grid-cols-2">
        <div className="h-[380px] sm:h-[500px] rounded-3xl overflow-hidden border kz-border shadow-lg">
          <SafeImage className="size-full object-cover" src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
        <div className="flex flex-col justify-center">
          <Eyebrow>{selectedProduct.category} · رنگ {selectedProduct.color}</Eyebrow>
          <h1 className="mt-3 text-3xl font-black">{selectedProduct.name}</h1>
          <strong className="mt-3 text-2xl font-extrabold text-emerald-800 dark-accent">{formatPrice(selectedProduct.price)}</strong>
          <p className="mt-5 text-xs sm:text-sm leading-8 kz-muted">
            این اثر با دست و در کارگاه خانه‌زاد ساخته شده است. بافت طبیعی و ظرافت ساخت دستی آن، حس گرما و اصالت را به فضای خانه شما می‌آورد.
          </p>

          <div className="my-6 kz-subtle rounded-2xl border p-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="kz-muted">وضعیت موجودی انبار:</span>
              <strong className={selectedProduct.active ? "text-emerald-700 dark-accent" : "text-rose-600"}>
                {selectedProduct.active ? `موجود (${formatNum(selectedProduct.stock)} عدد آماده ارسال)` : "ناموجود"}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="kz-muted">زمان تحویل:</span>
              <strong>بسته‌بندی ضدضربه · ارسال ۲ تا ۳ روز کاری</strong>
            </div>
          </div>

          <div className="flex gap-3">
            {selectedProduct.active ? (
              <>
                <div className="kz-subtle flex items-center gap-3 rounded-xl border px-3">
                  <button onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))} className="font-bold px-1 cursor-pointer">-</button>
                  <span className="text-xs font-bold">{formatNum(detailQuantity)}</span>
                  <button onClick={() => setDetailQuantity(detailQuantity + 1)} className="font-bold px-1 cursor-pointer">+</button>
                </div>
                <button
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-900 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-800 cursor-pointer"
                  onClick={() => addToCart(selectedProduct.id, detailQuantity)}
                >
                  افزودن به سبد خرید <Icon name="bag" size={17} />
                </button>
              </>
            ) : (
              <div className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-rose-900/90 text-xs font-bold text-white">
                فعلاً در انبار موجود نیست
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  function renderCart() {
    const items = Object.entries(cart)
      .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
      .filter((item) => item.product);

    return (
      <main className="mx-auto w-[calc(100%-40px)] max-w-6xl py-12 sm:w-[calc(100%-64px)] min-h-[60vh]">
        <h1 className="text-2xl sm:text-3xl font-black mb-8">سبد خرید شما</h1>
        {items.length ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="kz-card flex items-center justify-between rounded-2xl border p-4 text-xs">
                  <div className="flex items-center gap-3.5">
                    <SafeImage className="size-16 rounded-xl object-cover" src={product.image} alt={product.name} />
                    <div>
                      <strong className="block text-sm font-extrabold">{product.name}</strong>
                      <span className="kz-muted">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                  <div className="kz-subtle flex items-center gap-3 rounded-xl border px-3 py-1.5 font-bold">
                    <button onClick={() => changeQuantity(product.id, -1)} className="cursor-pointer">-</button>
                    <span>{formatNum(quantity)}</span>
                    <button onClick={() => changeQuantity(product.id, 1)} className="cursor-pointer">+</button>
                  </div>
                  <strong className="text-sm font-extrabold text-emerald-800 dark-accent">{formatPrice(product.price * quantity)}</strong>
                </div>
              ))}
            </div>

            <form onSubmit={handleCheckout} className="kz-card h-fit rounded-3xl border p-6 space-y-4 text-xs shadow-lg">
              <h2 className="text-base font-extrabold border-b kz-border pb-3">تکمیل سفارش (متصل به پنل مدیریت)</h2>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="نام و نام خانوادگی گیرنده..."
                className="kz-input w-full rounded-xl p-3 outline-none"
              />
              <input
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="شماره موبایل (مثلاً ۰۹۱۲...)"
                className="kz-input w-full rounded-xl p-3 outline-none"
              />
              <input
                required
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                placeholder="شهر مقصد (مثلاً شیراز، تهران...)"
                className="kz-input w-full rounded-xl p-3 outline-none"
              />
              <div className="flex justify-between text-sm font-black pt-3 border-t kz-border">
                <span>مبلغ قابل پرداخت:</span>
                <strong className="text-emerald-800 dark-accent">{formatPrice(cartTotal + (cartTotal >= 2000000 ? 0 : 75000))}</strong>
              </div>
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 text-white font-bold shadow-md hover:bg-emerald-800 cursor-pointer"
              >
                ثبت سفارش و ارسال به پنل ادمین <Icon name="check" size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="kz-card rounded-3xl border text-center py-16">
            <p className="text-sm font-bold kz-muted">سبد خرید شما فعلاً خالی است.</p>
            <a href="#shop" className="mt-4 inline-block rounded-xl bg-emerald-900 px-6 py-3 text-xs font-bold text-white">رفتن به فروشگاه</a>
          </div>
        )}
      </main>
    );
  }

  function renderJournal() {
    return (
      <main className="mx-auto w-[calc(100%-40px)] max-w-7xl py-12 sm:w-[calc(100%-64px)]">
        <div className="kz-subtle rounded-3xl border p-8 text-center mb-10">
          <Eyebrow>مجله دکوراسیون و سبک زندگی</Eyebrow>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black">قصه‌های خانه و دست‌سازه‌ها</h1>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.id} className="kz-card rounded-2xl border overflow-hidden flex flex-col justify-between">
              <div>
                <SafeImage className="aspect-[16/10] w-full object-cover" src={story.image} alt={story.title} />
                <div className="p-5">
                  <span className="text-[11px] font-bold text-emerald-800 dark-accent">{story.meta}</span>
                  <h3 className="mt-2 text-base font-extrabold leading-7">{story.title}</h3>
                  <p className="mt-2 text-xs kz-muted leading-6">{story.excerpt}</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-2 border-t kz-border-subtle flex justify-between text-[11px] kz-muted">
                <span>نویسنده: تحریریه خانه‌زاد</span>
                <span>👁️ {formatNum(story.views)} بازدید</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    );
  }

  let page;
  if (route === "shop") page = renderShop();
  else if (route === "cart") page = renderCart();
  else if (route === "favorites") page = renderShop("علاقه‌مندی‌های منتخب شما");
  else if (route.startsWith("product/")) page = renderProduct();
  else if (route === "about") page = renderAbout();
  else if (route === "contact") page = renderContact();
  else if (route === "journal") page = renderJournal();
  else page = renderHome();

  return (
    <div dir="rtl" className={`kz-root ${darkMode ? "kz-dark" : ""} min-h-screen`}>
      {globalStyles}
      {header}
      {page}
      {footer}

      {/* دکمه شناور دسترسی سریع به اتاق فرمان */}
      <a
        href="#admin"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-2xl bg-stone-950 border border-lime-300/40 px-4 py-3 text-xs font-extrabold text-lime-300 shadow-2xl transition hover:scale-105"
      >
        <Icon name="dashboard" size={16} /> اتاق فرمان (پنل مدیریت)
      </a>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex min-h-12 -translate-x-1/2 items-center gap-3 rounded-2xl bg-stone-900 px-6 text-xs font-bold text-lime-200 shadow-2xl border border-stone-700">
          <Icon name="check" size={17} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
