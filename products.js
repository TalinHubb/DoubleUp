const categories = ["All", "Cigarettes", "Cigars", "Flower", "Vapes", "E-Liquids", "Accessories"];
const imageBase = "https://raw.githubusercontent.com/TalinHubb/DoubleUp/main/images/";
const productCatalog = [
  { id: 1, name: "Classic Red Pack", category: "Cigarettes", price: 10.49, image: imageBase + "cigarettes.png", tag: "POPULAR" },
  { id: 2, name: "Smooth Gold Pack", category: "Cigarettes", price: 10.99, image: imageBase + "cigarettes.png" },
  { id: 3, name: "Cedar Reserve Cigar", category: "Cigars", price: 8.99, image: imageBase + "cigars.jpg", tag: "STAFF PICK" },
  { id: 4, name: "Classic Cigar Pack", category: "Cigars", price: 19.99, image: imageBase + "cigars.jpg" },
  { id: 5, name: "Fresh Flower — 1g", category: "Flower", price: 14.99, image: imageBase + "flower.jpg", tag: "FRESH" },
  { id: 6, name: "House Flower — 3.5g", category: "Flower", price: 34.99, image: imageBase + "flower.jpg" },
  { id: 7, name: "Pocket Vape Device", category: "Vapes", price: 34.99, image: imageBase + "vape.jpg", tag: "NEW" },
  { id: 8, name: "Rechargeable Vape Kit", category: "Vapes", price: 44.99, image: imageBase + "vape.jpg" },
  { id: 9, name: "Mint E-Liquid — 30ml", category: "E-Liquids", price: 14.99, image: imageBase + "liquid.jpg" },
  { id: 10, name: "Fruit E-Liquid — 30ml", category: "E-Liquids", price: 15.99, image: imageBase + "liquid.jpg", tag: "POPULAR" },
  { id: 11, name: "Everyday Lighter", category: "Accessories", price: 4.99, image: imageBase + "lighter.webp" },
  { id: 12, name: "Double Up Accessory Kit", category: "Accessories", price: 18.99, image: imageBase + "lighter.webp", tag: "2X POINTS" }
];
const storeLocations = [
  { id: "northside", name: "Northside", number: "STORE 01", address: "1010 North Avenue", city: "Sample City, IL 60001", phone: "(555) 010-1001", hours: "Open today · 9 AM–11 PM", lowStock: [6, 10] },
  { id: "west-loop", name: "West Loop", number: "STORE 02", address: "825 Market Street", city: "Sample City, IL 60002", phone: "(555) 010-1002", hours: "Open today · 9 AM–12 AM", lowStock: [3] },
  { id: "lakeside", name: "Lakeside", number: "STORE 03", address: "440 Lakeview Drive", city: "Sample City, IL 60003", phone: "(555) 010-1003", hours: "Open today · 10 AM–10 PM", lowStock: [7, 8, 12] },
  { id: "midtown", name: "Midtown", number: "STORE 04", address: "215 Central Boulevard", city: "Sample City, IL 60004", phone: "(555) 010-1004", hours: "Open today · 9 AM–11 PM", lowStock: [2] },
  { id: "river-east", name: "River East", number: "STORE 05", address: "730 River Road", city: "Sample City, IL 60005", phone: "(555) 010-1005", hours: "Open today · 8 AM–11 PM", lowStock: [5, 9] },
  { id: "southgate", name: "Southgate", number: "STORE 06", address: "1900 Southgate Lane", city: "Sample City, IL 60006", phone: "(555) 010-1006", hours: "Open today · 9 AM–10 PM", lowStock: [4] },
  { id: "oak-park", name: "Oak Park", number: "STORE 07", address: "118 Oak Park Way", city: "Sample City, IL 60007", phone: "(555) 010-1007", hours: "Open today · 9 AM–11 PM", lowStock: [1, 11] },
  { id: "uptown", name: "Uptown", number: "STORE 08", address: "505 Uptown Avenue", city: "Sample City, IL 60008", phone: "(555) 010-1008", hours: "Open today · 10 AM–12 AM", lowStock: [8] }
];

