/**
 * 建立商品初始資料
 */

import { prisma } from "../../src/lib/prisma.js";

const products = [
  // ===== CPU =====
  {
    name: "Intel Core i5-14400F",
    slug: "intel-core-i5-14400f",
    categorySlug: "cpu",
    brand: "Intel",
    price: 5490,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "10",
      threadCount: "16",
      socket: "LGA1700",
      baseClock: "2.5 GHz",
      maxBoostClock: "4.7 GHz",
      cache: "20 MB",
      tdp: "65W",
    },
    description: "第 14 代 Intel Core i5，適合主流遊戲與日常使用。",
    status: "active",
  },
  {
    name: "Intel Core i7-14700K",
    slug: "intel-core-i7-14700k",
    categorySlug: "cpu",
    brand: "Intel",
    price: 12990,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "20",
      threadCount: "28",
      socket: "LGA1700",
      baseClock: "3.4 GHz",
      maxBoostClock: "5.6 GHz",
      cache: "33 MB",
      tdp: "125W",
    },
    description: "高階桌機處理器，適合遊戲、直播與內容創作。",
    status: "active",
  },
  {
    name: "Intel Core i7-14700",
    slug: "intel-core-i7-14700",
    categorySlug: "cpu",
    brand: "Intel",
    price: 11490,
    stock: 12,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "20",
      threadCount: "28",
      socket: "LGA1700",
      baseClock: "2.1 GHz",
      maxBoostClock: "5.4 GHz",
      cache: "33 MB",
      tdp: "65W",
    },
    description: "兼顧效能與功耗的高效能處理器。",
    status: "active",
  },
  {
    name: "AMD Ryzen 5 7500F",
    slug: "amd-ryzen-5-7500f",
    categorySlug: "cpu",
    brand: "AMD",
    price: 4990,
    stock: 18,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "6",
      threadCount: "12",
      socket: "AM5",
      baseClock: "3.7 GHz",
      maxBoostClock: "5.0 GHz",
      cache: "32 MB",
      tdp: "65W",
    },
    description: "AM5 平台入門甜點級處理器，適合主流遊戲裝機。",
    status: "active",
  },
  {
    name: "AMD Ryzen 7 7800X3D",
    slug: "amd-ryzen-7-7800x3d",
    categorySlug: "cpu",
    brand: "AMD",
    price: 12990,
    stock: 7,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "8",
      threadCount: "16",
      socket: "AM5",
      baseClock: "4.2 GHz",
      maxBoostClock: "5.0 GHz",
      cache: "96 MB",
      tdp: "120W",
    },
    description: "熱門遊戲向高階處理器，適合高刷新率玩家。",
    status: "inactive",
  },

  // ===== GPU =====
  {
    name: "MSI GeForce RTX 4060 VENTUS 2X BLACK 8G",
    slug: "msi-geforce-rtx-4060-ventus-2x-black-8g",
    categorySlug: "gpu",
    brand: "MSI",
    price: 10990,
    stock: 14,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    ],
    specs: {
      chipset: "GeForce RTX 4060",
      memory: "8GB GDDR6",
      memoryBus: "128-bit",
      length: "199mm",
      recommendedPsu: "550W",
    },
    description: "1080p 遊戲主流顯示卡，適合入門光追體驗。",
    status: "active",
  },
  {
    name: "ASUS Dual GeForce RTX 4060 Ti 8GB",
    slug: "asus-dual-geforce-rtx-4060-ti-8gb",
    categorySlug: "gpu",
    brand: "ASUS",
    price: 14990,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    ],
    specs: {
      chipset: "GeForce RTX 4060 Ti",
      memory: "8GB GDDR6",
      memoryBus: "128-bit",
      length: "227mm",
      recommendedPsu: "650W",
    },
    description: "適合 1080p / 2K 遊戲的中階顯示卡。",
    status: "active",
  },
  {
    name: "MSI GeForce RTX 4070 SUPER 12G",
    slug: "msi-geforce-rtx-4070-super-12g",
    categorySlug: "gpu",
    brand: "MSI",
    price: 21990,
    stock: 8,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    ],
    specs: {
      chipset: "GeForce RTX 4070 SUPER",
      memory: "12GB GDDR6X",
      memoryBus: "192-bit",
      length: "308mm",
      recommendedPsu: "650W",
    },
    description: "適合 2K 遊戲與創作需求的中高階顯示卡。",
    status: "active",
  },
  {
    name: "GIGABYTE GeForce RTX 4070 Ti SUPER WINDFORCE OC 16G",
    slug: "gigabyte-geforce-rtx-4070-ti-super-windforce-oc-16g",
    categorySlug: "gpu",
    brand: "GIGABYTE",
    price: 28990,
    stock: 5,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    ],
    specs: {
      chipset: "GeForce RTX 4070 Ti SUPER",
      memory: "16GB GDDR6X",
      memoryBus: "256-bit",
      length: "261mm",
      recommendedPsu: "750W",
    },
    description: "高階 2K / 4K 遊戲顯示卡，兼顧創作與 AI 工作負載。",
    status: "active",
  },
  {
    name: "SAPPHIRE PULSE Radeon RX 7800 XT 16GB",
    slug: "sapphire-pulse-radeon-rx-7800-xt-16gb",
    categorySlug: "gpu",
    brand: "SAPPHIRE",
    price: 18990,
    stock: 6,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    ],
    specs: {
      chipset: "Radeon RX 7800 XT",
      memory: "16GB GDDR6",
      memoryBus: "256-bit",
      length: "280mm",
      recommendedPsu: "700W",
    },
    description: "AMD 中高階顯示卡，適合 2K 高畫質遊戲。",
    status: "inactive",
  },

  // ===== SSD =====
  {
    name: "Samsung 990 PRO 1TB",
    slug: "samsung-990-pro-1tb",
    categorySlug: "ssd",
    brand: "Samsung",
    price: 3990,
    stock: 15,
    images: [
      "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg",
    ],
    specs: {
      capacity: "1TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "7450MB/s",
      writeSpeed: "6900MB/s",
    },
    description: "高效能 PCIe 4.0 SSD，適合作業系統與遊戲碟。",
    status: "active",
  },
  {
    name: "Samsung 990 PRO 2TB",
    slug: "samsung-990-pro-2tb",
    categorySlug: "ssd",
    brand: "Samsung",
    price: 6990,
    stock: 9,
    images: [
      "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg",
    ],
    specs: {
      capacity: "2TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "7450MB/s",
      writeSpeed: "6900MB/s",
    },
    description: "容量更大的高階系統碟與遊戲碟選擇。",
    status: "active",
  },
  {
    name: "WD_BLACK SN850X 1TB",
    slug: "wd-black-sn850x-1tb",
    categorySlug: "ssd",
    brand: "Western Digital",
    price: 3690,
    stock: 13,
    images: [
      "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg",
    ],
    specs: {
      capacity: "1TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "7300MB/s",
      writeSpeed: "6300MB/s",
    },
    description: "遊戲向高效能 SSD，讀寫速度表現優秀。",
    status: "active",
  },
  {
    name: "Kingston KC3000 2TB",
    slug: "kingston-kc3000-2tb",
    categorySlug: "ssd",
    brand: "Kingston",
    price: 6190,
    stock: 8,
    images: [
      "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg",
    ],
    specs: {
      capacity: "2TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "7000MB/s",
      writeSpeed: "7000MB/s",
    },
    description: "高速 PCIe 4.0 SSD，適合內容創作與大型遊戲。",
    status: "active",
  },
  {
    name: "Crucial P3 Plus 1TB",
    slug: "crucial-p3-plus-1tb",
    categorySlug: "ssd",
    brand: "Crucial",
    price: 2290,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg",
    ],
    specs: {
      capacity: "1TB",
      interface: "PCIe 4.0 NVMe",
      formFactor: "M.2 2280",
      readSpeed: "5000MB/s",
      writeSpeed: "3600MB/s",
    },
    description: "價格親民的 PCIe 4.0 SSD，適合主流升級。",
    status: "inactive",
  },

  // ===== RAM =====
  {
    name: "Kingston FURY Beast DDR5 5600 16GBx2",
    slug: "kingston-fury-beast-ddr5-5600-16gbx2",
    categorySlug: "ram",
    brand: "Kingston",
    price: 3290,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
    ],
    specs: {
      capacity: "32GB (16GBx2)",
      type: "DDR5",
      speed: "5600MT/s",
      latency: "CL36",
      voltage: "1.25V",
    },
    description: "主流 DDR5 雙通道套裝，適合新平台裝機。",
    status: "active",
  },
  {
    name: "Corsair Vengeance DDR5 6000 16GBx2",
    slug: "corsair-vengeance-ddr5-6000-16gbx2",
    categorySlug: "ram",
    brand: "Corsair",
    price: 3890,
    stock: 16,
    images: [
      "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
    ],
    specs: {
      capacity: "32GB (16GBx2)",
      type: "DDR5",
      speed: "6000MT/s",
      latency: "CL36",
      voltage: "1.35V",
    },
    description: "高頻 DDR5 記憶體，適合 AM5 / Intel 新平台。",
    status: "active",
  },
  {
    name: "G.SKILL Trident Z5 RGB DDR5 6400 16GBx2",
    slug: "gskill-trident-z5-rgb-ddr5-6400-16gbx2",
    categorySlug: "ram",
    brand: "G.SKILL",
    price: 4690,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
    ],
    specs: {
      capacity: "32GB (16GBx2)",
      type: "DDR5",
      speed: "6400MT/s",
      latency: "CL32",
      voltage: "1.40V",
    },
    description: "高階 RGB DDR5 記憶體，適合高效能平台。",
    status: "active",
  },
  {
    name: "ADATA XPG Lancer Blade DDR5 6000 16GBx2",
    slug: "adata-xpg-lancer-blade-ddr5-6000-16gbx2",
    categorySlug: "ram",
    brand: "ADATA",
    price: 3590,
    stock: 14,
    images: [
      "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
    ],
    specs: {
      capacity: "32GB (16GBx2)",
      type: "DDR5",
      speed: "6000MT/s",
      latency: "CL30",
      voltage: "1.35V",
    },
    description: "低外型散熱片設計，適合相容性需求較高的平台。",
    status: "active",
  },
  {
    name: "TeamGroup T-Force Delta RGB DDR5 6400 16GBx2",
    slug: "teamgroup-t-force-delta-rgb-ddr5-6400-16gbx2",
    categorySlug: "ram",
    brand: "TeamGroup",
    price: 4290,
    stock: 9,
    images: [
      "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
    ],
    specs: {
      capacity: "32GB (16GBx2)",
      type: "DDR5",
      speed: "6400MT/s",
      latency: "CL40",
      voltage: "1.35V",
    },
    description: "RGB 外觀記憶體，適合偏重外觀展示的裝機。",
    status: "inactive",
  },

  // ===== Motherboard =====
  {
    name: "MSI PRO B760M-A WIFI",
    slug: "msi-pro-b760m-a-wifi",
    categorySlug: "motherboard",
    brand: "MSI",
    price: 4390,
    stock: 12,
    images: [
      "https://images.pexels.com/photos/2582939/pexels-photo-2582939.jpeg",
    ],
    specs: {
      socket: "LGA1700",
      chipset: "Intel B760",
      formFactor: "Micro-ATX",
      memorySupport: "DDR5",
      wireless: "Wi-Fi",
    },
    description: "適合主流 Intel 平台裝機的實用型主機板。",
    status: "active",
  },
  {
    name: "ASUS TUF GAMING B760-PLUS WIFI",
    slug: "asus-tuf-gaming-b760-plus-wifi",
    categorySlug: "motherboard",
    brand: "ASUS",
    price: 6290,
    stock: 8,
    images: [
      "https://images.pexels.com/photos/2582939/pexels-photo-2582939.jpeg",
    ],
    specs: {
      socket: "LGA1700",
      chipset: "Intel B760",
      formFactor: "ATX",
      memorySupport: "DDR5",
      wireless: "Wi-Fi",
    },
    description: "中階 Intel 平台主機板，兼顧擴充性與耐用度。",
    status: "active",
  },
  {
    name: "GIGABYTE B650M AORUS ELITE AX",
    slug: "gigabyte-b650m-aorus-elite-ax",
    categorySlug: "motherboard",
    brand: "GIGABYTE",
    price: 5890,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/2582939/pexels-photo-2582939.jpeg",
    ],
    specs: {
      socket: "AM5",
      chipset: "AMD B650",
      formFactor: "Micro-ATX",
      memorySupport: "DDR5",
      wireless: "Wi-Fi 6E",
    },
    description: "熱門 AM5 平台主機板，適合主流與中高階裝機。",
    status: "active",
  },
  {
    name: "ASRock B650M Pro RS",
    slug: "asrock-b650m-pro-rs",
    categorySlug: "motherboard",
    brand: "ASRock",
    price: 4690,
    stock: 11,
    images: [
      "https://images.pexels.com/photos/2582939/pexels-photo-2582939.jpeg",
    ],
    specs: {
      socket: "AM5",
      chipset: "AMD B650",
      formFactor: "Micro-ATX",
      memorySupport: "DDR5",
      wireless: "No",
    },
    description: "高 CP 值 AM5 主機板，適合預算型升級。",
    status: "active",
  },
  {
    name: "MSI MAG X670E TOMAHAWK WIFI",
    slug: "msi-mag-x670e-tomahawk-wifi",
    categorySlug: "motherboard",
    brand: "MSI",
    price: 9990,
    stock: 4,
    images: [
      "https://images.pexels.com/photos/2582939/pexels-photo-2582939.jpeg",
    ],
    specs: {
      socket: "AM5",
      chipset: "AMD X670E",
      formFactor: "ATX",
      memorySupport: "DDR5",
      wireless: "Wi-Fi 6E",
    },
    description: "高階 AM5 主機板，適合進階玩家與創作者。",
    status: "inactive",
  },

  // ===== PSU =====
  {
    name: "Corsair RM650e 650W",
    slug: "corsair-rm650e-650w",
    categorySlug: "psu",
    brand: "Corsair",
    price: 2990,
    stock: 15,
    images: [
      "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg",
    ],
    specs: {
      wattage: "650W",
      efficiency: "80 Plus Gold",
      modular: "Fully Modular",
      formFactor: "ATX",
      fanSize: "120mm",
    },
    description: "主流金牌全模組電源，適合中階裝機。",
    status: "active",
  },
  {
    name: "Seasonic FOCUS GX-750",
    slug: "seasonic-focus-gx-750",
    categorySlug: "psu",
    brand: "Seasonic",
    price: 3890,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg",
    ],
    specs: {
      wattage: "750W",
      efficiency: "80 Plus Gold",
      modular: "Fully Modular",
      formFactor: "ATX",
      fanSize: "120mm",
    },
    description: "穩定度高的金牌全模組電源，適合中高階平台。",
    status: "active",
  },
  {
    name: "Cooler Master MWE Gold 850 V2",
    slug: "cooler-master-mwe-gold-850-v2",
    categorySlug: "psu",
    brand: "Cooler Master",
    price: 3990,
    stock: 9,
    images: [
      "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg",
    ],
    specs: {
      wattage: "850W",
      efficiency: "80 Plus Gold",
      modular: "Fully Modular",
      formFactor: "ATX",
      fanSize: "120mm",
    },
    description: "適合高階顯卡平台的高瓦數金牌電源。",
    status: "active",
  },
  {
    name: "MSI MAG A850GL PCIE5",
    slug: "msi-mag-a850gl-pcie5",
    categorySlug: "psu",
    brand: "MSI",
    price: 4290,
    stock: 7,
    images: [
      "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg",
    ],
    specs: {
      wattage: "850W",
      efficiency: "80 Plus Gold",
      modular: "Fully Modular",
      formFactor: "ATX",
      support: "PCIe 5.0 / 12VHPWR",
    },
    description: "支援新世代顯卡供電的金牌全模組電源。",
    status: "active",
  },
  {
    name: "FSP Hydro G Pro 1000W",
    slug: "fsp-hydro-g-pro-1000w",
    categorySlug: "psu",
    brand: "FSP",
    price: 5490,
    stock: 4,
    images: [
      "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg",
    ],
    specs: {
      wattage: "1000W",
      efficiency: "80 Plus Gold",
      modular: "Fully Modular",
      formFactor: "ATX",
      fanSize: "135mm",
    },
    description: "適合高階顯卡與工作站級平台的高瓦數電源。",
    status: "inactive",
  },
];

export async function seedProducts() {
  console.log("[Seed] Products");

  for (const product of products) {
    const exists = await prisma.product.findUnique({
      where: {
        slug: product.slug,
      },
    });

    if (exists) {
      console.log(`[Seed] Product exists: ${product.slug}`);
      continue;
    }

    const category = await prisma.category.findUnique({
      where: {
        slug: product.categorySlug,
      },
    });

    if (!category) {
      console.log(`[Seed] Category not found: ${product.categorySlug}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        images: product.images,
        specs: product.specs,
        description: product.description,
        status: product.status,
        categoryId: category.id,
      },
    });

    console.log(`[Seed] Product created: ${product.slug}`);
  }
}
