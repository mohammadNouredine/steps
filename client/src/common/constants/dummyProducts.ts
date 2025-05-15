export const dummyProduct = {
  name: "Nice book 1",
  description:
    "This is a short description that describes book. This is a short description that describes book. This is a short description that describes book.",
  shortDescription: "This is a short description that describes book.",
  images: [
    {
      src: "/products/demo-book1.png",
      alt: "Nice book 1",
    },
  ],
  video: {
    src: "/products/demo-book1.png",
    alt: "Nice book 1",
  },
  tags: ["book", "novel", "fiction"],
  price: 15,
  discountType: "percentage",
  discountValue: 10,
  discountForStar: true,
  size: {
    width: 100,
    height: 100,
  },
  weight: 10,
  minAge: 10,
  maxAge: 10,
  otherAttributes: [
    {
      name: "gender",
      description: "male",
    },
    {
      name: "color",
      description: "red",
    },
    {
      name: "paper type",
      description: "matte",
    },
  ],

  isVisible: true,
  outOfStock: false,
  isFeatured: true,

  variants: [
    {
      id: 1,
      name: "color",
      options: [
        {
          id: 1,
          name: "red",
        },
        {
          id: 2,
          name: "blue",
        },
        {
          id: 3,
          name: "green",
        },
        {
          id: 4,
          name: "yellow",
        },
      ],
    },
    {
      id: 2,
      name: "size",
      options: [
        {
          id: 1,
          name: "small",
        },
        {
          id: 2,
          name: "medium",
        },
        {
          id: 3,
          name: "large",
        },
      ],
    },
  ],
  variations: [
    {
      id: 1,
      productId: 1,
      optionIds: [1, 2], // Red, Medium
      price: 10,
      stock: 10,
    },
    {
      id: 2,
      productId: 1,
      optionIds: [2, 3], // Blue, Large
      price: 15,
      stock: 5,
    },
    {
      id: 3,
      productId: 1,
      optionIds: [3, 1], // Green, Small
      price: 8,
      stock: 20,
    },
    {
      id: 4,
      productId: 1,
      optionIds: [4, 2], // Yellow, Medium
      price: 12,
      stock: 7,
    },
  ],
};

export type StoreItem = {
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  variantOptionsSelected?: string[];
  quantity: number;
};
export const cartItems: StoreItem[] = [
  {
    name: "Nice book 1",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 1,
  },
  {
    name: "The book of the year",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 4,
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 1,
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 2,
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 3,
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
    variantOptionsSelected: ["Red", "Medium"],
    quantity: 4,
  },
];

export const allItemsPartial: Product[] = [
  {
    name: "Nice book 1",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The book of the year",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",

    variants: [
      {
        id: 1,
        name: "color",
        options: [
          {
            id: 1,
            name: "red",
          },
          {
            id: 2,
            name: "blue",
          },
          {
            id: 3,
            name: "green",
          },
          {
            id: 4,
            name: "yellow",
          },
        ],
      },
      {
        id: 2,
        name: "size",
        options: [
          {
            id: 1,
            name: "small",
          },
          {
            id: 2,
            name: "medium",
          },
          {
            id: 3,
            name: "large",
          },
        ],
      },
    ],
    variations: [
      {
        id: 1,
        productId: 1,
        optionIds: [1, 2], // Red, Medium
        price: 10,
        stock: 10,
        discountAmount: 4,
      },
      {
        id: 2,
        productId: 1,
        optionIds: [2, 3], // Blue, Large
        price: 15,
        stock: 5,
        discountAmount: 4,
      },
      {
        id: 3,
        productId: 1,
        optionIds: [3, 1], // Green, Small
        price: 8,
        stock: 20,
        discountAmount: 4,
      },
      {
        id: 4,
        productId: 1,
        optionIds: [4, 2], // Yellow, Medium
        price: 12,
        stock: 7,
        discountAmount: 4,
      },
    ],
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book2.png",
    shortDescription: "This is a short description that describes book.",
    variants: [
      {
        id: 1,
        name: "color",
        options: [
          {
            id: 1,
            name: "red",
          },
          {
            id: 2,
            name: "blue",
          },
          {
            id: 3,
            name: "green",
          },
          {
            id: 4,
            name: "yellow",
          },
        ],
      },
      {
        id: 2,
        name: "size",
        options: [
          {
            id: 1,
            name: "small",
          },
          {
            id: 2,
            name: "medium",
          },
          {
            id: 3,
            name: "large",
          },
        ],
      },
    ],
    variations: [
      {
        id: 1,
        productId: 1,
        optionIds: [1, 2], // Red, Medium
        price: 10,
        stock: 10,
        discountAmount: 4,
      },
      {
        id: 2,
        productId: 1,
        optionIds: [2, 3], // Blue, Large
        price: 15,
        stock: 5,
        discountAmount: 4,
      },
      {
        id: 3,
        productId: 1,
        optionIds: [3, 1], // Green, Small
        price: 8,
        stock: 20,
        discountAmount: 4,
      },
      {
        id: 4,
        productId: 1,
        optionIds: [4, 2], // Yellow, Medium
        price: 12,
        stock: 7,
        discountAmount: 4,
      },
    ],
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book3.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book3.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "Nice book 1",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The book of the year",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "A mysterious book",
    price: 15,
    image: "/products/demo-book1.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book2.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book3.png",
    shortDescription: "This is a short description that describes book.",
  },
  {
    name: "The best book ever",
    price: 20,
    image: "/products/demo-book3.png",
    shortDescription: "This is a short description that describes book.",
  },
];
type Option = {
  id: number;
  name: string;
};

type Variant = {
  id: number;
  name: string;
  options: Option[];
};

type Variation = {
  id: number;
  productId: number;
  optionIds: number[]; // References the selected option ids
  price: number;
  stock: number;
  discountAmount: number;
};

export type Product = {
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  variants?: Variant[]; // Optional, since not all products have variants
  variations?: Variation[]; // Optional, since not all products have variations
};
